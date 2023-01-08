import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('token')?.value

  // if (token && request.nextUrl.pathname.startsWith('/authentication')) {
  //   return NextResponse.next()
  // }

  // if (!token && request.nextUrl.pathname.startsWith('/application')) {
  //   const loginUrl = new URL('/authentication/login', request.url)
  //   return NextResponse.redirect(loginUrl)
  // }
  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
