import type { Metadata } from 'next';
import { MarketingShell } from '@/components/marketing-shell';
import { absoluteUrl } from '@/lib/seo';

const rankDropDescription =
  'RankDrop leaderboards in 60 seconds. Simple API, editor-first setup, open-source backend, and self-hosting on free infrastructure.';

const features = [
  'Multiple leaderboard types — all-time, daily, weekly, monthly with automatic resets',
  'Flexible scoring — high score wins, lowest time wins, or cumulative totals',
  'Player moderation — ban players globally, remove individual scores',
  'Webhook notifications — get notified on Discord or Slack when top scores are beaten',
  'Automatic backups — daily database backups with configurable retention',
  'Rotate game key — if your key is compromised, or if you forget your admin key redeploy',
];

export const metadata: Metadata = {
  title: 'RankDrop - TurnKit',
  description: rankDropDescription,
  alternates: {
    canonical: absoluteUrl('/rankdrop'),
  },
  openGraph: {
    title: 'RankDrop - TurnKit',
    description: rankDropDescription,
    url: absoluteUrl('/rankdrop'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'RankDrop - TurnKit',
    description: rankDropDescription,
  },
};

export default function RankDropPage() {
  return (
    <MarketingShell>
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[96px] pb-12">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">RankDrop</div>
        <h1 className="mb-4 font-display text-[clamp(30px,5vw,46px)] font-bold leading-[1.12] tracking-[-0.03em] text-text">
          Leaderboards in 60 seconds.
        </h1>

        <div className="mb-10 flex flex-col gap-3 text-[14px] text-text">
          <a
            href="/rankdrop-license"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            RankDrop License
          </a>
          <a
            href="https://assetstore.unity.com/packages/tools/integration/rankdrop-leaderboards-in-60-seconds-366688"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Download for Unity
          </a>
          <a
            href="https://brainzy.itch.io/godot-rankdrop-leaderboards-in-60-seconds-no-monthly-costs-and-own-your-data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Download for Godot
          </a>
        </div>

        <p className="max-w-[860px] text-[15px] leading-[1.8] text-muted">
          Simple API, <span className="docs-inline-code">RankDrop.SubmitScore(&quot;player1&quot;, 1.5);</span> Configure everything,
          or go with simple defaults already initialised.
        </p>

        <ul className="mt-8 space-y-3 text-[15px] leading-[1.75] text-muted">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <p className="mt-10 max-w-[860px] text-[15px] leading-[1.8] text-muted">
          The backend is open source (Apache 2.0) available at{' '}
          <a
            href="https://github.com/Brainzy/RankDrop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            github.com/Brainzy/RankDrop
          </a>
          , and can be self-hosted on free infrastructure. Koyeb and Aiven both have permanent free tiers that comfortably support
          most indie games at zero cost.
        </p>

        <p className="mt-6 max-w-[860px] text-[15px] leading-[1.8] text-muted">
          Support available at discord{' '}
          <a
            href="https://discord.gg/BUhb9a9xXd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            https://discord.gg/BUhb9a9xXd
          </a>
          .
        </p>
      </main>
    </MarketingShell>
  );
}
