import type { ReactNode } from 'react';

interface LiveDemoPanelProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function LiveDemoPanel({ title, eyebrow, children }: LiveDemoPanelProps) {
  return (
    <section className="rounded-[8px] border border-border bg-surface p-5 shadow-[0_18px_80px_rgba(0,0,0,0.18)]">
      {eyebrow ? <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">{eyebrow}</div> : null}
      {title ? <h2 className="mb-4 font-display text-[20px] font-semibold tracking-[-0.02em] text-text">{title}</h2> : null}
      {children}
    </section>
  );
}
