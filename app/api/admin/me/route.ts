// app/api/admin/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, getAdminPassword, verifyToken } from '../_auth'

export async function GET(req: NextRequest) {
  if (!getAdminPassword()) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 })
  }
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!verifyToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}