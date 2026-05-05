import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { MarketingShell } from '@/components/marketing-shell';
import { liveDemoExamplePageMeta } from '@/content/docs-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Live Tic-Tac-Toe Demo (Next.js + React) - TurnKit Docs',
  description: liveDemoExamplePageMeta.description,
  path: liveDemoExamplePageMeta.path,
  type: 'article',
  twitterCard: 'summary',
  keywords: ['Next.js multiplayer example', 'React relay example', 'browser turn-based multiplayer example', 'TurnKit web demo'],
});

const sdkCode = `// TurnKitRelay.ts
export async function queueSession() {
  const res = await fetch("/api/demos/tictactoe/session", { method: "POST" });
  const data = await res.json();
  if (!res.ok || !data.ok || !data.session) throw new Error(data.error || "Queue failed");
  return data.session;
}

export class TurnKitRelay {
  constructor(apiBaseUrl, relayToken, handlers = {}) {
    this.handlers = handlers;
    const url = new URL(apiBaseUrl + "/v1/client/relay/ws");
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.searchParams.set("token", relayToken);
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      handlers.open?.();
      this.ping();
      this.timer = setInterval(() => this.ping(), 10000);
    };
    this.ws.onmessage = (event) => handlers.message?.(JSON.parse(event.data));
    this.ws.onerror = () => handlers.error?.("WebSocket failed");
    this.ws.onclose = () => clearInterval(this.timer);
  }

  send(type, extra = {}) {
    this.ws.send(JSON.stringify({ type, ...extra }));
  }

  ping() { this.send("PING"); }
  move(json) { this.send("MOVE", { json, shouldEndMyTurn: true }); }
  vote(moveNumber, isValid) { this.send("VOTE", { moveNumber, isValid }); }
  endGame() { this.send("END_GAME"); }
}`;

const gameCode = `// TicTacToeGame.ts
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function winner(board) {
  return wins.find(([a,b,c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function readCellIndex(json) {
  const index = typeof json === "object" && json !== null ? json.cellIndex : Number(json);
  return Number.isInteger(index) ? index : null;
}

function isMoveValid(board, cellIndex) {
  return cellIndex !== null && cellIndex >= 0 && cellIndex < board.length && board[cellIndex] === "" && !winner(board);
}

export async function startTicTacToe(apiBaseUrl, render) {
  const [a, b] = await Promise.all([queueSession(), queueSession()]);
  const board = Array(9).fill("");
  const seats = new Map();
  const moveValidity = new Map();

  const applyMove = (msg) => {
    const index = readCellIndex(msg.json);
    const valid = moveValidity.has(msg.moveNumber) ? moveValidity.get(msg.moveNumber) : isMoveValid(board, index);
    moveValidity.set(msg.moveNumber, valid);
    seats.forEach((seat) => seat.relay.vote(msg.moveNumber, valid));
    if (!valid) return;

    board[index] = msg.moveNumber % 2 === 0 ? "O" : "X";
    render({ board, seats });

    if (winner(board)) seats.forEach((seat) => seat.relay.endGame());
  };

  [a, b].forEach((session, i) => {
    const seat = {
      name: i === 0 ? "Player One" : "Player Two",
      yourTurn: false,
      cheatMode: false,
      relay: new TurnKitRelay(apiBaseUrl, session.relayToken, {
        message: (msg) => {
          if (msg.type === "MATCH_STARTED") seat.yourTurn = !!msg.yourTurn;
          if (msg.type === "TURN_STARTED") seat.yourTurn = !!msg.yourTurn;
          if (msg.type === "MOVE_MADE") applyMove(msg);
          render({ board, seats });
        },
      }),
      play: (cellIndex) => seat.yourTurn && (seat.cheatMode || !board[cellIndex]) && seat.relay.move({ cellIndex }),
    };

    seats.set(session.playerId, seat);
  });

  render({ board, seats });
}`;

export default function LiveDemoExamplePage() {
  return (
    <MarketingShell footerLayout="docs">
      <div className="pt-[60px]">
        <DocsShell meta={liveDemoExamplePageMeta}>
          <p className="mb-6 text-[14px]">
            <Link href="/live-demo" className="text-accent transition hover:text-text">
              Try the interactive version →
            </Link>
          </p>

          <p id="overview" className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
            This is a simplified web-only example that mirrors the live demo on the website. It is intentionally split: TurnKit Web SDK
            (relay connection + heartbeats) and Game Logic (Tic-Tac-Toe rules and UI).
          </p>

          <section id="sdk" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              TurnKit Web SDK (simplified for demo)
            </h2>
            <p className="mb-8 max-w-[720px] text-[15px] leading-[1.7] text-muted">
              Simplified web-only SDK. For the full Unity SDK see{' '}
              <Link href="/examples" className="text-accent transition hover:text-text">
                Unity Examples
              </Link>
              .
            </p>
            <CodeBlock code={sdkCode} language="ts" />
          </section>

          <section id="game" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h2 className="mb-8 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Tic-Tac-Toe Game Logic
            </h2>
            <CodeBlock code={gameCode} language="ts" />
          </section>

          <section id="notes" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <h2 className="mb-4 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Notes</h2>
            <div className="max-w-[760px] space-y-4 text-[15px] leading-[1.7] text-muted">
              <p>
                Queues via <InlineCode code="/api/demos/tictactoe/session" />. The website demo currently keeps the queue step on the
                server, uses <InlineCode code="NO_AUTH" /> with <InlineCode code="X-Player-Id" />, and only returns the short-lived{' '}
                <InlineCode code="relayToken" /> to the browser.
              </p>
              <p>WebSocket uses <InlineCode code="?token=" /> because browsers cannot send custom headers.</p>
              <p>
                See{' '}
                <Link href="/docs/websocket" className="text-accent transition hover:text-text">
                  WebSocket Protocol
                </Link>{' '}
                for full message details.
              </p>
            </div>
          </section>
        </DocsShell>
      </div>
    </MarketingShell>
  );
}

