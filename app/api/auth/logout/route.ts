import { NextResponse, type NextRequest } from 'next/server';
import { clearBackendSession, logoutDeveloperSession } from '@/lib/backend-auth';

export async function POST(request: NextRequest) {
  const session = await logoutDeveloperSession(request.headers.get('cookie') ?? undefined);
  const response = NextResponse.json({ ok: true });
  clearBackendSession(response);
  if (session.setCookieHeader) {
    response.headers.append('set-cookie', session.setCookieHeader);
  }
  return response;
}
