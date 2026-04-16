import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { freeUnityLeaderboardsPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Free Unity Leaderboards - TurnKit Docs',
  description: freeUnityLeaderboardsPageMeta.description,
  path: freeUnityLeaderboardsPageMeta.path,
  type: 'article',
  keywords: ['free Unity leaderboards', 'self-hosted Unity leaderboard', 'RankDrop', 'open source leaderboard'],
});

const comparisonRows = [
  ['Open Source RankDrop', '45-60 minutes', 'Free', 'DIY developers, full control'],
  ['RankDrop Unity Asset', '~60 seconds', 'One-time fee', 'Indies who want speed'],
  ['TurnKit Hosted SaaS', 'Under 5 minutes', 'Usage-based', 'Games that scale without DevOps'],
];

export default function FreeUnityLeaderboardsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Free Unity leaderboards with RankDrop',
    description: freeUnityLeaderboardsPageMeta.description,
    path: freeUnityLeaderboardsPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Free Unity Leaderboards', path: freeUnityLeaderboardsPageMeta.path },
  ]);

  return (
    <DocsShell meta={freeUnityLeaderboardsPageMeta}>
      <JsonLd id="free-unity-leaderboards-article-schema" data={articleSchema} />
      <JsonLd id="free-unity-leaderboards-breadcrumb-schema" data={breadcrumbSchema} />

      <p className="mb-6 max-w-[760px] text-base leading-[1.7] text-muted">
        RankDrop is a lightweight, self-hosted leaderboard solution built for Unity games. It is completely free, open source under{' '}
        <strong className="text-text">Apache 2.0</strong>, has no monthly fees, and gives you full control over your data.
      </p>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        This guide covers the manual self-hosted setup. It usually takes <strong className="text-text">45-60 minutes</strong>.
      </p>

      <SectionTitle id="what-you-get">What You Get</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Leaderboard Modes">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Global leaderboards for permanent progression.</li>
            <li>Seasonal leaderboards for resets, events, and fresh competition.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Core API">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Simple score submission from your Unity client.</li>
            <li>Top score retrieval with pagination for scalable UI screens.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Customization">
          <p className="text-[13px] leading-[1.6] text-muted">
            The stack stays lightweight, so it is easy to customize, extend, and fit into your own deployment workflow.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="quick-start">Quick Start</SectionTitle>
      <div className="mb-6 rounded-[6px] border border-border bg-surface p-5">
        <ol className="list-decimal space-y-4 pl-5 text-[14px] leading-[1.7] text-muted">
          <li>
            Clone the repository.
            <CodeBlock
              className="mt-3"
              language="bash"
              code={`git clone https://github.com/Brainzy/rankdrop.git
cd rankdrop`}
            />
          </li>
          <li>
            Run the backend. Docker is the easiest path.
            <CodeBlock className="mt-3" language="bash" code={`docker compose up -d`} />
          </li>
          <li>
            Integrate with Unity using the included client scripts or Unity package. Configure your server URL and API key in your
            project.
          </li>
        </ol>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Submit a Score">
          <CodeBlock language="csharp" code={`await RankDrop.SubmitScore(playerName, score);`} />
        </InfoCard>
        <InfoCard title="Fetch Top Scores">
          <CodeBlock language="csharp" code={`var leaderboard = await RankDrop.GetTopScores(limit: 10);`} />
        </InfoCard>
      </div>

      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Full API details and setup examples live in the{' '}
        <a
          href="https://github.com/Brainzy/rankdrop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent transition hover:text-text"
        >
          RankDrop GitHub README
        </a>
        .
      </p>

      <SectionTitle id="when-to-use-open-source">When to Use Open Source</SectionTitle>
      <div className="mb-8 rounded-[6px] border border-border bg-surface p-5">
        <ul className="list-disc space-y-2 pl-5 text-[14px] leading-[1.7] text-muted">
          <li>You have time and you are open to learning some backend or DevoOps if needed</li>
          <li>You want complete control and no vendor lock-in.</li>
          <li>You are comfortable managing your own server, VPS, Docker deployment, and updates.</li>
        </ul>
      </div>

      <SectionTitle id="faster-alternatives">Faster Alternatives</SectionTitle>
      <Table
        headers={['Option', 'Setup Time', 'Cost', 'Best For']}
        rows={comparisonRows.map((row) => row.map((cell) => cell as React.ReactNode) as [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode])}
      />

      <div className="mb-8 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        <strong className="text-amber">Pro tip:</strong> Many developers start with the free open-source version, then move to hosted
        infrastructure when their game gains traction and they no longer want to manage servers, scaling, or restart recovery.
      </div>

      <SectionTitle id="next-steps">Next Steps</SectionTitle>
      <div className="mb-8 flex flex-col gap-3 text-[14px] leading-[1.7] text-muted">
        <p>
          Ready to try it? Head to the{' '}
          <a
            href="https://github.com/Brainzy/rankdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition hover:text-text"
          >
            GitHub repo
          </a>{' '}
          or compare all three paths on the{' '}
          <Link href="/leaderboard-options" className="text-accent transition hover:text-text">
            Leaderboard Options for Unity Games
          </Link>{' '}
          page.
        </p>
        <p>
          Questions or running into issues? Open a GitHub issue, or continue with{' '}
          <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
            TurnKit Leaderboards
          </Link>{' '}
          if you want a docs-native reference for the hosted alternative.
        </p>
        <p>
          If you are replacing a manual setup later, keep your Unity integration boundary narrow: centralize calls like{' '}
          <InlineCode code="SubmitScore" language="csharp" /> and <InlineCode code="GetTopScores" language="csharp" /> behind one
          service so migration stays cheap.
        </p>
      </div>
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
  rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode]>;
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
                <td key={cellIndex} className="border-b border-border px-4 py-3 align-top text-muted">
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
