import type { Metadata } from 'next';
import Link from 'next/link';
import { docsNavSections } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'Docs - TurnKit',
  description: 'TurnKit documentation for Unity quickstart and WebSocket protocol integration.',
  alternates: {
    canonical: '/docs',
  },
};

export default function DocsIndexPage() {
  const primaryLinks = docsNavSections
    .flatMap((section) => section.links)
    .filter((link) => !link.external && (link.href === '/docs/quickstart/unity' || link.href === '/docs/websocket'));

  return (
    <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)] pb-20 pt-[120px]">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Docs</div>
      <h1 className="mb-4 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
        TurnKit documentation.
      </h1>
      <p className="mb-10 max-w-[560px] text-base text-muted">
        Start with the Unity quickstart or the current WebSocket protocol reference.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded border border-border bg-surface p-6 transition hover:bg-surface2"
          >
            <div className="mb-2 font-display text-xl font-semibold text-text">{link.label}</div>
            <div className="text-[13px] text-muted">
              {link.href === '/docs/quickstart/unity'
                ? 'Install the Unity package, generate keys, and launch the sample scene.'
                : 'Read the relay handshake, message types, reconnect flow, and error handling.'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
