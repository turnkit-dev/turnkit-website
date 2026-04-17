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
import { getTurnKitDemoBrowserApiBaseUrl, getTurnKitPublicApiBaseUrl, getTurnKitServerApiBaseUrl } from '@/lib/turnkit-demo-config';

function buildContentSecurityPolicy(nonce: string) {
  const connectSources = new Set<string>([
    "'self'",
    'https://cloud.umami.is',
    'https://api.resend.com',
  ]);

  const configuredApiBases = [
    getTurnKitPublicApiBaseUrl(),
    getTurnKitServerApiBaseUrl(),
    getTurnKitDemoBrowserApiBaseUrl(),
  ];

  for (const apiBase of configuredApiBases) {
    try {
      const url = new URL(apiBase);
      connectSources.add(url.origin);
      connectSources.add(`${url.protocol === 'https:' ? 'wss:' : 'ws:'}//${url.host}`);
    } catch {
      // Ignore malformed env config and keep the base policy intact.
    }
  }

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://cloud.umami.is`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'none'",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    `connect-src ${Array.from(connectSources).join(' ')}`,
    "object-src 'none'",
    "frame-src 'none'",
    "manifest-src 'self'",
    "worker-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(process.env.NODE_ENV === 'production' ? ['upgrade-insecure-requests'] : []),
  ].join('; ');
}

function applySecurityHeaders(response: NextResponse, contentSecurityPolicy: string) {
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  return response;
}

function createForwardedResponse(request: NextRequest, nonce: string, contentSecurityPolicy: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return applySecurityHeaders(response, contentSecurityPolicy);
}

function createRedirectResponse(destination: URL, contentSecurityPolicy: string) {
  return applySecurityHeaders(NextResponse.redirect(destination), contentSecurityPolicy);
}

function isProtectedPath(request: NextRequest) {
  return request.nextUrl.pathname === '/games' || request.nextUrl.pathname.startsWith('/games/') || request.nextUrl.pathname.startsWith('/game/');
}

function buildSignInUrl(request: NextRequest) {
  const url = new URL('/signin', request.url);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (callbackUrl !== '/signin') {
    url.searchParams.set('callbackUrl', callbackUrl);
  }
  return url;
}

async function refreshBackendSessionIfPossible(request: NextRequest, nonce: string, contentSecurityPolicy: string) {
  const cookieHeader = request.headers.get('cookie') ?? undefined;
  if (!cookieHeader) {
    return null;
  }

  const csrfToken = request.cookies.get(csrfCookieName)?.value ?? undefined;
  const session = await refreshDeveloperSession(cookieHeader, cookieHeader, csrfToken);
  const response = createForwardedResponse(request, nonce, contentSecurityPolicy);
  applyBackendSession(response, session);
  return response;
}

export async function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

  if (!isProtectedPath(request)) {
    return createForwardedResponse(request, nonce, contentSecurityPolicy);
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET });
  const { accessToken, expiresAt } = getBackendAuthCookies(request.cookies);
  const staleBackendToken = isBackendAccessTokenStale(expiresAt);

  if (!token) {
    if (accessToken || expiresAt) {
      const response = createRedirectResponse(buildSignInUrl(request), contentSecurityPolicy);
      clearBackendSession(response);
      return response;
    }
    return createRedirectResponse(buildSignInUrl(request), contentSecurityPolicy);
  }

  if (!accessToken || !expiresAt || staleBackendToken) {
    try {
      const refreshedResponse = await refreshBackendSessionIfPossible(request, nonce, contentSecurityPolicy);
      if (refreshedResponse) {
        return refreshedResponse;
      }
    } catch {
      // Fall through to the sign-in redirect below.
    }

    const response = createRedirectResponse(buildSignInUrl(request), contentSecurityPolicy);
    clearBackendSession(response);
    return response;
  }

  return createForwardedResponse(request, nonce, contentSecurityPolicy);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map)$).*)'],
};
