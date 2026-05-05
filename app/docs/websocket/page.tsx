import type { Metadata } from 'next';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { websocketPageMeta } from '@/content/docs-content';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'WebSocket Protocol - TurnKit Docs',
  description: websocketPageMeta.description,
  alternates: {
    canonical: absoluteUrl(websocketPageMeta.path),
  },
  openGraph: {
    title: 'WebSocket Protocol - TurnKit Docs',
    description: websocketPageMeta.description,
    url: absoluteUrl(websocketPageMeta.path),
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'WebSocket Protocol - TurnKit Docs',
    description: websocketPageMeta.description,
  },
};

export default function WebsocketDocsPage() {
  return (
    <DocsShell meta={websocketPageMeta}>
      <p className="mb-10 text-base leading-[1.6] text-muted">
        Authoritative turn relay for active matches. This page reflects the current server implementation in{' '}
        <InlineCode code="com.turnkit.platform.relay" className="break-all" />.
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="Endpoint">
          <InlineCode code="wss://api.turnkit.dev/v1/client/relay/ws" className="break-all" />
        </InfoCard>
        <InfoCard title="Auth">
          <p className="text-[13px] text-muted">
            <InlineCode code="Authorization: Bearer <relayToken>" className="break-all" />
            <br />
            <InlineCode code="?token=<relayToken>" className="break-all" />
          </p>
        </InfoCard>
        <InfoCard title="Format">
          <p className="text-[13px] text-muted">
            Text frames with JSON. Every message uses a top-level <InlineCode code="type" />.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="handshake">Handshake</SectionTitle>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-muted">
        <li>
          Join Relay over <InlineCode code="POST /v1/client/relay/queue" /> first. That response returns{' '}
          <InlineCode code="relayToken" />, <InlineCode code="sessionId" />, <InlineCode code="slot" />, and <InlineCode code="status" />.
        </li>
        <li>
          Queue join defaults to <InlineCode code="fillPolicy=REQUIRE_ALL_PLAYERS" />. For delegated fills, send{' '}
          <InlineCode code="fillPolicy=ALLOW_DELEGATED_SLOTS" /> with <InlineCode code="delegatedFillAfterSeconds" />.
        </li>
        <li>
          Use that <InlineCode code="relayToken" /> when opening <InlineCode code="/v1/client/relay/ws" />.
        </li>
        <li>
          Authenticate with either <InlineCode code="Authorization: Bearer <relayToken>" /> or <InlineCode code="?token=<relayToken>" />.
        </li>
      </ul>

      <div className="mb-6 overflow-x-auto rounded-[6px] border border-border bg-surface">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b border-border bg-surface2 px-4 py-3 text-left font-medium text-text">Player auth policy</th>
              <th className="border-b border-border bg-surface2 px-4 py-3 text-left font-medium text-text">Queue call</th>
              <th className="border-b border-border bg-surface2 px-4 py-3 text-left font-medium text-text">WebSocket call</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-border px-4 py-3 align-top text-muted">
                <InlineCode code="NO_AUTH" />
              </td>
              <td className="border-b border-border px-4 py-3 align-top text-muted">
                <InlineCode code="Authorization: Bearer <client-key>" /> plus <InlineCode code="X-Player-Id" />
              </td>
              <td className="border-b border-border px-4 py-3 align-top text-muted">
                <InlineCode code="relayToken" />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 align-top text-muted">
                <InlineCode code="AUTH_REQUIRED" />
              </td>
              <td className="px-4 py-3 align-top text-muted">
                Exchange auth first, then queue with <InlineCode code="Authorization: Bearer <player-jwt>" />
              </td>
              <td className="px-4 py-3 align-top text-muted">
                <InlineCode code="relayToken" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Notice>
        Relay queue auth now depends on your configured player auth policy. Only the WebSocket hop itself uses the short-lived{' '}
        <InlineCode code="relayToken" />. See{' '}
        <a href="/docs/player-authentication-modes" className="text-accent transition hover:text-text">
          Player Authentication
        </a>{' '}
        for the email OTP, backend proof, and UGS exchange flows.
      </Notice>

      <CodeBlock
        className="mb-6"
        language="http"
        code={`POST /v1/client/relay/queue
Authorization: Bearer <client-key>
X-Player-Id: player-123
Content-Type: application/json

{
  "slug": "tic-tac-toe",
  "fillPolicy": "REQUIRE_ALL_PLAYERS"
}`}
      />

      <CodeBlock
        className="mb-6"
        language="http"
        code={`POST /v1/client/relay/queue
Authorization: Bearer <player-jwt>
Content-Type: application/json

{
  "slug": "tic-tac-toe",
  "fillPolicy": "ALLOW_DELEGATED_SLOTS",
  "delegatedFillAfterSeconds": 15
}`}
      />

      <CodeBlock
        className="mb-6"
        language="javascript"
        code={`const ws = new WebSocket(
  "wss://api.turnkit.dev/v1/client/relay/ws",
  [],
  {
    headers: {
      Authorization: \`Bearer \${relayToken}\`
    }
  }
)`}
      />

      <CodeBlock
        className="mb-6"
        language="javascript"
        code={`const ws = new WebSocket(
  \`wss://api.turnkit.dev/v1/client/relay/ws?token=\${encodeURIComponent(relayToken)}\`
)`}
      />

      <Notice>
        <strong className="text-amber">Note:</strong> Browser WebSocket APIs do not allow custom headers. In browsers, use{' '}
        <InlineCode code="?token=<relayToken>" />.
      </Notice>

      <SectionTitle id="lifecycle">Session Lifecycle</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Connect Phase">
          <p className="text-[13px] text-muted">
            Sessions start in <InlineCode code="CONNECTING" />. All players must connect within 30 seconds or the match ends with <InlineCode code="CONNECT_TIMEOUT" />.
          </p>
        </InfoCard>
        <InfoCard title="Active Phase">
          <p className="text-[13px] text-muted">
            Match starts when queue policy conditions are met, then each player receives <InlineCode code="MATCH_STARTED" />. If turn enforcement is
            round robin, the current player timer starts immediately.
          </p>
        </InfoCard>
        <InfoCard title="Delegated Timeout State">
          <p className="text-[13px] text-muted">
            With <InlineCode code="onTurnTimeout=DELEGATE_MOVE" />, session enters <InlineCode code="WAITING_FOR_DELEGATED_MOVE" /> after timeout.
          </p>
        </InfoCard>
        <InfoCard title="Heartbeat">
          <p className="text-[13px] text-muted">
            The server checks heartbeats every 15 seconds. Missing 2 ping windows disconnects that socket.
          </p>
        </InfoCard>
        <InfoCard title="Reconnect">
          <p className="text-[13px] text-muted">
            Reconnect accepts only move gaps allowed by <InlineCode code="reconnectMoveHistorySize" />.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="client-to-server">Client to Server</SectionTitle>
      <Table
        headers={['Type', 'Payload', 'Rules']}
        rows={[
          ['PING', '{ "type": "PING" }', 'Records heartbeat and returns PONG.'],
          [
            'MOVE',
            'json, shouldEndMyTurn, actions',
            'Accepted only while session is active. Round robin sessions reject moves from non-active players. Optional json is capped at 1024 bytes.',
          ],
          ['VOTE', 'moveNumber, isValid', 'Only meaningful when sync voting is enabled and that move is currently pending vote.'],
          ['END_GAME', '{ "type": "END_GAME" }', 'Session ends with END_GAME only after every player has sent it.'],
          ['RECONNECT', 'lastMoveNumber', 'Requests delta replay or full resync after reconnect or resume.'],
        ]}
      />

      <SubTitle id="move-shape">MOVE Shape</SubTitle>
      <CodeBlock
        className="mb-6"
        language="json"
        code={`{
  "type": "MOVE_MADE",
  "actingPlayerId": "p1",
  "moveNumber": 1,
  "json": {
    "move": "alpha"
  },
  "changes": [
    {
      "type": "MOVE",
      "fromList": "deck",
      "toList": "hand",
      "items": [
        {
          "id": "card-1",
          "slug": "fireball",
          "creatorSlot": 1
        }
      ],
      "actingPlayerSlot": "1"
    }
  ],
  "statChanges": [
    {
      "statName": "score",
      "playerId": "p1",
      "oldValue": 0.0,
      "value": 3.0
    }
  ]
}
`}
      />

      <SubTitle id="action-variants">Action Variants</SubTitle>
      <Table
        headers={['Action', 'Fields']}
        rows={[
          ['SPAWN', 'items, toList'],
          ['MOVE', 'selector, fromList, toList, repeat, ignoreOwnership'],
          ['REMOVE', 'selector, fromList, repeat, ignoreOwnership'],
          ['SHUFFLE', 'list'],
        ]}
      />

      <SubTitle id="selector-variants">Selector Variants</SubTitle>
      <p className="mb-5 text-text">
        <InlineCode code="TOP" />, <InlineCode code="BOTTOM" />, <InlineCode code="RANDOM" />, <InlineCode code="ALL" />, <InlineCode code="BY_ITEM_IDS" />,{' '}
        <InlineCode code="BY_SLUGS" />
      </p>
      <CodeBlock
        className="mb-6"
        language="json"
        code={`{
  "action": "REMOVE",
  "selector": "BY_SLUGS",
  "slugs": ["poison", "bleed"],
  "fromList": "status",
  "repeat": 1,
  "ignoreOwnership": true
}`}
      />

      <SectionTitle id="server-to-client">Server to Client</SectionTitle>
      <Table
        headers={['Type', 'Purpose']}
        rows={[
          [
            'MATCH_STARTED',
            'Full session snapshot for that player, including visible list contents, active player, seed, and current move number.',
          ],
          ['MOVE_MADE', 'Committed move delta broadcast to connected players.'],
          ['TURN_STARTED', 'Sent when the active player changes in round robin mode.'],
          ['MOVE_REQUESTED_FOR_PLAYER', 'Timeout delegation request. Includes optional revealed private lists for other connected players.'],
          ['VOTE_FAILED', 'Sync vote failed. Includes failed move number and configured fail action.'],
          ['GAME_ENDED', 'Terminal state. Socket is closed after broadcast.'],
          ['PONG', 'Heartbeat acknowledgement.'],
          ['SYNC_COMPLETE', 'Reconnect catch-up finished for the current server move number.'],
          ['ERROR', 'Request rejected. Includes machine code, message, and current serverMoveNumber.'],
        ]}
      />

      <SubTitle id="match-started">MATCH_STARTED</SubTitle>
      <CodeBlock
        className="mb-6"
        language="json"
        code={`{
  "type": "MATCH_STARTED",
  "sessionId": "6c151663-94a8-4f85-a7a4-a6c58d0f8fa1",
  "players": [
    { "playerId": "p1", "slot": 0 },
    { "playerId": "p2", "slot": 1 }
  ],
  "delegatedSlots": [],
  "yourTurn": true,
  "activePlayerId": "p1",
  "lists": [
    {
      "name": "hand",
      "ownerPlayerIds": ["p1"],
      "visibleToPlayerIds": ["p1"]
    }
  ],
  "listContents": {
    "hand": [
      { "id": "c_17", "slug": "fireball", "creatorSlot": 0 }
    ]
  },
  "randomSeed": 918221,
  "serverMoveNumber": 0,
  "serverNowUtcMs": 1714600000000,
  "timerEndUtcMs": 1714600120000
}`}
      />

      <SubTitle id="move-made">MOVE_MADE</SubTitle>
      <CodeBlock
        className="mb-6"
        language="json"
        code={`{
  "type": "MOVE_MADE",
  "actingPlayerId": "p1",
  "moveNumber": 4,
  "json": {
    "cardId": "c_17"
  },
  "changes": [
    {
      "type": "MOVE",
      "fromList": "hand",
      "toList": "discard",
      "items": [
        { "id": "c_17", "slug": "fireball", "creatorSlot": 0 }
      ],
      "actingPlayerSlot": "0"
    }
  ]
}`}
      />

      <SectionTitle id="reconnect">Reconnect Behavior</SectionTitle>
      <ul className="mb-5 list-disc space-y-2 pl-6 text-muted">
        <li>
          If the client sends <InlineCode code="RECONNECT" /> with <InlineCode code="lastMoveNumber" /> equal to the server move number, the
          server only returns <InlineCode code="SYNC_COMPLETE" />.
        </li>
        <li>
          Reconnect is accepted only when move gap is either <InlineCode code="0" /> or between <InlineCode code="1" /> and{' '}
          <InlineCode code="reconnectMoveHistorySize" /> inclusive.
        </li>
        <li>
          If gap exceeds <InlineCode code="reconnectMoveHistorySize" />, reconnect is rejected with <InlineCode code="RECONNECT_MOVE_GAP_TOO_LARGE" />.
        </li>
      </ul>
      <CodeBlock className="mb-6" language="json" code={`{ "type": "RECONNECT", "lastMoveNumber": 12 }`} />

      <SectionTitle id="error-codes">Error Codes</SectionTitle>
      <Table
        headers={['Code', 'Meaning']}
        rows={[
          ['NOT_ACTIVE', 'Move was sent before the session became active.'],
          ['SYNC_WINDOW', 'Player is still inside the post-reconnect sync delay.'],
          ['NOT_YOUR_TURN', 'Round robin mode rejected a move from a non-active player.'],
          ['PAYLOAD_TOO_LARGE', 'MOVE.json exceeded 1024 bytes.'],
          ['INVALID_JSON', 'The optional json payload could not be serialized.'],
          ['ACTION_FAILED', 'An action was invalid for the current authoritative state.'],
          ['DELEGATED_MOVE_REQUIRED', 'Session is waiting for delegated move; non-delegated move was rejected.'],
          ['RECONNECT_MOVE_GAP_TOO_LARGE', 'Reconnect move gap exceeded configured reconnectMoveHistorySize.'],
          ['RECONNECT_EXPIRED', 'Saved reconnect state is no longer valid and the match cannot be resumed.'],
          ['STALE_SOCKET', 'Message or disconnect came from a superseded socket.'],
          ['SUPERSEDED_CONNECTION', 'An older socket was closed because a newer one connected.'],
        ]}
      />

      <SectionTitle id="terminal-reasons">Terminal Reasons</SectionTitle>
      <p className="mb-5 text-text">
        <InlineCode code="END_GAME" />, <InlineCode code="VOTE_FAIL" />, <InlineCode code="TIMEOUT" />, <InlineCode code="ALL_DISCONNECTED" />,{' '}
        <InlineCode code="CONNECT_TIMEOUT" />, <InlineCode code="ONE_PLAYER_LEFT" />
      </p>
      <p className="mb-5 text-[14px] text-muted">
        The current session package emits all of these reasons, with <InlineCode code="ALL_DISCONNECTED" /> reserved in the protocol enum for
        relay-level terminal handling.
      </p>

      <SectionTitle id="client-guidance">Client Guidance</SectionTitle>
      <ul className="list-disc space-y-2 pl-6 text-muted">
        <li>
          Treat Relay as a two-stage auth flow: queue with your current client credential, then open the socket with the returned{' '}
          <InlineCode code="relayToken" />.
        </li>
        <li>
          Send <InlineCode code="PING" /> on an interval shorter than 15 seconds.
        </li>
        <li>
          Treat <InlineCode code="serverMoveNumber" /> as the authoritative cursor
          for reconnects.
        </li>
        <li>
          Do not assume hidden lists contain real slugs. Invisible items arrive with empty <InlineCode code="slug" /> values in snapshots.
        </li>
        <li>
          Expect the socket to close after <InlineCode code="GAME_ENDED" /> and after stale socket rejection.
        </li>
      </ul>
    </DocsShell>
  );
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
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

function SubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mb-4 mt-8 scroll-mt-20 font-display text-[18px] font-semibold text-text">
      {children}
    </h3>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6]">
      {children}
    </div>
  );
}

interface TableProps {
  headers: string[];
  rows: string[][];
}

function Table({ headers, rows }: TableProps) {
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
          {rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell) => (
                <td key={cell} className="border-b border-border px-4 py-3 align-top text-muted">
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
