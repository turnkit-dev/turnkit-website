import Link from 'next/link';
import { ReactNode } from 'react';
import { MarketingNavigation } from '@/components/marketing-navigation';
import { landingContent } from '@/content/site-content';

interface MarketingShellProps {
  children: ReactNode;
  footerLayout?: 'home' | 'docs' | 'centered';
}

export function MarketingShell({ children, footerLayout = 'centered' }: MarketingShellProps) {
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
      <MarketingNavigation navLinks={landingContent.navLinks} />

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
