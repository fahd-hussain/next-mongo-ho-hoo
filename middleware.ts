import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token && !request.url.includes('/authentication')) {
    return NextResponse.redirect(new URL('/authentication/login', request.url))
  }

  if (token && request.url.includes('/authentication')) {
    return NextResponse.redirect(new URL('/application', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/application/:path*', '/authentication/:path*'],
}
