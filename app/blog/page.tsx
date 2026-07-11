import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { blogIndexPageMeta, blogNavSections } from '@/content/blog-content';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'TurnKit Blog: Multiplayer Game Backend Guides',
  description:
    'Read the TurnKit blog for practical guides on turn-based multiplayer architecture, authoritative game servers, leaderboards, and shipping Unity or Godot games faster.',
  path: blogIndexPageMeta.path,
  keywords: ['TurnKit blog', 'turn-based multiplayer blog', 'game backend blog'],
});

export default function BlogIndexPage() {
  const collectionPageSchema = buildCollectionPageSchema({
    name: 'TurnKit Blog',
    description: blogIndexPageMeta.description,
    path: blogIndexPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: blogIndexPageMeta.path },
  ]);

  return (
    <DocsShell meta={blogIndexPageMeta} sections={blogNavSections}>
      <JsonLd id="blog-collection-schema" data={collectionPageSchema} />
      <JsonLd id="blog-breadcrumb-schema" data={breadcrumbSchema} />
      <p id="posts" className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
        Articles about turn-based multiplayer architecture, server tradeoffs, and the practical parts of shipping games faster.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <BlogCard
          title="Self-Hosted Leaderboards in 60 Seconds (Unity & Godot)"
          description="A quick overview of RankDrop, free infrastructure, PostgreSQL ownership, and the 60-second Unity setup flow."
          href="/blog/self-hosted-leaderboards-unity-godot"
        />
        <BlogCard
          title="Making a Multiplayer Turn Based Game with a Hybrid Approach"
          description="A practical hybrid model that keeps server authority for generic features and leaves game-specific rules in the client."
          href="/blog/turn-based-multiplayer-hybrid-approach"
        />
      </div>
    </DocsShell>
  );
}

interface BlogCardProps {
  title: string;
  description: string;
  href: string;
}

function BlogCard({ title, description, href }: BlogCardProps) {
  return (
    <Link href={href} className="rounded-[6px] border border-border bg-surface p-5 transition hover:bg-surface2">
      <h2 className="mb-2 text-lg font-semibold text-text">{title}</h2>
      <p className="text-[14px] leading-[1.6] text-muted">{description}</p>
    </Link>
  );
}
