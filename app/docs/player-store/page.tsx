import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { playerStorePageMeta } from '@/content/docs-content';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Player Store - TurnKit Docs',
  description: playerStorePageMeta.description,
  alternates: {
    canonical: absoluteUrl(playerStorePageMeta.path),
  },
  openGraph: {
    title: 'Player Store - TurnKit Docs',
    description: playerStorePageMeta.description,
    url: absoluteUrl(playerStorePageMeta.path),
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Player Store - TurnKit Docs',
    description: playerStorePageMeta.description,
  },
};

export default function PlayerStoreDocsPage() {
  return (
    <DocsShell meta={playerStorePageMeta}>
      <p id="intro" className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
        Player Store gives each player typed key-value storage for currencies, inventory tags, and progression fields. You define keys
        once with read/write permissions, then use the same JSON shape from Unity client and REST API.
      </p>

      <SectionTitle id="definitions">Store Definitions</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Manage definitions with dev endpoints scoped by <InlineCode code="gameKeyId" />.
      </p>
      <CodeBlock
        className="mb-8"
        language="http"
        code={`GET /v1/dev/player-store-defs?gameKeyId={uuid}
POST /v1/dev/player-store-defs?gameKeyId={uuid}
DELETE /v1/dev/player-store-defs/{storeKey}?gameKeyId={uuid}`}
      />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="POST Request DTO">
          <CodeBlock
            language="json"
            code={`{
  "storeKey": "gold",
  "valueType": "STRING | NUMBER | STRING_LIST",
  "numberMin": 0,
  "numberMax": 1000000,
  "clientWritable": true,
  "clientReadable": true
}`}
          />
        </InfoCard>
        <InfoCard title="GET Item / POST Response DTO">
          <CodeBlock
            language="json"
            code={`{
  "storeKey": "gold",
  "valueType": "NUMBER",
  "numberMin": 0,
  "numberMax": 1000000,
  "clientWritable": true,
  "clientReadable": true
}`}
          />
        </InfoCard>
      </div>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        <InlineCode code="numberMin" /> and <InlineCode code="numberMax" /> are optional. They apply to <InlineCode code="NUMBER" /> keys
        and enforce bounds for writes and mutations.
      </p>

      <SectionTitle id="values">Read &amp; Write Values</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Client and website use one payload shape for both request and response:
      </p>
      <CodeBlock
        className="mb-8"
        language="json"
        code={`{
  "value": "text | number | [\\"a\\", \\"b\\"]"
}`}
      />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Client Endpoints">
          <CodeBlock
            language="http"
            code={`GET /v1/client/player-store/{storeKey}
PUT /v1/client/player-store/{storeKey}`}
          />
        </InfoCard>
        <InfoCard title="Dev Endpoints">
          <CodeBlock
            language="http"
            code={`GET /v1/dev/player-store/{playerId}/{storeKey}?gameKeyId={uuid}
PUT /v1/dev/player-store/{playerId}/{storeKey}?gameKeyId={uuid}`}
          />
        </InfoCard>
      </div>

      <SectionTitle id="client-transactions">Client Transactions</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        Apply catalog transactions with strict server-side catalog mode. Auth unchanged: existing client auth plus{' '}
        <InlineCode code="X-Player-Id" />.
      </p>
      <CodeBlock className="mb-8" language="http" code={`POST /v1/client/player-store/tx`} />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Request Body">
          <CodeBlock
            language="json"
            code={`{
  "transactionId": "buy_pack_1"
}`}
          />
        </InfoCard>
        <InfoCard title="Response Body">
          <CodeBlock
            language="json"
            code={`{
  "transactionId": "buy_pack_1",
  "applied": true,
  "alreadyApplied": false
}`}
          />
        </InfoCard>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Behavior">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>
              Field rename: use <InlineCode code="transactionId" />. <InlineCode code="txId" /> is obsolete.
            </li>
            <li>Client sends only transaction ID; no client-defined conditions or mutations.</li>
            <li>Duplicate retry of the same transaction returns 200 with already-applied state.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Status Handling">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>
              <InlineCode code="200 applied=true, alreadyApplied=false" />: first successful apply.
            </li>
            <li>
              <InlineCode code="200 applied=false, alreadyApplied=true" />: idempotent duplicate retry; treat as success.
            </li>
            <li>
              <InlineCode code="409 TX_CONDITION_FAILED" />: requirements/funds not satisfied.
            </li>
            <li>
              <InlineCode code="409 TX_MISMATCH" />: request has unsupported extra fields (for example conditions/mutations).
            </li>
            <li>
              <InlineCode code="400 TX_NOT_ALLOWED" />: unknown or disabled catalog transaction.
            </li>
            <li>
              <InlineCode code="400 INVALID_TRANSACTION_ID" />: invalid transaction ID format.
            </li>
          </ul>
        </InfoCard>
      </div>
      <CodeBlock
        className="mb-8"
        language="csharp"
        code={`var result = await PlayerStore.Transaction("buy_pack_1", session).Execute();`}
      />

      <SectionTitle id="unity-usage">Unity Usage</SectionTitle>
      <CodeBlock
        className="mb-8"
        language="csharp"
        code={`await PlayerStore.Value(PlayerStoreDefs.Gold).Set(10m);
var gold = await PlayerStore.Value(PlayerStoreDefs.Gold).Get();`}
      />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Next reference: <Link href="/docs/unity-client" className="text-accent transition hover:text-text">Unity Client API</Link> and{' '}
        <Link href="/docs/api" className="text-accent transition hover:text-text">REST API</Link>.
      </p>

      <SectionTitle id="rules">Rules &amp; Errors</SectionTitle>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="Definition Rules">
          <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.6] text-muted">
            <li>Definitions are create-only.</li>
            <li>Duplicate key returns <InlineCode code="409 STORE_KEY_ALREADY_DEFINED" />.</li>
            <li>Delete missing key returns <InlineCode code="404 STORE_KEY_NOT_DEFINED" />.</li>
            <li>Store key must match lowercase regex; invalid key returns <InlineCode code="400 INVALID_STORE_KEY" />.</li>
            <li>
              NUMBER bounds enforced on writes and mutations; out-of-range returns{' '}
              <InlineCode code="400 PLAYER_STORE_NUMBER_OUT_OF_RANGE" />.
            </li>
          </ul>
        </InfoCard>
        <InfoCard title="Delete Behavior">
          <p className="text-[13px] leading-[1.6] text-muted">
            Deleting a definition cascades player values through FK constraints, so old values for that <InlineCode code="storeKey" /> are
            removed automatically.
          </p>
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
