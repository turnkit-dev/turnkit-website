import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import {
  applyBackendSession,
  clearBackendSession,
  getBackendAuthCookies,
  isBackendAccessTokenStale,
  refreshDeveloperSession,
  csrfCookieName,
} from '@/lib/backend-auth';

function buildSignInUrl(request: NextRequest) {
  const url = new URL('/signin', request.url);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (callbackUrl !== '/signin') {
    url.searchParams.set('callbackUrl', callbackUrl);
  }
  return url;
}

async function refreshBackendSessionIfPossible(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? undefined;
  if (!cookieHeader) {
    return null;
  }

  const csrfToken = request.cookies.get(csrfCookieName)?.value ?? undefined;
  const session = await refreshDeveloperSession(cookieHeader, cookieHeader, csrfToken);
  const response = NextResponse.next();
  applyBackendSession(response, session);
  return response;
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET });
  const { accessToken, expiresAt } = getBackendAuthCookies(request.cookies);
  const staleBackendToken = isBackendAccessTokenStale(expiresAt);

  if (!token) {
    if (accessToken || expiresAt) {
      const response = NextResponse.redirect(buildSignInUrl(request));
      clearBackendSession(response);
      return response;
    }
    return NextResponse.redirect(buildSignInUrl(request));
  }

  if (!accessToken || !expiresAt || staleBackendToken) {
    try {
      const refreshedResponse = await refreshBackendSessionIfPossible(request);
      if (refreshedResponse) {
        return refreshedResponse;
      }
    } catch {
      // Fall through to the sign-in redirect below.
    }

    const response = NextResponse.redirect(buildSignInUrl(request));
    clearBackendSession(response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/games/:path*', '/game/:path*'],
};
