import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except the login page itself
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const session = request.cookies.get('admin_session');

        if (!session?.value) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Verify the token contains our secret key as a basic integrity check
        try {
            const decoded = Buffer.from(session.value, 'base64').toString('utf8');
            if (!decoded.startsWith(process.env.ADMIN_SECRET)) {
                throw new Error('Invalid token');
            }
        } catch {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
