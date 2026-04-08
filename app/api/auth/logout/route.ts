import { NextResponse, type NextRequest } from 'next/server';
import { clearBackendSession, csrfCookieName, logoutDeveloperSession } from '@/lib/backend-auth';

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? undefined;
  const csrfToken = request.cookies.get(csrfCookieName)?.value ?? undefined;
  const session = await logoutDeveloperSession(cookieHeader, csrfToken);
  const response = NextResponse.json({ ok: true });
  clearBackendSession(response);
  if (session.setCookieHeader) {
    response.headers.append('set-cookie', session.setCookieHeader);
  }
  return response;
}
