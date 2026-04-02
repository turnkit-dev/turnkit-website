'use server';

import { headers } from 'next/headers';
import { submitWaitlistRequest, type WaitlistResult } from '@/lib/waitlist';

export interface WaitlistFormState extends WaitlistResult {}

export const initialWaitlistState: WaitlistFormState = {
  status: 'idle',
  message: '',
};

export async function submitWaitlistAction(
  _previousState: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const email = String(formData.get('email') ?? '');
  const honeypot = String(formData.get('website') ?? '');
  const headerStore = await headers();
  const forwardedFor = headerStore.get('x-forwarded-for') ?? '';
  const realIp = headerStore.get('x-real-ip') ?? '';
  const ip = forwardedFor.split(',')[0]?.trim() || realIp || '127.0.0.1';

  return submitWaitlistRequest(email, honeypot, ip);
}
