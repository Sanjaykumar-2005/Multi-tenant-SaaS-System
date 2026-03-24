import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  const path = req.nextUrl.pathname

  if (path.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (path === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}
