import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { docsIndexPageMeta, docsNavSections } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'Docs - TurnKit',
  description: 'TurnKit documentation for Relay, Unity quickstart, and WebSocket protocol integration.',
  alternates: {
    canonical: '/docs',
  },
};

export default function DocsIndexPage() {
  const primaryLinks = docsNavSections
    .flatMap((section) => section.links)
    .filter((link) => !link.external && (link.href === '/docs/relay' || link.href === '/docs/quickstart/unity' || link.href === '/docs/websocket'));

  return (
    <DocsShell meta={docsIndexPageMeta}>
      <section id="start-here" className="mb-12">
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
                {link.href === '/docs/relay'
                  ? 'See how TurnKit Relay handles authoritative validation, private state filtering, and signed results.'
                  : link.href === '/docs/quickstart/unity'
                    ? 'Install the Unity package, generate keys, and launch the sample scene.'
                    : 'Read the relay handshake, message types, reconnect flow, and error handling.'}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="guides" className="grid gap-4 md:grid-cols-2">
        {docsNavSections.map((section) => (
          <div key={section.title} className="rounded border border-border bg-surface p-6">
            <h2 className="mb-4 font-display text-xl font-semibold text-text">{section.title}</h2>
            <div className="space-y-3">
              {section.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[14px] text-muted transition hover:text-text"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="block text-[14px] text-muted transition hover:text-text">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </section>
    </DocsShell>
  );
}
