import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

const SESSION_SECRET = process.env.SESSION_SECRET || ''
if (!SESSION_SECRET && process.env.NODE_ENV === 'production') {
  console.error('FATAL: SESSION_SECRET environment variable is required')
}

async function verifySession(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get('voicon_session')?.value
  if (!cookie) return false
  const dotIdx = cookie.indexOf('.')
  if (dotIdx < 1) return false
  const username = cookie.slice(0, dotIdx)
  const sig = cookie.slice(dotIdx + 1)
  // Use Web Crypto API (works in Edge + Node)
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(username))
  const expected = Array.from(new Uint8Array(sigBuf)).map(b => b.toString(16).padStart(2, '0')).join('')
  // Constant-time comparison (no early exit)
  if (sig.length !== expected.length) return false
  let match = 1
  for (let i = 0; i < expected.length; i++) {
    match &= (sig.charCodeAt(i) === expected.charCodeAt(i)) ? 1 : 0
  }
  return match === 1
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public paths: login page, auth API, static assets
  if (pathname.startsWith('/login') || pathname === '/api/auth') {
    return NextResponse.next()
  }

  // Guest mode: only allow game pages (not API routes)
  const isGuest = request.cookies.get('guest_mode')?.value === '1'
  if (isGuest && !pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Valid session: allow everything
  if (await verifySession(request)) {
    return NextResponse.next()
  }

  // API routes require valid session (guests cannot access)
  if (pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Redirect to login
  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|voice/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|css|json|mp3|wav|ogg)$).*)'],
}
