import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { DocsShell } from '@/components/docs-shell';
import { docsIndexPageMeta, docsNavSections } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Documentation - TurnKit Docs',
  description: docsIndexPageMeta.description,
  path: docsIndexPageMeta.path,
  keywords: ['TurnKit docs', 'turn-based multiplayer docs', 'Unity backend docs'],
});

export default function DocsIndexPage() {
  const collectionPageSchema = buildCollectionPageSchema({
    name: 'TurnKit Documentation',
    description: docsIndexPageMeta.description,
    path: docsIndexPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: docsIndexPageMeta.path },
  ]);

  return (
    <DocsShell meta={docsIndexPageMeta}>
      <Script
        id="docs-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Script
        id="docs-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <p id="start-here" className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
        Start here if you are integrating TurnKit for the first time. This hub links the fastest quickstarts, the core Relay and
        Leaderboards docs, and the protocol reference Google should be able to crawl directly from one place.
      </p>

      <div className="mb-12 grid gap-4 md:grid-cols-2">
        <DocsCard
          title="Unity Quickstart"
          description="Install the package, sign in, generate keys, and open the example scene."
          href="/docs/quickstart/unity"
        />
        <DocsCard
          title="REST API Quickstart"
          description="Create a game, generate your client key, and connect over REST or WebSocket."
          href="/docs/quickstart/rest-api"
        />
        <DocsCard
          title="TurnKit Relay"
          description="Authoritative turn handling, hidden state, validation, and signed results."
          href="/docs/relay"
        />
        <DocsCard
          title="Leaderboards"
          description="Submit scores, query ranks, and build seasonal or all-time boards."
          href="/docs/leaderboards"
        />
      </div>

      <h2 id="guides" className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
        Browse All Sections
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {docsNavSections.map((section) => (
          <section key={section.title} className="rounded-[6px] border border-border bg-surface p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent">{section.title}</h3>
            <div className="flex flex-col gap-2">
              {section.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[14px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </DocsShell>
  );
}

interface DocsCardProps {
  title: string;
  description: string;
  href: string;
}

function DocsCard({ title, description, href }: DocsCardProps) {
  return (
    <Link href={href} className="rounded-[6px] border border-border bg-surface p-5 transition hover:bg-surface2">
      <h2 className="mb-2 text-lg font-semibold text-text">{title}</h2>
      <p className="text-[14px] leading-[1.6] text-muted">{description}</p>
    </Link>
  );
}
