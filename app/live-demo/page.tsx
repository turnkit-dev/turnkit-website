import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';
import { TicTacToeLiveDemo } from '@/components/live-demo/tictactoe-live-demo';
import { buildMetadata } from '@/lib/seo';
import { getTicTacToeDemoServerConfig } from '@/lib/turnkit-demo-config';

export const dynamic = 'force-dynamic';

const liveDemoDescription =
  'Play a live TurnKit Tic-Tac-Toe match in the browser and see authoritative relay validation, synced turns, and real-time updates.';

export const metadata: Metadata = buildMetadata({
  title: 'TurnKit Live Demo - Tic-Tac-Toe over Authoritative Relay',
  description: liveDemoDescription,
  path: '/live-demo',
  keywords: ['live multiplayer demo', 'browser turn-based demo', 'authoritative relay demo', 'Tic-Tac-Toe multiplayer demo'],
});

export default function LiveDemoPage() {
  const serverConfig = getTicTacToeDemoServerConfig();

  return (
    <MarketingShell footerLayout="centered">
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[84px] pb-12 sm:pt-[96px] sm:pb-14">
        <section className="mb-6 sm:mb-8">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">Website Demo</div>
          <h1 className="max-w-none font-display text-[clamp(28px,9vw,54px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-text">
            TurnKit Live Demo - Tic-Tac-Toe
            <br />
            over Authoritative Relay
          </h1>
          <p className="mt-4 max-w-none text-[14px] leading-[1.75] text-muted sm:mt-5 sm:text-[15px]">
            Two independent browser clients playing through the same TurnKit relay session. Every move is validated and broadcast
            authoritatively by the server. Heartbeats keep both sockets alive.
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

        <TicTacToeLiveDemo isConfigured={serverConfig.isReady} />
      </main>
    </MarketingShell>
  );
}
