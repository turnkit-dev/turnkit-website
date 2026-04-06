import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SignInButtons } from '@/components/auth-buttons';
import { getAuthSession } from '@/lib/auth';
import { backendAccessTokenCookieName, buildSignInPath } from '@/lib/backend-auth';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string; details?: string; reauth?: string }>;
}) {
  const [session, cookieStore, params] = await Promise.all([getAuthSession(), cookies(), searchParams]);
  const callbackPath = params.callbackUrl?.startsWith('/') ? params.callbackUrl : undefined;
  const backendAccessToken = cookieStore.get(backendAccessTokenCookieName)?.value;
  const requiresFreshSignIn = params.reauth === '1';

  if (session && backendAccessToken) {
    redirect(callbackPath ?? '/games');
  }

  if (session && !requiresFreshSignIn) {
    redirect(callbackPath ? `/auth/post-login?callbackUrl=${encodeURIComponent(callbackPath)}` : '/auth/post-login');
  }
  if (params.error || params.details) {
    redirect(buildSignInPath(callbackPath, requiresFreshSignIn ? { reauth: true } : undefined));
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-[460px] rounded border border-border bg-surface p-8">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Developer Dashboard</div>
        <h1 className="font-display text-[34px] font-bold tracking-[-0.03em] text-text">Sign in</h1>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">
          Use Google or GitHub. Provider proof is exchanged on the server and the dashboard stays behind auth.
        </p>
        <div className="mt-6">
          <SignInButtons callbackPath={callbackPath} />
        </div>
      </div>
    </div>
  );
}
