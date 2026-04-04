import { NextResponse, type NextRequest } from 'next/server';
import { applyBackendSession, exchangeDeveloperSession } from '@/lib/backend-auth';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { provider?: 'google' | 'github'; idToken?: string; accessToken?: string };
    const provider = body.provider;
    const proof = provider === 'google' ? body.idToken : provider === 'github' ? body.accessToken : undefined;

    if (!provider || (provider !== 'google' && provider !== 'github') || typeof proof !== 'string' || proof.length === 0) {
      return NextResponse.json({ error: 'Invalid exchange payload' }, { status: 400 });
    }

    const session = await exchangeDeveloperSession(provider, proof, request.headers.get('cookie') ?? undefined);
    const response = NextResponse.json({
      developer: session.developer ?? null,
      dashboardBootstrap: session.dashboardBootstrap ?? null,
    });

    applyBackendSession(response, session);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Exchange failed' }, { status: 500 });
  }
}
