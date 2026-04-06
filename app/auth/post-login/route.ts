import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';
import {
  applyBackendSession,
  buildSignInPath,
  clearBackendSession,
  exchangeDeveloperSession,
  getRequestedCallbackPath,
  resolvePostLoginPath,
} from '@/lib/backend-auth';

export async function GET(request: NextRequest) {
  const callbackPath = getRequestedCallbackPath(request.nextUrl.searchParams.get('callbackUrl'));
  const token = await getToken({ req: request, secret: authOptions.secret });

  if (!token || (token.provider !== 'google' && token.provider !== 'github') || typeof token.providerProof !== 'string') {
    return NextResponse.redirect(new URL(buildSignInPath(callbackPath, { reauth: true }), request.url));
  }

  try {
    const session = await exchangeDeveloperSession(token.provider, token.providerProof, request.headers.get('cookie') ?? undefined);
    const bootstrapTargetPath = resolvePostLoginPath(session.dashboardBootstrap);
    const targetPath = callbackPath && callbackPath !== '/games' ? callbackPath : bootstrapTargetPath;
    const response = NextResponse.redirect(new URL(targetPath, request.url));
    applyBackendSession(response, session);
    return response;
  } catch (error) {
    const response = NextResponse.redirect(new URL(buildSignInPath(callbackPath, { reauth: true }), request.url));
    clearBackendSession(response);
    return response;
  }
}
