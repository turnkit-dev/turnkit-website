'use client';

import { useActionState, useEffect, useRef } from 'react';
import { initialWaitlistState, submitWaitlistAction } from '@/app/actions/waitlist';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string) => void;
    };
  }
}

export function WaitlistForm() {
  const [state, action, pending] = useActionState(submitWaitlistAction, initialWaitlistState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      window.umami?.track('waitlist-signup');
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-px w-px opacity-0"
        />
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="your@email.com"
          className="min-w-[240px] flex-1 rounded-[3px] border border-border2 bg-bg px-4 py-[11px] text-[13px] text-text outline-none transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[22px] py-[11px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5] disabled:cursor-not-allowed disabled:bg-border2"
        >
          {pending ? 'Submitting...' : 'Get Updates'}
        </button>
      </div>
      <p
        className={`min-h-5 text-[13px] ${
          state.status === 'success' ? 'text-green' : state.status === 'error' ? 'text-danger' : 'text-muted'
        }`}
      >
        {state.message}
      </p>
      <p className="text-xs text-faint">
        Or join the{' '}
        <a
          href="https://discord.gg/SqMVU5xex3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          Discord
        </a>{' '}
        to follow along and ask questions directly.
      </p>
    </form>
  );
}
