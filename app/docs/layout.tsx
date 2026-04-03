import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from '@/components/mobile-menu';

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-border bg-[rgba(8,12,16,0.85)] px-4 sm:px-[clamp(16px,4vw,32px)] backdrop-blur-xl">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 font-display text-[16px] font-extrabold tracking-[-0.02em] text-text sm:shrink-0 sm:gap-2.5 sm:text-[18px]">
          <Image
            src="/assets/logo.png"
            alt="TurnKit logo"
            width={32}
            height={32}
            className="h-8 w-8 drop-shadow-[0_0_6px_rgba(61,214,140,0.4)]"
          />
          <span className="hidden sm:inline">
            Turn<span className="text-accent">Kit</span>
          </span>
        </Link>
        <div className="ml-10 hidden items-center gap-6 md:flex">
          <Link href="/docs" className="text-[13px] text-text">
            Docs
          </Link>
          <Link href="/docs/websocket" className="text-[13px] text-muted transition hover:text-text">
            API Reference
          </Link>
        </div>
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <a
            href="https://discord.gg/SqMVU5xex3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted transition hover:text-text"
          >
            Discord
          </a>
          <Link href="/#waitlist" className="inline-flex items-center rounded-[3px] bg-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-[#3AADF5]">
            Sign Up
          </Link>
        </div>
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <Link
              href="/#waitlist"
              className="inline-flex h-10 shrink-0 items-center rounded-[3px] bg-accent px-2.5 text-[11px] font-medium text-white transition hover:bg-[#3AADF5]"
            >
              Sign Up
            </Link>
            <MobileMenu ariaLabel="Open docs navigation" ctaHref="/#waitlist" ctaLabel="Sign Up" />
          </div>
        </div>
      </nav>
      <div className="pt-[60px]">{children}</div>
    </>
  );
}
