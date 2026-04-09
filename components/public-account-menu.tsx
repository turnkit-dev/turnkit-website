'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { performClientSignOut } from '@/lib/auth-client';

interface PublicAccountMenuProps {
  initials: string;
  name?: string | null;
  email?: string | null;
}

export function PublicAccountMenu({ initials, name, email }: PublicAccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  async function handleSignOut() {
    setIsSigningOut(true);
    await performClientSignOut();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(61,214,140,0.28)] bg-[rgba(61,214,140,0.14)] text-[12px] font-semibold uppercase tracking-[0.08em] text-text transition hover:border-[rgba(61,214,140,0.44)] hover:bg-[rgba(61,214,140,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(61,214,140,0.4)]"
      >
        {initials}
      </button>
      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-[90] mt-2 min-w-[220px] rounded-[10px] border border-border bg-[#0b1117] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.42)]"
        >
          <div className="border-b border-border px-3 py-3">
            <div className="text-[13px] font-medium text-text">{name ?? email ?? 'TurnKit account'}</div>
            {name && email ? <div className="mt-1 text-[12px] text-muted">{email}</div> : null}
          </div>
          <div className="pt-2">
            <Link
              href="/games"
              role="menuitem"
              className="block rounded-[8px] px-3 py-2 text-[13px] text-text transition hover:bg-surface2"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <button
              type="button"
              role="menuitem"
              disabled={isSigningOut}
              onClick={handleSignOut}
              className="mt-1 block w-full rounded-[8px] px-3 py-2 text-left text-[13px] text-muted transition hover:bg-surface2 hover:text-text disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
