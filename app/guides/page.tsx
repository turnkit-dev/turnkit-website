import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { guidesIndexPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'TurnKit Guides for Unity Developers',
  description: guidesIndexPageMeta.description,
  path: guidesIndexPageMeta.path,
  keywords: ['TurnKit guides', 'Unity game backend guides', 'Unity Player Store tutorials', 'Google Play IAP Unity'],
});

const guides = [
  {
    title: 'Google Play IAP: Grant Gold Tokens',
    description: 'Configure purchase verification and map a Play product to a TurnKit Player Store grant.',
    href: '/guides/google-play-iap',
  },
  {
    title: 'Require and Spend Tokens for Matchmaking',
    description: 'Let players pay with either of two currencies when joining a Relay queue.',
    href: '/guides/relay-token-requirements',
  },
  {
    title: 'Daily Login Rewards',
    description: 'Apply a 24-hour cooldown to a daily Player Store claim and grant tokens.',
    href: '/guides/daily-login-rewards',
  },
  {
    title: 'Rewarded Ads: Grant Tokens',
    description: 'Grant a fixed token reward after trusted rewarded-ad completion validation.',
    href: '/guides/rewarded-ad-tokens',
  },
  {
    title: 'Unity Client Reconnection',
    description: 'Handle dropped sockets, app restarts, replayed moves, and session resume.',
    href: '/docs/client-reconnection',
  },
  {
    title: 'EMAIL_OTP with Brevo',
    description: 'Configure Brevo SMTP and TurnKit email one-time-password authentication.',
    href: '/docs/guides/turnkit-auth-brevo',
  },
  {
    title: 'Free Unity Leaderboards',
    description: 'Set up a self-hosted leaderboard using the open-source RankDrop project.',
    href: '/docs/guides/free-unity-leaderboards',
  },
];

export default function GuidesIndexPage() {
  const collection = buildCollectionPageSchema({
    name: guidesIndexPageMeta.title,
    description: guidesIndexPageMeta.description,
    path: guidesIndexPageMeta.path,
  });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Guides', path: guidesIndexPageMeta.path },
  ]);

  return (
    <DocsShell meta={guidesIndexPageMeta}>
      <JsonLd id="guides-collection-schema" data={collection} />
      <JsonLd id="guides-breadcrumb-schema" data={breadcrumb} />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Step-by-step TurnKit setup and integration guides for Unity developers. Browse Player Store rewards, purchases, matchmaking,
        authentication, reconnects, and leaderboard options.
      </p>
      <h2 id="all-guides" className="mb-5 mt-8 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
        Browse Guides
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="rounded-[6px] border border-border bg-surface p-5 transition hover:bg-surface2">
            <h3 className="mb-2 text-lg font-semibold text-text">{guide.title}</h3>
            <p className="text-[14px] leading-[1.6] text-muted">{guide.description}</p>
          </Link>
        ))}
      </div>
    </DocsShell>
  );
}
