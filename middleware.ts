import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

const SESSION_SECRET = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

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
  return sig === expected
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public paths: login page, auth API, static assets
  if (pathname.startsWith('/login') || pathname === '/api/auth') {
    return NextResponse.next()
  }

  // Allow guest mode OR valid session
  if (request.cookies.get('guest_mode')?.value === '1' || await verifySession(request)) {
    return NextResponse.next()
  }

  // Other API routes require valid session
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
