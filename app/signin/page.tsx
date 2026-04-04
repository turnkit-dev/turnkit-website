import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SignInButtons } from '@/components/auth-buttons';
import { getAuthSession } from '@/lib/auth';
import { backendAccessTokenCookieName } from '@/lib/backend-auth';

function getErrorText(error: string | undefined, details: string | undefined) {
  if (error === 'google_proof') {
    return 'Google sign-in did not return the provider proof the backend requires.';
  }
  if (error === 'github_proof') {
    return 'GitHub sign-in did not return the provider proof the backend requires.';
  }
  if (error === 'exchange') {
    return details
      ? `Backend exchange failed: ${details}`
      : 'The backend rejected the provider proof or could not create the developer session.';
  }
  return null;
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string; details?: string }>;
}) {
  const [session, cookieStore, params] = await Promise.all([getAuthSession(), cookies(), searchParams]);
  const callbackPath = params.callbackUrl?.startsWith('/') ? params.callbackUrl : undefined;
  const backendAccessToken = cookieStore.get(backendAccessTokenCookieName)?.value;
  const hasExchangeError = params.error === 'exchange';

  if (session && backendAccessToken) {
    redirect(callbackPath ?? '/games');
  }

  if (session && !hasExchangeError) {
    redirect(callbackPath ? `/auth/post-login?callbackUrl=${encodeURIComponent(callbackPath)}` : '/auth/post-login');
  }

  const errorText = getErrorText(params.error, params.details);

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-[460px] rounded border border-border bg-surface p-8">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Developer Dashboard</div>
        <h1 className="font-display text-[34px] font-bold tracking-[-0.03em] text-text">Sign in</h1>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">
          Use Google or GitHub. Provider proof is exchanged on the server and the dashboard stays behind auth.
        </p>
        {errorText ? (
          <div className="mt-5 rounded border border-[rgba(220,80,80,0.45)] bg-[rgba(220,80,80,0.08)] px-4 py-3 text-[13px] text-text">
            {errorText}
          </div>
        ) : null}
        <div className="mt-6">
          <SignInButtons callbackPath={callbackPath} />
        </div>
      </div>
    </div>
  );
}
