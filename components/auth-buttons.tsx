'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { performClientSignOut } from '@/lib/auth-client';

function buildCallbackUrl(callbackPath?: string) {
  if (!callbackPath) {
    return '/auth/post-login';
  }
  return `/auth/post-login?callbackUrl=${encodeURIComponent(callbackPath)}`;
}

export function SignInButtons({ callbackPath }: { callbackPath?: string }) {
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);

  async function startSignIn(provider: 'google' | 'github') {
    setPendingProvider(provider);
    await signIn(provider, {
      callbackUrl: buildCallbackUrl(callbackPath),
    });
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => startSignIn('google')}
        disabled={pendingProvider !== null}
        className="inline-flex items-center justify-center rounded-[4px] border border-border2 bg-surface px-4 py-3 text-[14px] font-medium text-text transition hover:bg-surface2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pendingProvider === 'google' ? 'Connecting Google...' : 'Continue with Google'}
      </button>
      <button
        type="button"
        onClick={() => startSignIn('github')}
        disabled={pendingProvider !== null}
        className="inline-flex items-center justify-center rounded-[4px] border border-border2 bg-surface px-4 py-3 text-[14px] font-medium text-text transition hover:bg-surface2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pendingProvider === 'github' ? 'Connecting GitHub...' : 'Continue with GitHub'}
      </button>
    </div>
  );
}

export function SignOutButton() {
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    await performClientSignOut();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={pending}
      className="rounded-[3px] border border-border2 px-3 py-2 text-[12px] text-muted transition hover:bg-surface hover:text-text disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
