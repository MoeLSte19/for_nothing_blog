// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, createToken, passwordMatches, getAdminPassword } from '../_auth'

// 简单的内存限速：同 IP 5 次失败后锁 10 分钟
const fails = new Map<string, { n: number; t: number }>()

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const rec = fails.get(ip)
  if (rec && rec.n >= 5 && Date.now() - rec.t < 10 * 60 * 1000) {
    return NextResponse.json({ error: '尝试次数过多，请 10 分钟后再试' }, { status: 429 })
  }

  if (!getAdminPassword()) {
    return NextResponse.json({ error: '服务器未配置 ADMIN_PASSWORD' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  const password = String(body?.password ?? '')

  if (!passwordMatches(password)) {
    const cur = fails.get(ip) ?? { n: 0, t: Date.now() }
    fails.set(ip, { n: cur.n + 1, t: Date.now() })
    return NextResponse.json({ error: '密码错误' }, { status: 401 })
  }

  fails.delete(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 12 * 3600,
    secure: true,
  })
  return res
}