import type { Metadata } from 'next';
import { MarketingShell } from '@/components/marketing-shell';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Zumba Space Marble Blast 2024 is a marble shooter game where you match 3 marbles of the same color to stop them before they reach the black hole.';

export const metadata: Metadata = {
  title: 'Zumba Space Marble Blast 2024 - TurnKit',
  description,
  alternates: {
    canonical: absoluteUrl('/zumba-space-marble-blast'),
  },
  openGraph: {
    title: 'Zumba Space Marble Blast 2024 - TurnKit',
    description,
    url: absoluteUrl('/zumba-space-marble-blast'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Zumba Space Marble Blast 2024 - TurnKit',
    description,
  },
};

export default function ZumbaSpaceMarbleBlastPage() {
  return (
    <MarketingShell>
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[96px] pb-12">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Other Projects</div>
        <h1 className="mb-5 font-display text-[clamp(30px,5vw,46px)] font-bold leading-[1.12] tracking-[-0.03em] text-text">
          Zumba Space Marble Blast 2024
        </h1>

        <p className="mb-8 text-[15px]">
          <a
            href="https://play.google.com/store/apps/details?id=com.zumbaspaceadventure.zumbaspacemarble"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Download on Google Play
          </a>
        </p>

        <p className="max-w-[820px] text-[15px] leading-[1.8] text-muted">
          Zumba Space Marble is a type of Marble shooter games, where you have to shoot marbles to match 3 in row of same color marble
          lines to pop them. The Zumba classic is in space! The balls or marbles will go towards Marble Black Hole and you have to aim
          your marble shooter carefully to match three ball marbles of the same colors and stop them.
        </p>
      </main>
    </MarketingShell>
  );
}
