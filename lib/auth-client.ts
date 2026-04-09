'use client';

import { signOut } from 'next-auth/react';

export async function performClientSignOut() {
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
  await signOut({ callbackUrl: '/' });
}
