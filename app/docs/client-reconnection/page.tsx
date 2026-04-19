import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { clientReconnectionPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Unity Client Reconnection - TurnKit Docs',
  description: clientReconnectionPageMeta.description,
  path: clientReconnectionPageMeta.path,
  type: 'article',
  keywords: ['TurnKit reconnect', 'Unity reconnect', 'Relay resume', 'reconnect expired'],
});

export default function ClientReconnectionDocsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Unity client reconnection',
    description: clientReconnectionPageMeta.description,
    path: clientReconnectionPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Unity Client Reconnection', path: clientReconnectionPageMeta.path },
  ]);

  return (
    <DocsShell meta={clientReconnectionPageMeta}>
      <JsonLd id="client-reconnection-article-schema" data={articleSchema} />
      <JsonLd id="client-reconnection-breadcrumb-schema" data={breadcrumbSchema} />

      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit handles temporary socket drops automatically and supports restart-safe resume when you save a small reconnect snapshot.
        Pair this page with the{' '}
        <Link href="/docs/unity-client" className="text-accent transition hover:text-text">
          Unity Client API
        </Link>{' '}
        and{' '}
        <Link href="/docs/websocket#reconnect" className="text-accent transition hover:text-text">
          WebSocket reconnect behavior
        </Link>
        .
      </p>

      <SectionTitle id="socket-drop">Socket Drop (App stays running)</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit handles reconnection automatically. The client sends an automatic <InlineCode code="RECONNECT" /> message with the last
        acknowledged move number. The server replays any missed moves via <InlineCode code="OnMoveMade" language="csharp" /> and signals
        the end with <InlineCode code="OnSyncComplete" language="csharp" />.
      </p>

      <SubTitle>What you need to do</SubTitle>
      <ul className="mb-8 list-disc space-y-2 pl-6 text-muted">
        <li>
          Wait until <InlineCode code="Relay.IsReady" language="csharp" /> is true before sending any actions.
        </li>
        <li>
          If you need move history, store <InlineCode code="OnMoveMade" language="csharp" /> events yourself.
        </li>
        <li>
          If you&apos;re using TurnKit server lists, replayed moves automatically rebuild list state. Refresh your UI from{' '}
          <InlineCode code="Relay.GetList(...)" language="csharp" /> or <InlineCode code="Relay.AllLists" language="csharp" /> after sync
          completes.
        </li>
        <li>
          If your game logic depends on the <InlineCode code="message.json" /> payload, apply replayed moves without animations or wait
          times.
        </li>
      </ul>

      <SectionTitle id="restart">Game Crash or Restart</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Automatic reconnection will not work because in-memory data is lost. To resume a match, save these values locally:
      </p>

      <div className="mb-6 rounded-[6px] border border-border bg-surface p-5">
        <ul className="list-disc space-y-2 pl-6 text-muted">
          <li>
            <InlineCode code="relayToken" />
          </li>
          <li>
            <InlineCode code="lastMoveNumber" />
          </li>
          <li>
            <InlineCode code="playerId" /> and <InlineCode code="slug" /> for identity and metadata
          </li>
        </ul>
      </div>

      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`bool resumed = await Relay.Resume(playerId, slug, savedRelayToken, savedLastMoveNumber);

if (resumed)
{
    // Missed moves replay through OnMoveMade, then OnSyncComplete fires.
}
else
{
    // Fall back to normal matchmaking or join flow.
}`}
      />

      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        After a successful resume, the server replays missed moves followed by <InlineCode code="OnSyncComplete" language="csharp" /> the
        same way as a normal reconnect.
      </p>
      <Notice>
        If the server returns <InlineCode code="RECONNECT_EXPIRED" />, the match can no longer be resumed. Clear saved data and fall back
        to normal matchmaking or join flow.
      </Notice>

      <SectionTitle id="other-clients">Other Client Reconnection</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        The rules are the same for any client using the{' '}
        <Link href="/docs/websocket" className="text-accent transition hover:text-text">
          WebSocket protocol
        </Link>
        .
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Temporary Socket Drop">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Reconnect to the same relay WebSocket using the valid relay token.</li>
            <li>
              Send <InlineCode code='RECONNECT { lastMoveNumber }' />.
            </li>
            <li>
              Block outgoing actions until you receive <InlineCode code="OnSyncComplete" language="csharp" />.
            </li>
            <li>Replayed moves rebuild server list state automatically.</li>
            <li>If using custom payloads, apply every replayed move in order to your local game state.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Crash / Restart">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>
              Save at minimum <InlineCode code="relayToken" /> and <InlineCode code="lastMoveNumber" /> plus <InlineCode code="playerId" /> and{' '}
              <InlineCode code="slug" /> if needed.
            </li>
            <li>On restart, reconnect with the token and resume from the saved last move number.</li>
            <li>If resume succeeds, process missed moves normally.</li>
            <li>
              If you get <InlineCode code="RECONNECT_EXPIRED" />, the match cannot be resumed. Clear saved data and start a fresh join.
            </li>
          </ul>
        </InfoCard>
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
