import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';
import { absoluteUrl } from '@/lib/seo';

const otherProjectsDescription =
  'Other projects by TurnKit, including RankDrop and Hands Free Notes.';

export const metadata: Metadata = {
  title: 'Other Projects - TurnKit',
  description: otherProjectsDescription,
  alternates: {
    canonical: absoluteUrl('/other-projects'),
  },
  openGraph: {
    title: 'Other Projects - TurnKit',
    description: otherProjectsDescription,
    url: absoluteUrl('/other-projects'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Other Projects - TurnKit',
    description: otherProjectsDescription,
  },
};

export default function OtherProjectsPage() {
  return (
    <MarketingShell>
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[96px] pb-12">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Other Projects</div>
        <h1 className="mb-8 font-display text-[clamp(30px,5vw,46px)] font-bold leading-[1.12] tracking-[-0.03em] text-text">
          Tools by TurnKit
        </h1>

        <div className="flex flex-col gap-5">
          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">RankDrop</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Leaderboards in 60 seconds. No monthly fees. Production ready. You own your data. Self-hosted, configured from the
              Editor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/rankdrop"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://assetstore.unity.com/packages/tools/integration/rankdrop-leaderboards-in-60-seconds-366688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download for Unity
              </a>
              <a
                href="https://brainzy.itch.io/godot-rankdrop-leaderboards-in-60-seconds-no-monthly-costs-and-own-your-data"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download for Godot
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Hands Free Notes</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Offline speech to text. Speak to notes. Fully private, works in background.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/handsfree-notes"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.handsfree.notes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Zumba Space Marble Blast 2024</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Marble shooter set in space. Match 3 same-colored marbles to pop them before they reach the black hole.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/zumba-space-marble-blast"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.zumbaspaceadventure.zumbaspacemarble"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Interested in working together?</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Available for collaboration and freelance work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.upwork.com/freelancers/~01d45ddb224d7b2b46?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                View my Upwork profile
              </a>
              <a
                href="mailto:support@turnkit.dev"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Email me
              </a>
            </div>
          </section>
        </div>
      </main>
    </MarketingShell>
  );
}
