import { NextResponse, type NextRequest } from 'next/server';
import { applyBackendSession, csrfCookieName, refreshDeveloperSession } from '@/lib/backend-auth';

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? undefined;
    const csrfToken = request.cookies.get(csrfCookieName)?.value ?? undefined;
    const session = await refreshDeveloperSession(cookieHeader, undefined, csrfToken);
    const response = NextResponse.json({ ok: true });
    applyBackendSession(response, session);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Refresh failed' }, { status: 401 });
  }
}
