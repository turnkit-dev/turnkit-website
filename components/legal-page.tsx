import { ReactNode } from 'react';
import { MarketingShell } from '@/components/marketing-shell';

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updatedLabel: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, updatedLabel, children }: LegalPageProps) {
  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[60px]">
        <main className="py-8 md:py-12">
          <section className="relative py-12 pb-8">
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
            <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
              {eyebrow}
            </div>
            <h1 className="mb-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
              {title}
            </h1>
            <p className="text-[14px] text-muted">{updatedLabel}</p>
          </section>

          <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="prose prose-invert max-w-none text-[15px] leading-[1.8] text-muted prose-headings:font-display prose-headings:text-text prose-p:text-muted prose-strong:text-text prose-li:text-muted">
              {children}
            </div>
          </section>
        </main>
      </div>
    </MarketingShell>
  );
}
