import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';
import { TicTacToeLiveDemo } from '@/components/live-demo/tictactoe-live-demo';
import { buildMetadata } from '@/lib/seo';
export const dynamic = 'force-static';

const liveDemoDescription =
  'Watch a lightweight authoritative relay in action. Two browser clients play Tic-Tac-Toe with server-validated moves, enforced turns, and a server-issued relay token for the browser WebSocket.';

export const metadata: Metadata = buildMetadata({
  title: 'TurnKit Live Demo: Authoritative Relay for Turn-Based Multiplayer',
  description: liveDemoDescription,
  path: '/live-demo',
  keywords: [
    'turn-based multiplayer demo',
    'authoritative relay demo',
    'browser turn-based demo',
    'Tic-Tac-Toe multiplayer demo',
  ],
});

export default function LiveDemoPage() {
  return (
    <MarketingShell footerLayout="centered">
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[84px] pb-12 sm:pt-[96px] sm:pb-14">
        <section className="mb-6 sm:mb-8">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">Website Demo</div>
          <h1 className="max-w-none font-display text-[clamp(28px,9vw,54px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-text">
            TurnKit Live Demo: Authoritative Relay for Turn-Based Multiplayer
          </h1>
          <p className="mt-4 max-w-none text-[14px] leading-[1.75] text-muted sm:mt-5 sm:text-[15px]">
            <strong className="font-semibold text-text">Watch a lightweight authoritative relay in action.</strong> Two browser clients
            play Tic-Tac-Toe with server-validated moves, enforced turns, and a server-issued relay token for the browser socket.
          </p>
          <p className="mt-4 text-[14px] text-muted">
            <Link
              href="/examples/live-demo"
              className="font-medium text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
            >
              Check the code
            </Link>
          </p>
        </section>

        <TicTacToeLiveDemo />
      </main>
    </MarketingShell>
  );
}
