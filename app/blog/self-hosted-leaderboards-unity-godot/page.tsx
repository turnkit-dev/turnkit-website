import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { CodeBlock } from '@/components/code-block';
import { JsonLd } from '@/components/json-ld';
import { blogNavSections, selfHostedLeaderboardsPageMeta } from '@/content/blog-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

const articleDescription =
  'RankDrop gives Unity and Godot developers a self-hosted leaderboard backend with PostgreSQL, free infrastructure options, and no monthly costs.';

export const metadata: Metadata = buildMetadata({
  title: 'Self-Hosted Leaderboards in 60 Seconds (Unity & Godot)',
  description: articleDescription,
  path: selfHostedLeaderboardsPageMeta.path,
  type: 'article',
  keywords: ['self-hosted leaderboards', 'Unity leaderboard backend', 'Godot leaderboard backend', 'RankDrop', 'PostgreSQL'],
});

export default function SelfHostedLeaderboardsBlogPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Self-Hosted Leaderboards in 60 Seconds (Unity & Godot)',
    description: articleDescription,
    path: selfHostedLeaderboardsPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Self-Hosted Leaderboards', path: selfHostedLeaderboardsPageMeta.path },
  ]);

  return (
    <DocsShell meta={selfHostedLeaderboardsPageMeta} sections={blogNavSections}>
      <JsonLd id="self-hosted-leaderboards-article-schema" data={articleSchema} />
      <JsonLd id="self-hosted-leaderboards-breadcrumb-schema" data={breadcrumbSchema} />

      <section id="top" className="relative py-6 pb-8">
        <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
        <div className="mb-6 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
          Blog Post
        </div>

        <p className="mt-5 max-w-[760px] text-[16px] leading-[1.8] text-muted">
          RankDrop gives you a leaderboard backend you control, with PostgreSQL ownership, no monthly fees, and a setup flow that stays
          simple enough for Unity and Godot projects.
        </p>

        <div className="mt-6">
          <CodeBlock language="csharp" code={'RankDrop.SubmitScore("player1", 1.5);'} />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <StatCard title="No monthly costs" description="Run it on infrastructure you already have or free-tier hosting." />
          <StatCard title="Free infrastructure" description="Start small without signing up for another SaaS bill." />
          <StatCard title="Your data" description="Scores live in PostgreSQL you control, not someone else's dashboard." />
        </div>
      </section>

      <article className="space-y-8 text-[15px] leading-[1.8] text-muted">
        <section id="what-this-is" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            What this is
          </h3>
          <p>
            RankDrop is a self-hosted leaderboard backend you can run on your own infrastructure and connect to your game with a simple
            API.
          </p>
          <p className="mt-3">
            There are no subscriptions or vendor lock-in. It is just a backend you control.
          </p>
        </section>

        <section id="setup" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            60-second setup (Unity)
          </h3>
          <ol className="ml-5 list-decimal space-y-2">
            <li>Install the RankDrop asset</li>
            <li>Click deploy inside the Unity Editor</li>
            <li>Call the API</li>
          </ol>
          <p className="mt-4">
            That is it. You get a running backend and database without touching Docker or server config.
          </p>
        </section>

        <section id="solves" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            What it solves
          </h3>
          <p>Most leaderboard services:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>charge monthly</li>
            <li>store your data on their servers</li>
            <li>require ongoing maintenance or migration later</li>
          </ul>
          <p className="mt-4">RankDrop takes a different approach:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>you run it yourself</li>
            <li>you keep full control</li>
            <li>you can start for free</li>
          </ul>
        </section>

        <section id="features" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            Features
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Leaderboard types"
              items={['All-time', 'Daily / Weekly / Monthly (auto-reset)']}
            />
            <FeatureCard
              title="Scoring"
              items={['High score wins', 'Lowest time wins', 'Cumulative totals']}
            />
            <FeatureCard
              title="Control"
              items={['Ban players globally', 'Remove individual scores']}
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FeatureCard
              title="Integration"
              items={['Webhooks (Discord / Slack)', 'Swagger UI for testing']}
            />
          </div>
        </section>

        <section id="how-it-looks" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            How it looks
          </h3>
          <ul className="ml-5 list-disc space-y-2">
            <li>Submit score and it is instantly stored</li>
            <li>Query top scores and they come back sorted and ranked</li>
            <li>Works the same across Unity and Godot</li>
          </ul>
        </section>

        <section id="who-this-is-for" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            Who this is for
          </h3>
          <ul className="ml-5 list-disc space-y-2">
            <li>Indie developers who want to avoid SaaS costs</li>
            <li>Developers who want full control over their backend</li>
            <li>Projects that do not need complex cloud infrastructure</li>
          </ul>
        </section>

        <section id="options" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            Options
          </h3>
          <p>
            If you want to explore different ways to use it, there is a full comparison here:{' '}
            <Link href="/leaderboard-options" className="text-accent transition hover:text-text">
              Leaderboard Options
            </Link>
            .
          </p>
        </section>

        <section id="try-it" className="scroll-mt-20">
          <h3 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            Try it
          </h3>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              Open source (free):{' '}
              <a
                href="https://github.com/Brainzy/RankDrop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition hover:text-text"
              >
                https://github.com/Brainzy/RankDrop
              </a>
            </li>
            <li>
              Unity asset (fastest setup):{' '}
              <a
                href="https://assetstore.unity.com/packages/tools/integration/rankdrop-leaderboards-in-60-seconds-366688"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition hover:text-text"
              >
                Unity Asset Store page
              </a>
            </li>
            <li>
              Godot support included:{' '}
              <a
                href="https://brainzy.itch.io/godot-rankdrop-leaderboards-in-60-seconds-no-monthly-costs-and-own-your-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition hover:text-text"
              >
                Godot RankDrop page
              </a>
            </li>
          </ul>
        </section>
      </article>
    </DocsShell>
  );
}

function StatCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[6px] border border-border bg-surface p-4">
      <div className="mb-2 text-[13px] font-semibold text-text">{title}</div>
      <p className="text-[13px] leading-[1.65] text-muted">{description}</p>
    </div>
  );
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[6px] border border-border bg-surface p-5">
      <h4 className="mb-3 text-sm font-semibold text-text">{title}</h4>
      <ul className="ml-5 list-disc space-y-2 text-[14px] leading-[1.7] text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
