import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MobileMenu } from '@/components/mobile-menu';
import { PublicAccountMenu } from '@/components/public-account-menu';
import { landingContent } from '@/content/site-content';
import { getAuthSession } from '@/lib/auth';
import { getUserInitials } from '@/lib/user-initials';

interface MarketingShellProps {
  children: ReactNode;
  footerLayout?: 'home' | 'docs' | 'centered';
}

export async function MarketingShell({ children, footerLayout = 'centered' }: MarketingShellProps) {
  const session = await getAuthSession();
  const user = session?.user;
  const initials = getUserInitials(user?.name, user?.email);

  const footerContent = (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col gap-4 text-[13px] text-faint">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {landingContent.footerLinks.map((link) =>
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
        </div>
      </div>
    </footer>
  );

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
          {session ? (
            <PublicAccountMenu initials={initials} name={user?.name} email={user?.email} />
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[18px] py-2 text-xs font-medium text-white transition hover:bg-[#3AADF5]"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-1.5 sm:hidden">
          {session ? <PublicAccountMenu initials={initials} name={user?.name} email={user?.email} /> : (
            <Link
              href="/signin"
              className="inline-flex h-10 shrink-0 items-center rounded-[3px] bg-accent px-3 text-[11px] font-medium text-white transition hover:bg-[#3AADF5]"
            >
              Sign In
            </Link>
          )}
          <MobileMenu
            ariaLabel="Open navigation menu"
            ctaHref="/signin"
            ctaLabel="Sign In"
            showDocsSection={false}
            account={session ? { name: user?.name, email: user?.email } : null}
          />
        </div>
      </nav>

      {children}

      {footerLayout === 'home' ? (
        <div className="mx-auto flex w-full max-w-[1180px] px-0">
          <div className="min-w-0 flex-1 px-[clamp(24px,5vw,48px)]">
            <div className="mx-auto max-w-[960px]">{footerContent}</div>
          </div>
          <div className="hidden w-[220px] shrink-0 xl:block" />
        </div>
      ) : footerLayout === 'docs' ? (
        <div className="mx-auto flex w-full max-w-[1400px] px-0">
          <div className="hidden w-[260px] shrink-0 md:block" />
          <div className="min-w-0 flex-1 px-5 md:max-w-[900px] md:px-[clamp(24px,5vw,64px)]">
            {footerContent}
          </div>
          <div className="hidden w-[220px] shrink-0 xl:block" />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)]">
          {footerContent}
        </div>
      )}
    </>
  );
}
