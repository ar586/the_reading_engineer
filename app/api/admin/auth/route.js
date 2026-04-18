import { NextResponse } from 'next/server';

export async function POST(request) {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    // Set a simple signed token: base64 of secret + timestamp
    const token = Buffer.from(`${process.env.ADMIN_SECRET}:${Date.now()}`).toString('base64');

    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
    return response;
}
