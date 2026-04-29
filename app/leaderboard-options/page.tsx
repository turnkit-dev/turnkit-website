import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { leaderboardOptionsPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Leaderboard Options for Unity Games',
  description: leaderboardOptionsPageMeta.description,
  path: leaderboardOptionsPageMeta.path,
  type: 'article',
  keywords: ['Unity leaderboard options', 'RankDrop', 'TurnKit Hosted SaaS', 'Unity leaderboard backend'],
});

const quickDecisionRows = [
  [
    'You have time and are open to learning if not familiar with backend or DevOps',
    <strong key="best-choice-open-source" className="text-text">
      Open Source RankDrop
    </strong>,
    'Full control, zero cost, you manage everything, but takes some time to setup',
  ],
  [
    'Indie dev who wants to ship fast',
    <strong key="best-choice-asset" className="text-text">
      RankDrop Asset for Unity or Godot
    </strong>,
    '60-second setup inside Unity Editor and also full control, zero cost and you manage everything',
  ],
  [
    'Studio or game with traction that hates DevOps',
    <strong key="best-choice-saas" className="text-text">
      TurnKit Hosted SaaS
    </strong>,
    'Its ready in seconds and has no scaling burden for you, free up to 20 CCU ',
  ],
];

const detailedComparisonRows = [
  ['Cost', 'Completely free (Apache 2.0)', 'One-time purchase', 'Usage-based (free tier available)'],
  ['Setup time', '45-90 minutes (manual)', '~60 seconds', 'Few seconds'],
  ['Unity Integration', 'Manual (HTTP client)', 'One-click from Unity Editor', 'Simple SDK + drag and drop'],
  ['Deployment', 'You host (Docker, Koyeb, VPS, etc.)', 'Asset generates and deploys for you', 'Fully hosted and managed by us'],
  ['Maintenance & Scaling', 'You handle everything', 'Minimal', 'Automatic (we manage servers, DB, updates)'],
  ['Leaderboard Types', 'All-time + auto-resetting (daily/weekly/etc.)', 'Same', 'Same + more advanced options'],
  [
    'Features',
    'Caching, atomic writes, moderation, webhooks',
    'Same + polished editor tools',
    'Same + TurnKit multiplayer extras (relay, matchmaking, economy)',
  ],
  ['Control & Data Ownership', '100% yours', 'High', 'High (you own your data)'],
  ['Best for', 'Tinkerers, learning, small experiments', 'Efficient indies who value speed', 'Games that grow and need reliability'],
];

