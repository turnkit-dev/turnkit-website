import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import {
  clearBackendSession,
  getBackendAuthCookies,
} from '@/lib/backend-auth';

function buildSignInUrl(request: NextRequest) {
  const url = new URL('/signin', request.url);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (callbackUrl !== '/signin') {
    url.searchParams.set('callbackUrl', callbackUrl);
  }
  return url;
}

function buildPostLoginUrl(request: NextRequest) {
  const url = new URL('/auth/post-login', request.url);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (callbackUrl !== '/auth/post-login') {
    url.searchParams.set('callbackUrl', callbackUrl);
  }
  return url;
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(buildSignInUrl(request));
  }

  const { accessToken, expiresAt } = getBackendAuthCookies(request.cookies);

  if (!accessToken || !expiresAt) {
    return NextResponse.redirect(buildPostLoginUrl(request));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/games/:path*', '/game/:path*'],
};
