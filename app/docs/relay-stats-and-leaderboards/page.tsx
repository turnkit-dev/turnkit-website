import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { relayIntegrationsPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Relay Stats & Leaderboards - TurnKit Docs',
  description: relayIntegrationsPageMeta.description,
  path: relayIntegrationsPageMeta.path,
  type: 'article',
  keywords: ['TurnKit Relay stats', 'TurnKit leaderboards integration', 'Unity relay webhook', 'match result webhook'],
});

export default function RelayIntegrationsDocsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'TurnKit Relay stats and leaderboards',
    description: relayIntegrationsPageMeta.description,
    path: relayIntegrationsPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Relay Stats & Leaderboards', path: relayIntegrationsPageMeta.path },
  ]);

  return (
    <DocsShell meta={relayIntegrationsPageMeta}>
      <Script
        id="relay-stats-and-leaderboards-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="relay-stats-and-leaderboards-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Easily connect the results of your{' '}
        <Link href="/docs/relay" className="text-accent transition hover:text-text">
          Relay
        </Link>{' '}
        matches to {' '}
        <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
          Leaderboards
        </Link>{' '} or webhooks. This lets you update global rankings automatically
        or notify your backend, Discord server, or any other service when a match ends.
      </p>

      <SectionTitle id="quick-overview">Quick Overview</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="Track Match Data">
          <p className="text-[13px] leading-[1.6] text-muted">
            Track custom stats such as score, kills, match time, status, or any other structured result you want to keep.
          </p>
        </InfoCard>
        <InfoCard title="Send To Leaderboards">
          <p className="text-[13px] leading-[1.6] text-muted">
            Route per-player or match-level stats into{' '}
            <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
              Leaderboards
            </Link>{' '}
            automatically when the Relay match finishes.
          </p>
        </InfoCard>
        <InfoCard title="Post To Webhooks">
          <p className="text-[13px] leading-[1.6] text-muted">
            Send the full match result payload to your own backend, analytics pipeline, or Discord bot for post-match workflows.
          </p>
        </InfoCard>
      </div>

      <div className="mb-8 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6] text-text">
        Use this together with the{' '}
        <Link href="/docs/unity-client#stats-and-leaderboards" className="text-accent transition hover:text-text">
          Unity Client API stat helpers
        </Link>{' '}
        and the{' '}
        <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
          Leaderboards docs
        </Link>{' '}
        if you want both in-match stat tracking and automatic post-match score submission.
      </div>

      <SectionTitle id="setting-up-tracked-stats">Setting Up Tracked Stats</SectionTitle>
      <ol className="mb-6 list-decimal space-y-4 pl-6 text-base leading-[1.7] text-muted">
        <li>
          In Unity, go to the top menu: <strong className="text-text">Assets &gt; TurnKit &gt; Config</strong>. Open the Relay
          configuration you want to edit.
        </li>
        <li>
          Scroll to the <strong className="text-text">Tracked Stats</strong> section and click <strong className="text-text">Add</strong>.
        </li>
        <li>Fill in the fields for each stat.</li>
      </ol>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Name">
          <p className="text-[13px] leading-[1.6] text-muted">
            A friendly stat name such as <InlineCode code="Score" />, <InlineCode code="Kills" />, or{' '}
            <InlineCode code="TimeSurvived" />.
          </p>
        </InfoCard>
        <InfoCard title="Data Type">
          <p className="text-[13px] leading-[1.6] text-muted">
            Choose <InlineCode code="double" />, <InlineCode code="string" />, or <InlineCode code="list of strings" /> depending on
            what you want to store.
          </p>
        </InfoCard>
        <InfoCard title="Scope">
          <p className="text-[13px] leading-[1.6] text-muted">
            Use <InlineCode code="PER_PLAYER" /> for separate values per player or <InlineCode code="MATCH" /> for a single shared
            match value.
          </p>
        </InfoCard>
        <InfoCard title="Initial Value">
          <p className="text-[13px] leading-[1.6] text-muted">
            The starting value for the stat. Numeric stats usually begin at <InlineCode code="0" />.
          </p>
        </InfoCard>
        <InfoCard title="Destination">
          <p className="text-[13px] leading-[1.6] text-muted">
            Choose <InlineCode code="LEADERBOARD" /> to update a board automatically or <InlineCode code="WEBHOOK" /> to include the
            stat in the webhook result payload.
          </p>
        </InfoCard>
        <InfoCard title="ID">
          <p className="text-[13px] leading-[1.6] text-muted">
            Select the target leaderboard or webhook from the generated dropdown. If a new option is missing, regenerate enums on the
            config screen.
          </p>
        </InfoCard>
      </div>

      <CodeBlock
        className="mb-8"
        language="csharp"
        code={`// Per-player leaderboard stat
Relay.Stat(ExampleConfig.Stats.Score)
    .ForPlayer(Relay.MySlot)
    .Add(125);

// Match-level webhook stat
Relay.Stat(ExampleConfig.Stats.MatchWinner).Set("player1");

// String-list webhook stat
Relay.Stat(ExampleConfig.Stats.Tags).Add("ranked", "daily_challenge");`}
      />

      <SectionTitle id="adding-webhooks">Adding Webhooks</SectionTitle>
      <ol className="mb-6 list-decimal space-y-4 pl-6 text-base leading-[1.7] text-muted">
        <li>
          In the same Relay Config, go to the <strong className="text-text">Webhooks</strong> section.
        </li>
        <li>
          Click <strong className="text-text">Add</strong>.
        </li>
        <li>Fill in the webhook details below.</li>
      </ol>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="ID">
          <p className="text-[13px] leading-[1.6] text-muted">A unique identifier that later appears in the tracked stat destination dropdown.</p>
        </InfoCard>
        <InfoCard title="URL">
          <p className="text-[13px] leading-[1.6] text-muted">The endpoint that will receive match data, such as your backend or a Discord webhook bridge.</p>
        </InfoCard>
        <InfoCard title="Headers">
          <p className="text-[13px] leading-[1.6] text-muted">
            Optional custom headers such as <InlineCode code="Authorization" /> if your endpoint requires them. We recommend adding an X-TurnKit-Secret header to your config and verifying it on your server to ensure incoming match data is authentic.
          </p>
        </InfoCard>
      </div>

      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Webhooks are useful when you want authoritative match results outside TurnKit. Common patterns include notifying a Discord bot,
        writing analytics events, granting backend rewards, or forwarding verified outcomes into your own systems after the match ends.
      </p>

      <SectionTitle id="example-webhook-payload">Example Webhook Payload</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        When a match ends, TurnKit sends a JSON payload containing the terminal reason, session identifiers, tracked stats, and player
        information.
      </p>
      <CodeBlock
        className="mb-8"
        language="json"
        code={`{
  "endReason": "END_GAME",
  "gameKeyId": "18ecd7ed-3a3d-463a-aafc-9ccf0e380b8f",
  "matchDurationSeconds": 5,
  "matchEndedAt": "2026-04-14T14:06:38.427308800Z",
  "matchStats": { ... },
  "playerStats": { ... },
  "players": [
    {
      "playerId": "player1",
      "slot": 1
    },
    {
      "playerId": "player2",
      "slot": 2
    }
  ],
  "relayConfigSlug": "example",
  "sessionId": "7725aa8c-fc30-49e2-97e7-607e16c25195"
}`}
      />

      <p className="max-w-[760px] text-base leading-[1.7] text-muted">
        If you need the match transport details behind these events, continue to the{' '}
        <Link href="/docs/websocket" className="text-accent transition hover:text-text">
          WebSocket Protocol
        </Link>{' '}
        docs. If you want the destination to be a ranking system, use this page alongside the{' '}
        <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
          Leaderboards
        </Link>{' '}
        guide.
      </p>
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
