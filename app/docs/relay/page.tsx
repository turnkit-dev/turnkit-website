import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { InlineCode } from '@/components/code-block';
import { relayPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'TurnKit Relay - TurnKit Docs',
  description: relayPageMeta.description,
  alternates: {
    canonical: relayPageMeta.path,
  },
  openGraph: {
    title: 'TurnKit Relay - TurnKit Docs',
    description: relayPageMeta.description,
    url: `https://turnkit.dev${relayPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'TurnKit Relay - TurnKit Docs',
    description: relayPageMeta.description,
  },
};

export default function RelayDocsPage() {
  return (
    <DocsShell meta={relayPageMeta}>
      <p id="intro" className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
        An authoritative server that enforces fair play while your game logic stays on the client. {' '}
        <Link href="/turn-based-game-server-comparison-2026" className="text-accent transition hover:text-text">
          See how it compares to other options here
        </Link>
         . It connects players over WebSocket,
        validates moves server-side, filters private state per player, and produces a cryptographically signed match result when the
        game ends or hands off directly to{' '}
        <Link href="/docs/leaderboards" className="text-accent transition hover:text-text">
          Leaderboards
        </Link>
        .
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="Authoritative">
          <p className="text-[13px] leading-[1.6] text-muted">
            Relay validates each move against the live server state before it reaches the rest of the match.
          </p>
        </InfoCard>
        <InfoCard title="Private By Default">
          <p className="text-[13px] leading-[1.6] text-muted">
            List ownership and visibility rules decide which players receive item data and which only receive filtered updates.
          </p>
        </InfoCard>
        <InfoCard title="Engine Agnostic">
          <p className="text-[13px] leading-[1.6] text-muted">
            Use it from Unity, Godot, or any custom client through a simple REST and WebSocket integration.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="how-it-works">How It Works</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="1. Connect Players">
          <p className="text-[13px] leading-[1.6] text-muted">
            Clients join a relay session, receive a relay token, and connect to the match WebSocket. The protocol details live in{' '}
            <Link href="/docs/websocket#handshake" className="text-accent transition hover:text-text">
              the handshake reference
            </Link>
            .
          </p>
        </InfoCard>
        <InfoCard title="2. Validate Every Move">
          <p className="text-[13px] leading-[1.6] text-muted">
            Each move is checked immediately: is it the player&apos;s turn, do they own the objects they are manipulating, and is the
            action valid for the current server state. See the{' '}
            <Link href="/docs/websocket#client-to-server" className="text-accent transition hover:text-text">
              client-to-server messages
            </Link>
            .
          </p>
        </InfoCard>
        <InfoCard title="3. Broadcast Filtered State">
          <p className="text-[13px] leading-[1.6] text-muted">
            Relay sends each player only the information they are allowed to see, so private lists stay private without custom
            filtering logic on the client.
          </p>
        </InfoCard>
        <InfoCard title="4. Sign The Result">
          <p className="text-[13px] leading-[1.6] text-muted">
            When the match ends, Relay produces a signed result your backend can trust for rewards, progression, or leaderboard
            updates.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="key-features">Key Features</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Turn Enforcement">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>
              <InlineCode code="Round Robin" />
              {' '}enforces strict turn order so
              players cannot act out of turn.
            </li>
            <li>
              <InlineCode code="Free Mode" />
              {' '}removes enforced order for
              simultaneous or flexible gameplay.
            </li>
          </ul>
        </InfoCard>
        <InfoCard title="Player Voting">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>
              <InlineCode code="Sync" />
              {' '}waits for votes before the game
              continues.
            </li>
            <li>
              <InlineCode code="Async" />
              {' '}collects votes in the background while
              play continues.
            </li>
            <li>On vote failure, Relay can end the match or skip the turn based on your configuration.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Custom JSON Actions">
          <p className="text-[13px] leading-[1.6] text-muted">
            <InlineCode code="Relay.SendJson(json)" language="csharp" />
            {' '}forwards your JSON payload
            to the other players so clients can exchange game-specific data without Relay knowing your full ruleset.
          </p>
        </InfoCard>
        <InfoCard title="List Operations">
          <p className="text-[13px] leading-[1.6] text-muted">
            Supported operations include spawn, move between lists, remove, shuffle, and targeted selection by top, bottom, random,
            item ID, or <InlineCode code="slug" />.
          </p>
        </InfoCard>
      </div>

      <SectionTitle id="private-data">Hand Hiding &amp; Visibility</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Relay manages hidden hands and private zones through server-owned lists. Each list declares its <span className="text-text">owner</span>{' '}
        (<InlineCode code="ownerPlayerIds" />) and{' '}
        <span className="text-text">visible audience</span>{' '}
        (<InlineCode code="visibleToPlayerIds" />).
      </p>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Ownership Rules">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Ownership controls who can modify the list.</li>
            <li>Visibility controls who receives the full item data, including slugs and contents.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Filtered Delivery">
          <p className="text-[13px] leading-[1.6] text-muted">
            Snapshot shape appears in{' '}
            <Link href="/docs/websocket#match-started" className="text-accent transition hover:text-text">
              MATCH_STARTED
            </Link>{' '}
            and deltas in{' '}
            <Link href="/docs/websocket#move-made" className="text-accent transition hover:text-text">
              MOVE_MADE
            </Link>
            .
          </p>
        </InfoCard>
      </div>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        This design lets your client use natural list names like deck, hand or discard. Relay does not define your game rules,
        but it does enforce privacy and authoritative state changes while clients can still vote on whether a move followed the intended
        game logic.
      </p>

      <SectionTitle id="flexibility">Built for Flexibility</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Turn enforcement, voting, and hand hiding are configurable per game. TurnKit handles the hard parts: fairness, security, and
        state filtering. Your client keeps the game-specific rules, presentation, and UX.
      </p>
      <p className="max-w-[760px] text-base leading-[1.7] text-muted">
        Integrate from Unity, Godot, or any engine over REST and WebSocket. For wire format, message types, reconnect flow, and protocol
        details, continue to the{' '}
        <Link href="/docs/websocket" className="text-accent transition hover:text-text">
          WebSocket protocol docs
        </Link>
        .
      </p>
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
