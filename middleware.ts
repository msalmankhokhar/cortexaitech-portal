export { default } from "next-auth/middleware"
import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request});
    if (token) {
        // User is logged in, So when he goes to '/login' then we have to redirect him to '/'
        if (
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/ask-login-type')
        ) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}

export const config = {
    matcher: [
        '/',
    ],
}