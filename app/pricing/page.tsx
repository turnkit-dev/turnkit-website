import type { Metadata } from 'next';
import { MarketingShell } from '@/components/marketing-shell';
import { PricingGrid } from '@/components/pricing-grid';
import { DocsSidebar } from '@/components/docs-shell';
import { landingContent } from '@/content/site-content';

const pricingSections = [
  { href: '#overview', label: 'Overview' },
  { href: '#relay', label: 'Relay' },
  { href: '#leaderboards', label: 'Leaderboards' },
  { href: '#details', label: 'Details' },
  { href: '#burst-protection', label: 'Burst Protection' },
  { href: '#upgrading', label: 'Upgrading' },
  { href: '#auto-upgrade', label: 'Auto-upgrade' },
];

export const metadata: Metadata = {
  title: 'Pricing - TurnKit',
  description:
    'TurnKit pricing for Relay and Leaderboards. Start free, scale on a simple CCU model, and use burst protection when traffic spikes.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing - TurnKit',
    description:
      'TurnKit pricing for Relay and Leaderboards. Start free, scale on a simple CCU model, and use burst protection when traffic spikes.',
    url: 'https://turnkit.dev/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pricing - TurnKit',
    description:
      'TurnKit pricing for Relay and Leaderboards. Start free, scale on a simple CCU model, and use burst protection when traffic spikes.',
  },
};

export default function PricingPage() {
  return (
    <MarketingShell>
      <div className="mx-auto flex w-full max-w-[1400px] px-0 pt-[60px]">
        <aside className="hidden w-[260px] shrink-0 md:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[260px] overflow-y-auto border-r border-border bg-bg px-6 py-8"
            style={{ left: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <DocsSidebar currentPath="/pricing" />
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 md:max-w-[900px] md:px-[clamp(24px,5vw,64px)] md:py-12">
          <section id="overview" className="relative py-12 pb-8">
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
            <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
              Pricing
            </div>
            <h1 className="mb-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
              Simple pricing for
              <br />
              turn-based games.
            </h1>
            <p className="max-w-[560px] text-base leading-[1.6] text-muted">
              Start free, scale when your game grows, and keep Relay and Leaderboards on the same simple CCU model.
            </p>
          </section>

          <section id="relay" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Relay</div>
            <PricingGrid
              tiers={landingContent.pricing.relay}
              description="Server-side turn validation, hidden player data, and signed match results on a simple concurrent-user ladder."
            />
          </section>

          <section id="leaderboards" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Leaderboards</div>
            <PricingGrid
              tiers={landingContent.pricing.leaderboards}
              variant="leaderboards"
              description="Create different kinds of leaderboards and get scores. Submit easily in client, or disable it and submit on result from TurnKit Relay."
            />
          </section>

          <section id="details" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="grid gap-5">
              <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.7] text-text">
                <strong className="font-medium text-text">Concurrent Users (CCU)</strong> = Any player who performed an action in the past
                30 minutes.
              </div>
            </div>
          </section>

          <section id="burst-protection" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h3 className="mb-3 font-display text-[18px] font-semibold tracking-[-0.02em] text-text">Burst Protection</h3>
            <div className="rounded-[3px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
              All paid plans include burst protection. If you exceed your CCU limit, TurnKit automatically gives you{' '}
              <strong className="font-medium text-text">24 hours of unlimited capacity</strong> once per month.
            </div>
          </section>

          <section id="upgrading" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h3 className="mb-4 font-display text-[18px] font-semibold tracking-[-0.02em] text-text">Upgrading</h3>
            <div className="grid gap-5">
              <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.7] text-text">
                You can upgrade anytime, even during burst protection.
              </div>
              <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.7] text-text">
                If you stay on your current plan after burst protection ends, players{' '}
                <strong className="font-medium text-text">above the CCU limit</strong> will not be able to create new matches, while
                players under the limit continue normally.
              </div>
            </div>
          </section>

          <section id="auto-upgrade" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h3 className="mb-4 font-display text-[18px] font-semibold tracking-[-0.02em] text-text">Auto-upgrade</h3>
            <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.7] text-text">
              <strong className="font-medium text-text">Auto-upgrade</strong> (enable in dashboard) will automatically move you to the
              next tier when burst ends.
            </div>
          </section>
        </main>
        <aside className="hidden w-[220px] shrink-0 xl:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
            style={{ right: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
            <div className="flex flex-col gap-2">
              {pricingSections.map((section) => (
                <a key={section.href} href={section.href} className="border-l-2 border-transparent pl-3 text-xs text-muted transition hover:text-text">
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </MarketingShell>
  );
}
