import Link from 'next/link';
import { PricingTier } from '@/content/site-content';

interface PricingGridProps {
  tiers: PricingTier[];
  variant?: 'relay' | 'leaderboards';
  title?: string;
  description?: string;
  showFullPricingLink?: boolean;
}

const variantStyles = {
  relay: {
    grid: 'bg-border',
    featured: 'border-t-2 border-accent bg-[rgba(47,156,235,0.05)]',
    card: 'bg-surface',
    label: 'text-muted',
    price: 'text-text',
    note:
      'text-[13px] leading-[1.6] text-muted',
  },
  leaderboards: {
    grid: 'bg-[rgba(36,48,64,0.8)]',
    featured: 'border-t-2 border-[#7FC4FF] bg-[rgba(127,196,255,0.08)]',
    card: 'bg-[linear-gradient(180deg,rgba(13,17,23,0.98),rgba(17,24,32,0.92))]',
    label: 'text-[#8FBDE3]',
    price: 'text-[#D7E9F8]',
    note:
      'text-[13px] leading-[1.6] text-[#8FA3B7]',
  },
} as const;

export function PricingGrid({
  tiers,
  variant = 'relay',
  title,
  description,
  showFullPricingLink = false,
}: PricingGridProps) {
  const styles = variantStyles[variant];

  return (
    <div>
      {title ? <h3 className="mb-3 font-display text-[18px] font-semibold tracking-[-0.02em] text-text">{title}</h3> : null}
      {description ? <p className={`mb-8 max-w-[560px] ${styles.note}`}>{description}</p> : null}
      <div className={`grid gap-px overflow-hidden rounded border border-border sm:grid-cols-2 lg:grid-cols-3 ${styles.grid}`}>
        {tiers.map((tier) => (
          <div
            key={`${variant}-${tier.tier}`}
            className={`p-7 transition hover:bg-surface2 ${
              tier.featured ? styles.featured : styles.card
            }`}
          >
            <div className={`mb-3 text-[11px] font-medium uppercase tracking-[0.08em] ${styles.label}`}>{tier.tier}</div>
            <div className={`mb-1 font-display text-2xl font-bold tracking-[-0.02em] ${tier.free ? 'text-green' : styles.price}`}>
              {tier.price}
              {tier.suffix ? <span className="font-mono text-[13px] font-normal text-muted">{tier.suffix}</span> : null}
            </div>
            <div className="text-xs text-faint">{tier.ccu}</div>
          </div>
        ))}
      </div>
      {showFullPricingLink ? (
        <div className="mt-5 rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[13px] leading-[1.6] text-muted">
          <strong className="font-medium text-text">Leaderboards</strong> uses the same simple structure: First 20 CCU free, then
          $0.99/mo for 40 CCU, and up.{' '}
          <Link href="/pricing" className="font-medium text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]">
            See full pricing
          </Link>
        </div>
      ) : null}
    </div>
  );
}
