import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

export const backendAccessTokenCookieName = 'turnkit_access_token';
export const backendAccessExpiryCookieName = 'turnkit_access_expires_at';

type ProviderName = 'google' | 'github';

interface BackendDeveloper {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface BackendSessionResponse {
  jwt: string;
  developer?: BackendDeveloper;
  dashboardBootstrap?: unknown;
  setCookieHeader: string | null;
}

type RefreshedBackendSession = Pick<BackendSessionResponse, 'jwt' | 'setCookieHeader'>;

const refreshDeduplicationWindowMs = 15_000;
const inflightRefreshes = new Map<string, Promise<RefreshedBackendSession>>();

export class BackendAuthError extends Error {
  code: 'AUTH_REFRESH_FAILED' | 'AUTH_TOKEN_MISSING' | 'AUTH_UNAUTHORIZED';

  constructor(code: BackendAuthError['code'], message: string) {
    super(message);
    this.name = 'BackendAuthError';
    this.code = code;
  }
}

function getApiBaseUrl() {
  return process.env.TURNKIT_API_BASE_URL?.replace(/\/+$/, '') || 'http://localhost:8080';
}

function getCookieSecurity() {
  return process.env.NODE_ENV === 'production';
}

function decodeAccessTokenExpiry(jwt: string) {
  const decoded = decodeJwt(jwt);
  if (typeof decoded.exp !== 'number') {
    throw new Error('Missing exp claim in backend access token');
  }
  return decoded.exp * 1000;
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}

function buildExchangeBody(provider: ProviderName, proof: string) {
  if (provider === 'google') {
    return { provider, idToken: proof };
  }
  return { provider, accessToken: proof };
}

async function postBackendAuth(path: string, body?: unknown, cookieHeader?: string) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Backend auth request failed: ${response.status}`);
  }

  return response;
}

function getSetCookieHeader(response: Response) {
  return response.headers.get('set-cookie');
}

export async function exchangeDeveloperSession(provider: ProviderName, proof: string, cookieHeader?: string) {
  const response = await postBackendAuth('/v1/dev/auth/exchange', buildExchangeBody(provider, proof), cookieHeader);
  const payload = (await readJson(response)) as Omit<BackendSessionResponse, 'setCookieHeader'> | null;

  if (!payload || typeof payload.jwt !== 'string' || payload.jwt.length === 0) {
    throw new Error('Backend auth exchange did not return an access token');
  }

  return {
    jwt: payload.jwt,
    developer: payload.developer,
    dashboardBootstrap: payload.dashboardBootstrap,
    setCookieHeader: getSetCookieHeader(response),
  } satisfies BackendSessionResponse;
}

export async function refreshDeveloperSession(cookieHeader?: string, dedupeKey?: string) {
  const refreshKey = dedupeKey ?? cookieHeader ?? '';
  const cached = refreshKey ? inflightRefreshes.get(refreshKey) : null;

  if (cached) {
    return cached;
  }

  const refreshPromise = postBackendAuth('/v1/dev/auth/refresh', undefined, cookieHeader)
    .then(async (response) => {
      const payload = (await readJson(response)) as Pick<BackendSessionResponse, 'jwt'> | null;

      if (!payload || typeof payload.jwt !== 'string' || payload.jwt.length === 0) {
        throw new Error('Backend refresh did not return an access token');
      }

      return {
        jwt: payload.jwt,
        setCookieHeader: getSetCookieHeader(response),
      };
    })
    .finally(() => {
      if (!refreshKey) {
        return;
      }
      setTimeout(() => {
        inflightRefreshes.delete(refreshKey);
      }, refreshDeduplicationWindowMs);
    });

  if (refreshKey) {
    inflightRefreshes.set(refreshKey, refreshPromise);
  }

  return refreshPromise;
}

export async function logoutDeveloperSession(cookieHeader?: string) {
  try {
    const response = await postBackendAuth('/v1/dev/auth/logout', undefined, cookieHeader);
    return {
      setCookieHeader: getSetCookieHeader(response),
    };
  } catch {
    return {
      setCookieHeader: null,
    };
  }
}

export function applyBackendSession(response: NextResponse, session: Pick<BackendSessionResponse, 'jwt' | 'setCookieHeader'>) {
  const expiresAt = decodeAccessTokenExpiry(session.jwt);

  response.cookies.set({
    name: backendAccessTokenCookieName,
    value: session.jwt,
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    expires: new Date(expiresAt),
  });
  response.cookies.set({
    name: backendAccessExpiryCookieName,
    value: String(expiresAt),
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    expires: new Date(expiresAt),
  });
  if (session.setCookieHeader) {
    response.headers.append('set-cookie', session.setCookieHeader);
  }
}

export function clearBackendSession(response: NextResponse) {
  response.cookies.set({
    name: backendAccessTokenCookieName,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    maxAge: 0,
  });
  response.cookies.set({
    name: backendAccessExpiryCookieName,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    maxAge: 0,
  });
}

export async function clearServerBackendSession() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: backendAccessTokenCookieName,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    maxAge: 0,
  });
  cookieStore.set({
    name: backendAccessExpiryCookieName,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: getCookieSecurity(),
    path: '/',
    maxAge: 0,
  });
}

export function getRequestedCallbackPath(rawValue: string | null | undefined) {
  if (!rawValue || !rawValue.startsWith('/')) {
    return null;
  }
  if (rawValue.startsWith('//')) {
    return null;
  }
  return rawValue;
}

export function resolvePostLoginPath(bootstrap: unknown) {
  if (!bootstrap || typeof bootstrap !== 'object') {
    return '/games';
  }

  const dashboard = (bootstrap as Record<string, unknown>).dashboard;
  if (dashboard && typeof dashboard === 'object') {
    const game = (dashboard as Record<string, unknown>).game;
    if (game && typeof game === 'object') {
      const id = (game as Record<string, unknown>).id;
      if (typeof id === 'string' && id.length > 0) {
        return `/game/${id}`;
      }
    }
  }

  return '/games';
}

export function getBackendAuthCookies(requestCookies: Pick<RequestCookiesLike, 'get'>) {
  return {
    accessToken: requestCookies.get(backendAccessTokenCookieName)?.value ?? null,
    expiresAt: Number(requestCookies.get(backendAccessExpiryCookieName)?.value ?? 0) || null,
  };
}

export function isBackendAccessTokenStale(expiresAt: number | null, thresholdMs = 15_000) {
  if (!expiresAt) {
    return true;
  }
  return expiresAt <= Date.now() + thresholdMs;
}

function buildCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

async function persistBackendSession(session: RefreshedBackendSession) {
  try {
    const cookieStore = await cookies();
    const expiresAt = decodeAccessTokenExpiry(session.jwt);
    cookieStore.set({
      name: backendAccessTokenCookieName,
      value: session.jwt,
      httpOnly: true,
      sameSite: 'lax',
      secure: getCookieSecurity(),
      path: '/',
      expires: new Date(expiresAt),
    });
    cookieStore.set({
      name: backendAccessExpiryCookieName,
      value: String(expiresAt),
      httpOnly: true,
      sameSite: 'lax',
      secure: getCookieSecurity(),
      path: '/',
      expires: new Date(expiresAt),
    });
  } catch {}
}

async function refreshServerBackendSession() {
  const cookieStore = await cookies();
  const cookieHeader = buildCookieHeader(cookieStore);

  if (!cookieHeader) {
    throw new BackendAuthError('AUTH_TOKEN_MISSING', 'Your dashboard session expired. Sign in again.');
  }

  return refreshDeveloperSession(cookieHeader, cookieHeader)
    .then(async (session) => {
      await persistBackendSession(session);
      return session;
    })
    .catch(async () => {
      await clearServerBackendSession();
      throw new BackendAuthError('AUTH_REFRESH_FAILED', 'Your dashboard session expired. Sign in again.');
    });
}

async function getServerBackendAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(backendAccessTokenCookieName)?.value;
  const expiresAt = Number(cookieStore.get(backendAccessExpiryCookieName)?.value ?? 0) || null;

  if (!accessToken || !expiresAt) {
    throw new BackendAuthError('AUTH_TOKEN_MISSING', 'Your dashboard session expired. Sign in again.');
  }
  return accessToken;
}

async function fetchWithBackendToken(path: string, accessToken: string, init?: RequestInit) {
  return fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  });
}

export async function backendFetch(path: string, init?: RequestInit) {
  const accessToken = await getServerBackendAccessToken().catch(async (error) => {
    if (error instanceof BackendAuthError && error.code === 'AUTH_TOKEN_MISSING') {
      const refreshedSession = await refreshServerBackendSession();
      return refreshedSession.jwt;
    }
    throw error;
  });
  let response = await fetchWithBackendToken(path, accessToken, init);

  if (response.status === 401) {
    const refreshedSession = await refreshServerBackendSession().catch((error) => {
      if (error instanceof BackendAuthError) {
        throw error;
      }
      throw new BackendAuthError('AUTH_UNAUTHORIZED', 'Your dashboard session expired. Sign in again.');
    });
    response = await fetchWithBackendToken(path, refreshedSession.jwt, init);
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 401) {
      await clearServerBackendSession();
      throw new BackendAuthError('AUTH_UNAUTHORIZED', 'Your dashboard session expired. Sign in again.');
    }
    throw new Error(text || `API request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

type RequestCookiesLike = {
  get(name: string): { value: string } | undefined;
};
