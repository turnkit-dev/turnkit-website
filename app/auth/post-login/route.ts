import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import {
  applyBackendSession,
  clearBackendSession,
  exchangeDeveloperSession,
  getRequestedCallbackPath,
  resolvePostLoginPath,
} from '@/lib/backend-auth';

export async function GET(request: NextRequest) {
  const callbackPath = getRequestedCallbackPath(request.nextUrl.searchParams.get('callbackUrl'));
  const token = await getToken({ req: request, secret: authOptions.secret });

  if (!token || (token.provider !== 'google' && token.provider !== 'github') || typeof token.providerProof !== 'string') {
    return NextResponse.redirect(new URL(callbackPath ? `/signin?callbackUrl=${encodeURIComponent(callbackPath)}` : '/signin', request.url));
  }

  try {
    const session = await exchangeDeveloperSession(token.provider, token.providerProof, request.headers.get('cookie') ?? undefined);
    const bootstrapTargetPath = resolvePostLoginPath(session.dashboardBootstrap);
    const targetPath = callbackPath && callbackPath !== '/games' ? callbackPath : bootstrapTargetPath;
    const response = NextResponse.redirect(new URL(targetPath, request.url));
    applyBackendSession(response, session);
    return response;
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Exchange failed';
    const response = NextResponse.redirect(
      new URL(
        callbackPath
          ? `/signin?callbackUrl=${encodeURIComponent(callbackPath)}&error=exchange&details=${encodeURIComponent(details)}`
          : `/signin?error=exchange&details=${encodeURIComponent(details)}`,
        request.url,
      ),
    );
    clearBackendSession(response);
    return response;
  }
}
