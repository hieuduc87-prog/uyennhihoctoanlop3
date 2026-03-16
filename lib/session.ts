import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest } from 'next/server'

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET environment variable is required')
  return secret
}
const COOKIE_NAME = 'voicon_session'

/** Sign a username into a session token: username.hmac */
export function signSession(username: string): string {
  const sig = createHmac('sha256', getSessionSecret()).update(username).digest('hex')
  return `${username}.${sig}`
}

/** Verify session cookie and return username, or null if invalid */
export function getSessionUser(req: NextRequest): string | null {
  const cookie = req.cookies.get(COOKIE_NAME)?.value
  if (!cookie) return null
  const dotIdx = cookie.indexOf('.')
  if (dotIdx < 1) return null
  const username = cookie.slice(0, dotIdx)
  const sig = cookie.slice(dotIdx + 1)
  const expected = createHmac('sha256', getSessionSecret()).update(username).digest('hex')
  if (sig.length !== expected.length) return null
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  return username
}

/** Cookie options for setting the session */
export function sessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secure: process.env.NODE_ENV === 'production',
  }
}
