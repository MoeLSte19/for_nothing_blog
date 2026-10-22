// app/api/admin/publish/route.ts —— 发布文章/杂谈/说说：写 Markdown 文件 + 触发后台 rebuild
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { exec } from 'child_process'
import { COOKIE_NAME, getAdminPassword, verifyToken } from '../_auth'

const ROOT = process.cwd() // /root/XinghuisamaBlogs/XHBlogs
const DIRS: Record<string, string> = { post: 'posts', chatter: 'chatters', moment: 'moments' }
const TYPES = ['post', 'chatter', 'moment']
const LOCK = '/root/.admin-rebuild.lock'

function slugFromTitle(title: string): string {
  const s = (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return s || `post-${Date.now()}`
}

function safeSlug(s: string): string | null {
  return /^[a-zA-Z0-9_-]{1,80}$/.test(s) ? s : null
}

function esc(v: unknown): string {
  return String(v ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function frontmatter(type: string, f: any): string {
  const lines: string[] = []
  lines.push('---')
  if (type === 'post') {
    lines.push(`title: "${esc(f.title)}"`)
    lines.push(`date: "${esc(f.date)}"`)
    lines.push(`description: "${esc(f.description)}"`)
    lines.push(`cover: "${esc(f.cover || '/me.png')}"`)
    const tags = Array.isArray(f.tags) && f.tags.length
      ? `[${f.tags.map((t: string) => `"${esc(t)}"`).join(', ')}]`
      : '[]'
    lines.push(`tags: ${tags}`)
    lines.push(`mood: "${esc(f.mood)}"`)
  } else {
    lines.push(`title: "${esc(f.title || type === 'moment' ? '说说' : '杂谈')}"`)
    lines.push(`date: "${esc(f.date)}"`)
    lines.push(`description: "${esc(f.description)}"`)
    lines.push(`tags: []`)
    lines.push(`mood: ""`)
  }
  lines.push('---')
  return lines.join('\n') + '\n\n'
}

export async function POST(req: NextRequest) {
  if (!getAdminPassword()) {
    return NextResponse.json({ error: '未配置 ADMIN_PASSWORD' }, { status: 500 })
  }
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!verifyToken(token)) {
    return NextResponse.json({ error: '未登录或会话过期' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: '请求体无效' }, { status: 400 })

  const type: string = body.type
  if (!TYPES.includes(type)) return NextResponse.json({ error: '类型无效' }, { status: 400 })
  const content: string = String(body.content ?? '')
  if (!content.trim()) return NextResponse.json({ error: '正文不能为空' }, { status: 400 })

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:00`
  const date = String(body.date || defaultDate)

  // 文件名：moment 用时间戳；post/chatter 用 slug（校验防路径穿越）
  let filename: string
  if (type === 'moment') {
    filename = `moment-${Date.now()}.md`
  } else {
    const rawSlug = String(body.slug || slugFromTitle(String(body.title || '')))
    const s = safeSlug(rawSlug)
    if (!s) return NextResponse.json({ error: 'slug 只能包含字母/数字/下划线/中划线' }, { status: 400 })
    filename = `${s}.md`
  }

  const dir = DIRS[type]
  const target = path.join(ROOT, dir, filename)
  const dirAbs = path.join(ROOT, dir)
  if (!target.startsWith(dirAbs + path.sep)) {
    return NextResponse.json({ error: '非法路径' }, { status: 400 })
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 6)
    : []

  const md = frontmatter(type, {
    title: body.title,
    date,
    description: body.description,
    cover: body.cover,
    tags,
    mood: body.mood,
  }) + content + '\n'

  try {
    await fs.mkdir(dirAbs, { recursive: true })
    await fs.writeFile(target, md, 'utf8')
  } catch (e: any) {
    return NextResponse.json({ error: `写入失败: ${e.message}` }, { status: 500 })
  }

  // 触发后台 rebuild（带锁，避免并发构建打架）
  let rebuilding = false
  try {
    await fs.access(LOCK)
  } catch {
    try {
      await fs.writeFile(LOCK, String(process.pid), 'utf8')
      exec('/bin/bash /root/admin-rebuild.sh', { cwd: ROOT, detached: true, stdio: 'ignore' }).unref()
      rebuilding = true
    } catch {
      /* 触发失败不阻塞返回；下次发布/手动构建兜底 */
    }
  }

  return NextResponse.json({ ok: true, file: filename, rebuilding, notice: rebuilding ? '发布成功，构建进行中（约 1-2 分钟生效）' : '已保存；构建已在运行，稍后生效' })
}