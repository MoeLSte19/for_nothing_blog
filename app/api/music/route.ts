// app/api/music/route.ts
import { NextRequest, NextResponse } from 'next/server'

const NET_EASE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  Referer: 'https://music.163.com/',
}

// 播放列表最多取多少首，避免一次性打爆网易云
const MAX_SONGS = 30
// 同一请求内的并发数
const CONCURRENCY = 5
// 歌单展开结果的本地缓存时长
const PLAYLIST_TTL = 5 * 60 * 1000

type SongResult = {
  id: string
  name?: string
  artist?: string
  author?: string
  cover?: string
  pic?: string
  url?: string
  lrc?: string
  error?: string
}

// 歌单展开缓存（单实例 PM2，Map 即用）
const playlistCache = new Map<string, { time: number; ids: string[] }>()
// 完整结果缓存：同一 ids 参数 5 分钟内直接返回，避免每次页面加载都重打网易云
const resultCache = new Map<string, { time: number; data: SongResult[] }>()

/**
 * 展开歌单：把 `pl:<playlistId>` 解析成歌曲 ID 列表（取前 MAX_SONGS 首，去重）。
 * 用网易云 v6 歌单详情接口，匿名可访问。
 */
async function expandPlaylist(playlistId: string): Promise<string[]> {
  const cached = playlistCache.get(playlistId)
  if (cached && Date.now() - cached.time < PLAYLIST_TTL) return cached.ids

  try {
    const res = await fetch(
      `https://music.163.com/api/v6/playlist/detail?id=${playlistId}&n=1000&s=0`,
      { headers: NET_EASE_HEADERS, signal: AbortSignal.timeout(8000) },
    )
    const data = await res.json()
    const playlist = data?.playlist
    const trackIds: string[] = (playlist?.trackIds || [])
      .map((t: any) => String(t?.id))
      .filter(Boolean)
    const ids = [...new Set(trackIds)].slice(0, MAX_SONGS)
    playlistCache.set(playlistId, { time: Date.now(), ids })
    return ids
  } catch (e) {
    console.error(`[api/music] 展开歌单 ${playlistId} 失败:`, e)
    return []
  }
}

/**
 * 解析可播放的音频地址，按可靠性回退：
 * 1) music-api.gdstudio.xyz（网易云曲库的 CDN 直链，经验证对收费/外链受限歌曲同样可用）
 * 2) music.163.com 官方外链地址（部分开放外链的歌曲可用，先探测 content-type 再返回）
 * 全部失败返回 null，前端会跳过该歌曲。
 */
async function resolveAudioUrl(songId: string): Promise<string | null> {
  // 1) gdstudio CDN 直链
  try {
    const res = await fetch(
      `https://music-api.gdstudio.xyz/api.php?types=url&source=netease&id=${songId}&br=320`,
      { signal: AbortSignal.timeout(8000) },
    )
    if (res.ok) {
      const data = await res.json()
      if (data && typeof data.url === 'string' && data.url.startsWith('http')) {
        return data.url
      }
    }
  } catch (e) {
    console.error(`[api/music] gdstudio 解析 ${songId} 失败:`, e)
  }

  // 2) 官方外链地址（先探测是否是音频再返回，避免把 HTML 页塞给播放器）
  const outer = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`
  try {
    const probe = await fetch(outer, {
      headers: NET_EASE_HEADERS,
      signal: AbortSignal.timeout(8000),
    })
    const ct = (probe.headers.get('content-type') || '').toLowerCase()
    if (ct.includes('audio') || ct.includes('octet-stream')) {
      return outer
    }
  } catch (e) {
    console.error(`[api/music] outer 探测 ${songId} 失败:`, e)
  }

  return null
}

/** 单首歌：元数据 + 歌词 + 可播地址（三者并行） */
async function fetchSong(songId: string): Promise<SongResult> {
  try {
    const [detailRes, lrcRes, audioUrl] = await Promise.all([
      fetch(
        `https://music.163.com/api/song/detail/?id=${songId}&ids=[${songId}]`,
        { headers: NET_EASE_HEADERS, signal: AbortSignal.timeout(6000) },
      ),
      fetch(
        `https://music.163.com/api/song/lyric?id=${songId}&lv=-1&kv=-1&tv=-1`,
        { headers: NET_EASE_HEADERS, signal: AbortSignal.timeout(6000) },
      ).catch(() => null),
      resolveAudioUrl(songId),
    ])

    const detail = detailRes.ok ? await detailRes.json() : {}
    const song = detail.songs?.[0]

    if (!song) {
      return { id: songId, error: 'not_found' }
    }
    if (!audioUrl) {
      return { id: songId, error: 'no_audio' }
    }

    let lrcText = ''
    if (lrcRes && lrcRes.ok) {
      try {
        const lrcData = await lrcRes.json()
        lrcText = lrcData.lrc?.lyric || ''
      } catch {
        /* 歌词可选 */
      }
    }

    const artistName = song.artists?.[0]?.name || '未知歌手'

    return {
      id: songId,
      name: song.name,
      artist: artistName,
      author: artistName,
      cover: song.album?.picUrl || '',
      pic: song.album?.picUrl || '',
      url: audioUrl,
      lrc: lrcText,
    }
  } catch (error) {
    console.error(`[api/music] 获取歌曲 ${songId} 失败:`, error)
    return { id: songId, error: String(error) }
  }
}

/** 带并发上限的 map */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = next++
      if (idx >= items.length) return
      results[idx] = await fn(items[idx], idx)
    }
  })
  await Promise.all(workers)
  return results
}

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('ids')
  if (!ids) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 })
  }

  const tokens = ids.split(',').map((t) => t.trim()).filter(Boolean)

  // 命中结果缓存直接返回
  const cacheKey = tokens.join(',')
  const cachedResult = resultCache.get(cacheKey)
  if (cachedResult && Date.now() - cachedResult.time < PLAYLIST_TTL) {
    return NextResponse.json(cachedResult.data)
  }

  // 展开歌单 token（pl:xxxxxx）→ 歌曲 ID 列表
  let songIds: string[] = []
  for (const token of tokens) {
    if (token.startsWith('pl:')) {
      const expanded = await expandPlaylist(token.slice(3))
      songIds.push(...expanded)
    } else {
      songIds.push(token)
    }
  }
  songIds = [...new Set(songIds)].slice(0, MAX_SONGS)

  if (songIds.length === 0) {
    return NextResponse.json([])
  }

  const results = await mapWithConcurrency(songIds, CONCURRENCY, (id) => fetchSong(id))
  resultCache.set(cacheKey, { time: Date.now(), data: results })
  return NextResponse.json(results)
}