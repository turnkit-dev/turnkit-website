import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MobileMenu } from '@/components/mobile-menu';
import { landingContent } from '@/content/site-content';

interface MarketingShellProps {
  children: ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-border bg-[rgba(8,12,16,0.85)] px-3 sm:px-[clamp(16px,4vw,64px)] backdrop-blur-xl">
        <Link href="/" className="flex min-w-0 shrink items-center gap-1.5 font-display text-[16px] font-extrabold tracking-[-0.02em] text-text sm:gap-2.5 sm:text-[18px]">
          <Image
            src="/assets/logo.png"
            alt="TurnKit turn-based multiplayer backend logo"
            width={32}
            height={32}
            className="h-8 w-8 drop-shadow-[0_0_6px_rgba(61,214,140,0.4)]"
          />
          <span className="hidden sm:inline">
            Turn<span className="text-accent">Kit</span>
          </span>
        </Link>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          {landingContent.navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[18px] py-2 text-xs font-medium text-white transition hover:bg-[#3AADF5]"
          >
            Get Early Access
          </a>
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-1.5 sm:hidden">
          <Link
            href="/#waitlist"
            className="inline-flex h-10 shrink-0 items-center rounded-[3px] bg-accent px-2 text-[11px] font-medium text-white transition hover:bg-[#3AADF5]"
          >
            Sign Up
          </Link>
          <MobileMenu ariaLabel="Open navigation menu" ctaHref="/#waitlist" ctaLabel="Sign Up" showDocsSection={false} />
        </div>
      </nav>

      {children}

      <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)]">
        <footer className="border-t border-border py-8">
          <div className="flex flex-col gap-4 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <div>TurnKit.dev - built by an indie developer, for indie developers.</div>
            <div className="flex gap-5">
              {landingContent.footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
