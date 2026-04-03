import { MarketingShell } from '@/components/marketing-shell';
import { PricingGrid } from '@/components/pricing-grid';
import { landingContent } from '@/content/site-content';

export default function PricingPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[60px]">
        <section className="relative py-12 pb-8">
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

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Relay</div>
          <PricingGrid
            tiers={landingContent.pricing.relay}
            title="Authoritative relay capacity"
            description="Server-side turn validation, hidden player data, and signed match results on a simple concurrent-user ladder."
          />
        </section>

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Leaderboards</div>
          <PricingGrid
            tiers={landingContent.pricing.leaderboards}
            variant="leaderboards"
            title="Ranking capacity"
            description="Same slot names, same CCU thresholds, lower monthly pricing for games that only need scoring and rankings."
          />
        </section>

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="grid gap-5">
            <div className="rounded-[3px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
              <strong className="font-medium text-text">Burst protection included.</strong> If your game spikes past its limit, TurnKit
              automatically grants 24 hours of unlimited capacity once per month.
            </div>
            <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.7] text-text">
              <strong className="font-medium text-text">Concurrent Users (CCU)</strong> = Any player who performed an action in the past
              30 minutes.
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
