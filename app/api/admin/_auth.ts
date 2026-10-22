// app/api/admin/_auth.ts —— 管理后台鉴权工具（node runtime，依赖 ADMIN_PASSWORD 环境变量）
import crypto from 'crypto'

export const COOKIE_NAME = 'fn_admin'
const TTL = 12 * 3600 * 1000 // 12 小时

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || ''
}

/** 生成携带过期时间的签名 token：base64url(payload).HMAC */
export function createToken(): string {
  const secret = getAdminPassword()
  const payload = JSON.stringify({ exp: Date.now() + TTL, iat: Date.now() })
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  return `${Buffer.from(payload).toString('base64url')}.${sig}`
}

/** 校验 token（防篡改 + 过期），timing-safe 比较签名 */
export function verifyToken(token: string | null | undefined): boolean {
  if (!token) return false
  const [p64, sig] = token.split('.')
  if (!p64 || !sig) return false
  try {
    const payload = Buffer.from(p64, 'base64url').toString('utf8')
    const data = JSON.parse(payload)
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return false
    const expected = crypto.createHmac('sha256', getAdminPassword()).update(payload).digest('base64url')
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function passwordMatches(input: string): boolean {
  const expect = getAdminPassword()
  if (!expect || typeof input !== 'string') return false
  const a = Buffer.from(input)
  const b = Buffer.from(expect)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}