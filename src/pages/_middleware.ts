import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.([a-zA-Z0-9]+$)/;

export function middleware(request: NextRequest) {
    const { pathname, search, locale } = request.nextUrl;

    const shouldHandleLocale =
        !PUBLIC_FILE.test(pathname) &&
        !pathname.includes('/api/') &&
        locale === 'default';

    return shouldHandleLocale
        ? NextResponse.redirect(`/en-US${pathname}${search}`)
        : undefined;
}