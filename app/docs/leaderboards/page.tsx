import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { leaderboardsPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'Leaderboards - TurnKit Docs',
  description: leaderboardsPageMeta.description,
  alternates: {
    canonical: leaderboardsPageMeta.path,
  },
  openGraph: {
    title: 'Leaderboards - TurnKit Docs',
    description: leaderboardsPageMeta.description,
    url: `https://turnkit.dev${leaderboardsPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Leaderboards - TurnKit Docs',
    description: leaderboardsPageMeta.description,
  },
};

export default function LeaderboardsDocsPage() {
  return (
    <DocsShell meta={leaderboardsPageMeta}>
      <SectionTitle id="create-leaderboard">Create Leaderboard Type You Need</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Reset Windows">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>All-time leaderboards never reset.</li>
            <li>Daily, weekly, and monthly boards reset automatically.</li>
            <li>Archived snapshots can be kept when a season rolls over.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Ranking Logic">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Descending mode supports classic high score leaderboards.</li>
            <li>Ascending mode supports lowest-time or lowest-moves wins.</li>
            <li>Choose best-score-only, multiple entries, or cumulative totals.</li>
          </ul>
        </InfoCard>
      </div>

      <SectionTitle id="score-submission">Score Submission</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Submit scores with optional metadata. Server-side validation enforces min and max bounds. Invalid submissions are rejected with
        clear errors.
      </p>
      <div className="mb-8 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6]">
        <strong className="text-amber">Note:</strong> Direct client submission can be disabled on the server for security. Connect via
        webhook to your own backend, or use native integration with the{' '}
        <Link href="/docs/relay" className="text-accent transition hover:text-text">
          TurnKit Relay
        </Link>{' '}
        for authoritative scoring.
      </div>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        The optional <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">leaderboard</code> parameter defaults to{' '}
        <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">global</code> (premade Leaderboard). For REST endpoints, see{' '}
        <Link href="/docs/api#tag/dev--leaderboards" className="text-accent transition hover:text-text">
          the leaderboard API reference
        </Link>
        .
      </p>

      <SectionTitle id="queries">Queries</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Top N Players">
          <p className="text-[13px] leading-[1.6] text-muted">Fetch the highest or lowest ranked entries with limits from 1 to 100.</p>
        </InfoCard>
        <InfoCard title="Current Rank">
          <p className="text-[13px] leading-[1.6] text-muted">Get the current player&apos;s live position without loading the full board.</p>
        </InfoCard>
        <InfoCard title="Surrounding Players">
          <p className="text-[13px] leading-[1.6] text-muted">Request +/-N entries around a player to show immediate context in the UI.</p>
        </InfoCard>
        <InfoCard title="Combined Response">
          <p className="text-[13px] leading-[1.6] text-muted">
            Fetch top scores and player context in one request for the main leaderboard screen.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="extras">Extras</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Metadata">
          <p className="text-[13px] leading-[1.6] text-muted">
            Attach optional JSON or string metadata to each score for level, run type, build version, or replay references.
          </p>
        </InfoCard>
        <InfoCard title="Configuration">
          <p className="text-[13px] leading-[1.6] text-muted">
            Configure leaderboard behavior in full when creating it, including bounds, reset schedule, ordering, and entry rules.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="quick-usage">Quick Usage</SectionTitle>
      <CodeBlock
        code={`// Submit a score (uses TurnKitConfig.PlayerId by default)
await Leaderboard.SubmitScore(15420, "{\\"level\\":\\"forest\\"}");

// Get top 10
var top = await Leaderboard.GetTopScores(limit: 10);

// Get my rank + 5 players around me
var myRank = await Leaderboard.GetMyRank(surrounding: 5);

// Combined top + my context (recommended for main screen)
var combined = await Leaderboard.GetCombined(topLimit: 50, surrounding: 5);`}
      />
      <CodeBlock
        code={`// Example shape from GetCombined()
combined.top[0].playerId;
combined.top[0].score;
combined.top[0].rank;
combined.player?.rank;
combined.player?.surrounding;`}
      />

      <SectionTitle id="full-api">Full API</SectionTitle>
      <CodeBlock
        code={`/// <summary>
/// Submits a score. Player identity from TurnKitConfig.PlayerId (or pass explicitly).
/// </summary>
public static Task<ScoreSubmitResponse> SubmitScore(
    double score,
    string metadata = null,
    string leaderboard = null);

/// <summary>
/// Fetches top N scores.
/// </summary>
public static Task<TopScores> GetTopScores(
    int limit = 10,
    string leaderboard = null);

/// <summary>
/// Fetches current player's rank + surrounding entries.
/// </summary>
public static Task<PlayerScore> GetMyRank(
    int surrounding = 5,
    string leaderboard = null);

/// <summary>
/// Fetches any player's rank + surrounding entries.
/// </summary>
public static Task<PlayerScore> GetPlayerRank(
    string playerId,
    int surrounding = 5,
    string leaderboard = null);

/// <summary>
/// Combined top scores + player context in one call.
/// </summary>
public static Task<CombinedScores> GetCombined(
    int topLimit = 10,
    int surrounding = 5,
    string leaderboard = null);`}
      />
      <p className="max-w-[760px] text-base leading-[1.7] text-muted">
        Tip: Use <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">GetCombined()</code> for the main leaderboard
        UI. It reduces requests and improves performance, and all methods use the account&apos;s default{' '}
        <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">global</code> leaderboard when none is passed.
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

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mb-8 overflow-x-auto rounded-[6px] border border-border bg-surface p-5 text-[13px] leading-[1.7] text-[#eef5fb]">
      <code>{code}</code>
    </pre>
  );
}
