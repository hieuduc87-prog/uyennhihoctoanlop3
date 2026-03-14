import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow these paths without auth
  if (pathname.startsWith('/login') || pathname.startsWith('/auth') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Allow if logged in (cookie set on login) or guest mode
  if (request.cookies.get('logged_in')?.value === '1' || request.cookies.get('guest_mode')?.value === '1') {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|css)$).*)'],
}
