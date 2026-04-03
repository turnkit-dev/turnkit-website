'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { docsNavSections } from '@/content/docs-content';
import { landingContent } from '@/content/site-content';

export interface MobileMenuProps {
  ariaLabel: string;
  currentPath?: string;
  ctaHref?: string;
  ctaLabel?: string;
  docsTitle?: ReactNode;
}

export function MobileMenu({ ariaLabel, currentPath, ctaHref = '/#waitlist', ctaLabel = 'Get Early Access', docsTitle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activePath = currentPath ?? pathname;

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] border border-border2 bg-[#0d1117] text-text shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] stroke-current">
          <path d="M4 7H20M4 12H20M4 17H20" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <div className={`${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed inset-0 z-[80] bg-[#080c10] transition`}>
        <div className="min-h-full overflow-y-auto bg-[#080c10] p-6 pt-5">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-faint">Navigation</div>
            <button
              type="button"
              aria-label="Close menu"
              className="inline-flex items-center rounded-[3px] border border-border2 px-3 py-2 text-[12px] text-text"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="space-y-1">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-faint">Menu</div>
            {landingContent.navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[3px] px-3 py-3 text-[15px] text-text transition hover:bg-surface2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-[3px] px-3 py-3 text-[15px] text-text transition hover:bg-surface2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href={ctaHref}
              className="mt-3 block rounded-[3px] bg-accent px-3 py-3 text-[15px] font-medium text-white transition hover:bg-[#3AADF5]"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>

          <div className="my-8 h-px bg-border" />

          <div>
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-faint">{docsTitle ?? 'Docs'}</div>
            <div className="space-y-8">
              {docsNavSections.map((section) => (
                <div key={section.title}>
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-faint">{section.title}</div>
                  <div className="space-y-1">
                    {section.links.map((link) => {
                      const active = link.href === activePath;
                      const className = active
                        ? 'block rounded-[3px] border border-[rgba(88,166,255,0.4)] bg-[rgba(88,166,255,0.15)] px-3 py-3 text-[15px] text-[#58A6FF]'
                        : 'block rounded-[3px] px-3 py-3 text-[15px] text-text transition hover:bg-surface2';

                      return link.external ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.href} href={link.href} className={className} onClick={() => setIsOpen(false)}>
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
