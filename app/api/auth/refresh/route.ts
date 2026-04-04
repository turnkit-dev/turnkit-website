import { NextResponse, type NextRequest } from 'next/server';
import { applyBackendSession, refreshDeveloperSession } from '@/lib/backend-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await refreshDeveloperSession(request.headers.get('cookie') ?? undefined);
    const response = NextResponse.json({ ok: true });
    applyBackendSession(response, session);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Refresh failed' }, { status: 401 });
  }
}