export default function LeaderboardOptionsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Leaderboard options for Unity games',
    description: leaderboardOptionsPageMeta.description,
    path: leaderboardOptionsPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Leaderboard Options for Unity Games', path: leaderboardOptionsPageMeta.path },
  ]);

  return (
    <DocsShell meta={leaderboardOptionsPageMeta}>
      <JsonLd id="leaderboard-options-article-schema" data={articleSchema} />
      <JsonLd id="leaderboard-options-breadcrumb-schema" data={breadcrumbSchema} />

      <p className="mb-6 max-w-[760px] text-base leading-[1.7] text-muted">
        RankDrop started as a completely free, open-source leaderboard backend. It has now grown into three clear options so you can
        pick exactly what you need, from zero cost to zero maintenance.
      </p>

      <SectionTitle id="quick-decision-guide">Quick Decision Guide</SectionTitle>
      <Table
        headers={['You are...', 'Best Choice', 'Why']}
        rows={quickDecisionRows.map(
          (row) => row.map((cell) => cell as React.ReactNode) as [React.ReactNode, React.ReactNode, React.ReactNode],
        )}
      />

      <SectionTitle id="detailed-comparison">Detailed Comparison</SectionTitle>
      <ComparisonTable
        headers={['Feature', 'Open Source RankDrop', 'RankDrop Asset For Unity/Godot', 'TurnKit Hosted SaaS']}
        rows={detailedComparisonRows.map(
          (row) =>
            row.map((cell) => cell as React.ReactNode) as [
              React.ReactNode,
              React.ReactNode,
              React.ReactNode,
              React.ReactNode,
            ],
        )}
      />

      <SectionTitle id="honest-breakdown">Honest Breakdown</SectionTitle>
      <div className="mb-8 flex flex-col gap-4">
        <InfoCard title="Open Source RankDrop">
          <p className="text-[14px] leading-[1.7] text-muted">
            Start here if you enjoy infrastructure or want to keep everything under your control. It is production-ready, with a tiny
            Docker image, fast startup, a PostgreSQL backend, and zero licensing cost.
          </p>
          <p className="mt-3 text-[14px] leading-[1.7] text-muted">
            Many developers begin with this version, learn the system, and later upgrade when maintenance starts competing with game
            development time.
          </p>
        </InfoCard>
        <InfoCard title="RankDrop Unity Asset">
          <p className="text-[14px] leading-[1.7] text-muted">
            This is the middle ground. You get the same RankDrop core with a polished Unity/Godot Editor setup flow, so you avoid manual
            Docker and server config while keeping a high level of control.
          </p>
          <p className="mt-3 text-[14px] leading-[1.7] text-muted">
            It is aimed at indies who want the fastest path from empty project to working leaderboard without committing to a hosted
            backend from day one.
          </p>
        </InfoCard>
        <InfoCard title="TurnKit Hosted SaaS">
          <p className="text-[14px] leading-[1.7] text-muted">
            When your game has real players and you no longer want to babysit servers, scaling, backups, or resets, this is the
            straightforward choice.
          </p>
          <p className="mt-3 text-[14px] leading-[1.7] text-muted">
            It runs on the same RankDrop foundation, so moving up from open source is smooth. You focus on the game while the platform
            handles operations.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="ready-to-begin">Ready to Begin?</SectionTitle>
      <div className="mb-8 flex flex-col gap-3 text-[14px] leading-[1.7] text-muted">
        <p>
          Try it for free right now:{' '}
          <a
            href="https://github.com/Brainzy/rankdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition hover:text-text"
          >
            Open Source RankDrop on GitHub
          </a>
          .
        </p>
        <p>
          Want the manual path first? Read the{' '}
          <Link href="/docs/guides/free-unity-leaderboards" className="text-accent transition hover:text-text">
            Free Unity Leaderboards guide
          </Link>
          .
        </p>
        <p>
          Deploy in 60 seconds via the{' '}
          <a
            href="https://assetstore.unity.com/packages/tools/integration/rankdrop-leaderboards-in-60-seconds-366688"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition hover:text-text"
          >
            RankDrop Unity Asset Store page
          </a>
          {' '}or the{' '}
          <a
            href="https://brainzy.itch.io/godot-rankdrop-leaderboards-in-60-seconds-no-monthly-costs-and-own-your-data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition hover:text-text"
          >
            Godot RankDrop page
          </a>
          .
        </p>
        <p>
          Prefer hosted from day one? Go to{' '}
          <Link href="/pricing" className="text-accent transition hover:text-text">
            Pricing
          </Link>
          .
        </p>
      </div>
      <p className="text-[13px] text-faint">Last updated: April 2026</p>
    </DocsShell>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-border bg-surface p-5">
      <h3 className="mb-2 text-sm font-semibold text-text">{title}</h3>
      {children}
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
      {children}
    </h2>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode]>;
}) {
  return (
    <div className="mb-6 overflow-x-auto rounded-[6px] border border-border bg-surface">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border bg-surface2 px-4 py-3 text-left font-medium text-text">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-border px-4 py-3 align-top leading-[1.6] text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode]>;
}) {
  return (
    <div className="mb-6 overflow-x-auto rounded-[6px] border border-border bg-surface">
      <table className="min-w-[920px] border-collapse text-[13px]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border bg-surface2 px-4 py-3 text-left font-medium text-text">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-border px-4 py-3 align-top leading-[1.6] text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
