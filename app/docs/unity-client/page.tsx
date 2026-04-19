import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { unityClientPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Unity Client API Reference - TurnKit Docs',
  description: unityClientPageMeta.description,
  path: unityClientPageMeta.path,
  type: 'article',
  keywords: ['TurnKit Unity API', 'Unity multiplayer client API', 'Relay Unity reference'],
});

export default function UnityClientDocsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'TurnKit Unity client API reference',
    description: unityClientPageMeta.description,
    path: unityClientPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Unity Client API Reference', path: unityClientPageMeta.path },
  ]);

  return (
    <DocsShell meta={unityClientPageMeta}>
      <JsonLd id="unity-client-article-schema" data={articleSchema} />
      <JsonLd id="unity-client-breadcrumb-schema" data={breadcrumbSchema} />

      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        This is the complete reference for the TurnKit Unity client runtime API. <InlineCode code="Relay" language="csharp" /> is the
        main entry point for matchmaking, gameplay actions, lists, stats, and voting. For package installation and project setup, start
        with the{' '}
        <Link href="/docs/quickstart/unity" className="text-accent transition hover:text-text">
          Unity Quickstart
        </Link>
        .
      </p>

      <SectionTitle id="getting-started">Getting Started</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Before using Relay operations, authenticate the player and connect to a match. Identity setup differs by auth mode, so check{' '}
        <Link href="/docs/player-authentication-modes" className="text-accent transition hover:text-text">
          Player Authentication Modes
        </Link>{' '}
        before wiring your login flow.
      </p>

      <SectionTitle id="connection-flow">Connection Flow</SectionTitle>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`// Authenticate and enter the match
// Option A: Development / Open (No verification)
await Relay.MatchWithAnyone(playerId, ExampleConfig.Slug);

// Option B: Standard Session (After OTP/Social Auth)
var session = new TurnKitPlayerSession(playerId, playerToken, email);
await Relay.MatchWithAnyone(session, ExampleConfig.Slug);

// Option C: Secure/Signed (External backend verification)
var signed = new TurnKitSignedPlayer(playerId, timestamp, nonce, signature);
await Relay.MatchWithAnyone(signed, ExampleConfig.Slug);`}
      />

      <Table
        headers={['Method', 'Description']}
        rows={[
          [
            <InlineCode key="mwa" code="await Relay.MatchWithAnyone(playerId, configSlug)" language="csharp" />,
            'Resolves the relay config, joins matchmaking, stores session state, and opens the WebSocket. Returns true on success.',
          ],
          [
            <InlineCode key="reconnect" code="await Relay.Reconnect()" language="csharp" />,
            'Retries the WebSocket connection using the last known session context.',
          ],
          [
            <InlineCode
              key="resume"
              code="bool resumed = await Relay.Resume(playerId, slug, savedRelayToken, savedLastMoveNumber);"
              language="csharp"
            />,
            'Resumes a match after an app restart by reconnecting with saved state and replaying missed moves.',
          ],
          [
            <InlineCode key="leave" code="await Relay.LeaveQueue(playerId, configSlug)" language="csharp" />,
            'Leaves the matchmaking queue and closes any active WebSocket.',
          ],
        ]}
      />

      <Notice>
        For wire format, reconnect semantics, and server message shapes, pair this page with the{' '}
        <Link href="/docs/websocket" className="text-accent transition hover:text-text">
          WebSocket Protocol
        </Link>{' '}
        reference. For restart-safe reconnect flow in Unity, see{' '}
        <Link href="/docs/client-reconnection" className="text-accent transition hover:text-text">
          Unity Client Reconnection
        </Link>
        .
      </Notice>

      <SectionTitle id="core-relay-actions">Core Relay Actions</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        These methods control move submission and match flow once the client is connected.
      </p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [
            <InlineCode key="sendjson" code="Relay.SendJson(jsonString)" language="csharp" />,
            'Queues raw JSON to be included in the next move payload.',
          ],
          [
            <InlineCode key="commit" code="Relay.Commit()" language="csharp" />,
            'Sends all currently queued actions without ending your turn. Use for mid turn actions.',
          ],
          [
            <InlineCode key="endturn" code="Relay.EndMyTurn()" language="csharp" />,
            'Sends queued actions and marks the move as ending your turn.',
          ],
          [
            <InlineCode key="endgame" code="Relay.EndGame()" language="csharp" />,
            'Signals the server that the current match should end.',
          ],
          [
            <InlineCode key="vote" code="Relay.Vote(moveNumber, approved)" language="csharp" />,
            'Submits a vote on whether the specified move or variable change is valid. When voting is in SYNC mode, the server waits for votes from clients (as per config) before changing turn.',
          ],
        ]}
      />

      <SectionTitle id="lists-and-items">Lists &amp; Items</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Lists are the primary way to represent runtime state such as hands, decks, discard piles, and board zones.
      </p>

      <SubTitle>Accessing Lists</SubTitle>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`var results = Relay.List(ExampleConfig.List.results_public);      // throws if not found
var publicList = Relay.GetList(ExampleConfig.List.results_public); // returns null if missing

var myHands = Relay.GetMyLists(ExampleConfig.Tag.hand);
var opponentHands = Relay.GetOpponentsLists(ExampleConfig.Tag.hand);`}
      />

      <SubTitle>List Operations</SubTitle>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`// Spawn
list.Spawn("card_slug");
list.Spawn(customItemId, "card_slug");

// Move items
list.Move(SelectorType.TOP).To(targetList);
list.Move(SelectorType.BY_SLUGS, new[] { "king", "queen" })
    .Repeat(2)
    .IgnoreOwnership()
    .To(targetList);

// Remove and shuffle
list.Remove(SelectorType.ALL);
list.Remove(SelectorType.BY_ITEM_IDS, itemIds).Repeat(3);
list.Shuffle();`}
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="To">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".To(targetList)" language="csharp" /> completes and queues the move.
          </p>
        </InfoCard>
        <InfoCard title="Repeat">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".Repeat(count)" language="csharp" /> repeats the move or remove operation.
          </p>
        </InfoCard>
        <InfoCard title="IgnoreOwnership">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".IgnoreOwnership()" language="csharp" /> bypasses ownership checks, validate via voting.
          </p>
        </InfoCard>
      </div>

      <SubTitle>Querying Items</SubTitle>
      <div className="mb-5 flex flex-col gap-3 text-[14px] leading-[1.7] text-muted">
        <p>
          <InlineCode code="list.FindById(itemId)" language="csharp" /> returns the first matching item or <InlineCode code="null" language="csharp" />.
        </p>
        <p>
          <InlineCode code='list.FindBySlug("card_slug")' language="csharp" /> returns all items with that slug.
        </p>
        <p>
          <InlineCode code='list.FindBySlugs("a", "b", "c")' language="csharp" /> returns all items matching any provided slug.
        </p>
      </div>

      <SubTitle>Useful Properties</SubTitle>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Reach for <InlineCode code="list.Count" language="csharp" />, <InlineCode code="list.Items" language="csharp" />,{' '}
        <InlineCode code="list.Top" language="csharp" />, <InlineCode code="list.Bottom" language="csharp" />,{' '}
        <InlineCode code="list.IsOwnedByMe" language="csharp" />, and <InlineCode code="list.IsVisibleToMe" language="csharp" /> when
        rendering gameplay UI.
      </p>

      <SectionTitle id="stats-and-leaderboards">Stats &amp; Leaderboards</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Stats can be tracked per match or per player, and can feed directly into configured leaderboards. For the dedicated leaderboard
        module, continue to the{' '}
        <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
          Leaderboards docs
        </Link>
        . For webhook destinations and post-match routing, see{' '}
        <Link href="/docs/relay-stats-and-leaderboards" className="text-accent transition hover:text-text">
          Relay Stats &amp; Leaderboards
        </Link>
        .
      </p>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`// Per-player stat
Relay.Stat(ExampleConfig.Stats.Score)
    .ForPlayer(Relay.MySlot)
    .Add(150);

// Simple stat updates
Relay.Stat(ExampleConfig.Stats.Status).Set("won");
Relay.Stat(ExampleConfig.Stats.Tags).Add("first_blood", "aggressive");`}
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="ForPlayer">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".ForPlayer(slot)" language="csharp" /> targets a specific player and is required for per-player stats.
          </p>
        </InfoCard>
        <InfoCard title="Set">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".Set(value)" language="csharp" /> sets numeric, string, or string-list values.
          </p>
        </InfoCard>
        <InfoCard title="Add">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code=".Add(value)" language="csharp" /> increments numeric stats or appends to string-list stats.
          </p>
        </InfoCard>
      </div>

      <SubTitle>Direct Leaderboard Methods</SubTitle>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [
            <InlineCode
              key="submit"
              code="await Leaderboard.SubmitScore(playerId, score, metadata, leaderboardSlug)"
              language="csharp"
            />,
            'Submits a score manually.',
          ],
          [
            <InlineCode key="top" code="await Leaderboard.GetTopScores(playerId, limit, leaderboardSlug)" language="csharp" />,
            'Returns top entries.',
          ],
          [
            <InlineCode key="rank" code="await Leaderboard.GetMyRank(playerId, surrounding, leaderboardSlug)" language="csharp" />,
            "Gets the current player's rank plus nearby entries.",
          ],
          [
            <InlineCode
              key="combined"
              code="await Leaderboard.GetCombined(playerId, topLimit, surrounding, leaderboardSlug)"
              language="csharp"
            />,
            "Returns top scores and the current player's rank in one call.",
          ],
        ]}
      />
      <Notice>
        When automatic leaderboard scoring is enabled in your relay config, updates via <InlineCode code="Relay.Stat()" language="csharp" /> can
        update the linked leaderboard automatically.
      </Notice>

      <SectionTitle id="player-and-session">Player &amp; Session</SectionTitle>
      <SubTitle>Authentication</SubTitle>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`await TurnKitAuth.RequestOtp(email);
var session = await TurnKitAuth.VerifyOtp(email, otp);

new TurnKitPlayerSession(playerId, token, email);
new TurnKitSignedPlayer(playerId, timestamp, nonce, signature);
signedPlayer.BuildSignaturePayload(); // returns the string to sign`}
      />

      <SubTitle>Match State Properties</SubTitle>
      <div className="mb-5 flex flex-col gap-3 text-[14px] leading-[1.7] text-muted">
        <p>
          <InlineCode code="Relay.MyPlayerId" language="csharp" />, <InlineCode code="Relay.MySlot" language="csharp" />
        </p>
        <p>
          <InlineCode code="Relay.IsMyTurn" language="csharp" />, <InlineCode code="Relay.IsReady" language="csharp" />
        </p>
        <p>
          <InlineCode code="Relay.AllPlayers" language="csharp" />, <InlineCode code="Relay.GetPlayerBySlot(slot)" language="csharp" />
        </p>
        <p>
          <InlineCode code="Relay.LastAcknowledgedMoveNumber" language="csharp" />
        </p>
        <p>
          <InlineCode code="Relay.Resume(playerId, slug, relayToken, lastMoveNumber)" language="csharp" />
        </p>
      </div>

      <SubTitle>Helper &amp; Utility Methods</SubTitle>
      <div className="mb-8 flex flex-col gap-3 text-[14px] leading-[1.7] text-muted">
        <p>
          <InlineCode code="typedStatChanges.TryGet(statToken, out var change)" language="csharp" /> safely reads stat changes from messages.
        </p>
        <p>
          <InlineCode code="matchStartedMessage.ToString(listCount)" language="csharp" /> helps with debug formatting.
        </p>
        <p>
          <InlineCode code="Relay.AllLists" language="csharp" /> exposes a read-only view of initialized lists.
        </p>
      </div>

      <SectionTitle id="best-practices">Error Handling &amp; Best Practices</SectionTitle>
      <ul className="mb-8 list-disc space-y-2 pl-6 text-muted">
        <li>
          <InlineCode code="Relay.MatchWithAnyone()" language="csharp" /> returns <InlineCode code="false" language="csharp" /> instead of throwing on config or queue failures.
        </li>
        <li>
          Action methods such as <InlineCode code="Commit" language="csharp" />, <InlineCode code="EndMyTurn" language="csharp" />, and{' '}
          <InlineCode code="Vote" language="csharp" /> become no-ops when the WebSocket is disconnected.
        </li>
        <li>
          Prefer generated config enums like <InlineCode code="ExampleConfig.List.xxx" language="csharp" /> and{' '}
          <InlineCode code="ExampleConfig.Stats.xxx" language="csharp" /> over raw strings.
        </li>
        <li>Complex list operations are safest and clearest when you use the fluent builder pattern.</li>
        <li>
          Combine Relay with post-match webhooks for backend workflows, rewards, or verified leaderboard submission after each match.
        </li>
        <li>
          Wait until <InlineCode code="Relay.IsReady" language="csharp" /> is true before sending actions after reconnect. If the app
          restarts, persist the reconnect token and last acknowledged move number, then call <InlineCode code="Relay.Resume(...)" language="csharp" />.
        </li>
      </ul>

      <SectionTitle id="source-files">Main Source Files</SectionTitle>
      <div className="mb-2 flex flex-col gap-2 text-[14px] leading-[1.7] text-muted">
        <p>
          <InlineCode code="Assets/TurnKit/Runtime/Relay/Relay.cs" />
        </p>
        <p>
          <InlineCode code="Assets/TurnKit/Runtime/Relay/RelayList.cs" />
        </p>
        <p>
          <InlineCode code="Assets/TurnKit/Runtime/Relay/RelayStat.cs" />
        </p>
        <p>
          <InlineCode code="Assets/TurnKit/Runtime/Leaderboard/Leaderboard.cs" />
        </p>
        <p>
          <InlineCode code="Assets/TurnKit/Runtime/Core/TurnKitAuth.cs" />
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

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 mt-8 font-display text-[18px] font-semibold text-text">{children}</h3>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6] text-text">
      {children}
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<[React.ReactNode, React.ReactNode]>;
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
                <td key={cellIndex} className="border-b border-border px-4 py-3 align-top text-muted last:border-r-0">
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
