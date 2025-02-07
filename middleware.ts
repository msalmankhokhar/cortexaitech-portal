import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Handle logged-in users trying to access login pages
    if (
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/ask-login-type')
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    '/manage-employees/:path*',
    '/employee-path/:path*',
    // '/login/:path*',
    // '/ask-login-type/:path*',
    // Exclude these paths from middleware
    // '/((?!api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt|logos|login|ask-login-type).*)'
    '/((?!api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt|logos|login|ask-login-type).*)'
  ]
}