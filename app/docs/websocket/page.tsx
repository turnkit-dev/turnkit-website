import type { Metadata } from 'next';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { websocketPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'WebSocket Protocol - TurnKit Docs',
  description: websocketPageMeta.description,
  alternates: {
    canonical: websocketPageMeta.path,
  },
  openGraph: {
    title: 'WebSocket Protocol - TurnKit Docs',
    description: websocketPageMeta.description,
    url: `https://turnkit.dev${websocketPageMeta.path}`,
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
          <InlineCode code="POST /v1/client/relay/queue" /> returns <InlineCode code="relayToken" /> alongside <InlineCode code="sessionId" /> and{' '}
          <InlineCode code="slot" />.
        </li>
        <li>
          Use that <InlineCode code="relayToken" /> when opening <InlineCode code="/v1/client/relay/ws" />.
        </li>
        <li>
          Authenticate with either <InlineCode code="Authorization: Bearer <relayToken>" /> or <InlineCode code="?token=<relayToken>" />.
        </li>
      </ul>

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
            When all players are present, each receives <InlineCode code="MATCH_STARTED" />. If turn enforcement is
            round robin, the current player timer starts immediately.
          </p>
        </InfoCard>
        <InfoCard title="Heartbeat">
          <p className="text-[13px] text-muted">
            The server checks heartbeats every 15 seconds. Missing 2 ping windows disconnects that socket.
          </p>
        </InfoCard>
        <InfoCard title="Reconnect">
          <p className="text-[13px] text-muted">
            Disconnected players enter a grace period defined by match config <InlineCode code="waitReconnectSeconds" />.
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
          ['RECONNECT', 'lastMoveNumber', 'Requests delta replay or full resync after reconnect.'],
        ]}
      />

      <SubTitle id="move-shape">MOVE Shape</SubTitle>
      <CodeBlock
        className="mb-6"
        language="json"
        code={`{
  "type": "MOVE",
  "json": {
    "cardId": "c_17",
    "targetLane": "discard"
  },
  "shouldEndMyTurn": true,
  "actions": [
    {
      "action": "MOVE",
      "selector": "BY_ITEM_IDS",
      "itemIds": ["c_17"],
      "fromList": "hand",
      "toList": "discard",
      "repeat": 1,
      "ignoreOwnership": false
    }
  ]
}`}
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
          ['TURN_CHANGED', 'Sent when the active player changes in round robin mode.'],
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
  "serverMoveNumber": 0
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
          If the client is behind but still within the last 10 moves, the server replays missed <InlineCode code="MOVE_MADE" /> messages.
        </li>
        <li>
          If the client is further behind, the server sends a fresh <InlineCode code="MATCH_STARTED" /> snapshot instead.
        </li>
        <li>
          After reconnect sync, the player enters a 2 second sync window. Moves from that player during that window are rejected with <InlineCode code="SYNC_WINDOW" />.
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
