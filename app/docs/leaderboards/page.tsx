import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
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
        The optional <InlineCode code="leaderboard" /> parameter defaults to{' '}
        <InlineCode code="global" /> (premade Leaderboard). For REST endpoints, see{' '}
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
        className="mb-8"
        language="csharp"
        code={`// Submit a score (uses TurnKitConfig.PlayerId by default)
await Leaderboard.SubmitScore(15420, "{\\"level\\":\\"forest\\"}");

// Get top 10
var top = await Leaderboard.GetTopScores(limit: 10);

// Get my rank + 5 players around me
var myRank = await Leaderboard.GetMyRank(surrounding: 5);

// Combined top + my context (recommended for main screen)
var combined = await Leaderboard.GetCombined(topLimit: 50, surrounding: 5);`}
      />

      <SectionTitle id="full-api">Full API</SectionTitle>
      <CodeBlock
        className="mb-8"
        language="csharp"
        code={`// Generic internal helper for all leaderboard requests
private async Task<T> Request<T>(string url, string method, string playerId, string json = null)
{
    using UnityWebRequest req = new UnityWebRequest(url, method);
    if (json != null) req.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(json));
    req.downloadHandler = new DownloadHandlerBuffer();
    
    req.SetRequestHeader("Content-Type", "application/json");
    req.SetRequestHeader("Authorization", "Bearer YOUR_CLIENT_KEY");
    req.SetRequestHeader("X-Player-Id", playerId);

    var op = req.SendWebRequest();
    while (!op.isDone) await Task.Yield();

    return req.result == UnityWebRequest.Result.Success 
        ? JsonUtility.FromJson<T>(req.downloadHandler.text) 
        : default;
}

public async Task<ScoreSubmitResponse> SubmitScore(string playerId, double score, string board = "global")
{
    string json = "{\\"scoreValue\\":" + score + "}";
    return await Request<ScoreSubmitResponse>($"https://api.turnkit.dev/v1/leaderboards/{board}/scores", "POST", playerId, json);
}

public async Task<TopScores> GetTopScores(string playerId, int limit, string board = "global")
{
    return await Request<TopScores>($"https://api.turnkit.dev/v1/leaderboards/{board}/top?limit={limit}", "GET", playerId);
}

public async Task<PlayerScore> GetMyRank(string playerId, int surrounding, string board = "global")
{
    return await Request<PlayerScore>($"https://api.turnkit.dev/v1/leaderboards/{board}/me?surrounding={surrounding}", "GET", playerId);
}

public async Task<CombinedScores> GetCombined(string playerId, int topLimit, int surrounding, string board = "global")
{
    string url = $"https://api.turnkit.dev/v1/leaderboards/{board}/combined?topLimit={topLimit}&surrounding={surrounding}";
    return await Request<CombinedScores>(url, "GET", playerId);
}

[Serializable] public class ScoreSubmitResponse { public string id; public double scoreValue; public long rank; }
[Serializable] public class TopScores { public List<LeaderboardEntry> scores; }
[Serializable] public class PlayerScore { public long startRank; public List<LeaderboardEntry> scores; }
[Serializable] public class CombinedScores { public List<LeaderboardEntry> topScores; public PlayerScore playerScore; }
[Serializable] public class LeaderboardEntry { public string playerId; public double scoreValue; public long rank; public string metadata; }`}
      />
      <p className="max-w-[760px] text-base leading-[1.7] text-muted">
        Tip: Use <InlineCode code="GetCombined()" language="csharp" /> for the main leaderboard
        UI. It reduces requests and improves performance.
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