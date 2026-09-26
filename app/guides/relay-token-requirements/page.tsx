import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsScreenshot } from '@/components/docs-screenshot';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { relayTokenRequirementsPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Require and Spend Tokens for Matchmaking | TurnKit Guide',
  description: relayTokenRequirementsPageMeta.description,
  path: relayTokenRequirementsPageMeta.path,
  type: 'article',
  keywords: ['Unity matchmaking currency', 'TurnKit Relay queue requirements', 'spend tokens on match start'],
});

export default function RelayTokenRequirementsGuide() {
  const article = buildTechArticleSchema({ headline: relayTokenRequirementsPageMeta.title, description: relayTokenRequirementsPageMeta.description, path: relayTokenRequirementsPageMeta.path });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' }, { name: 'Documentation', path: '/docs' },
    { name: 'Guides', path: '/docs' }, { name: relayTokenRequirementsPageMeta.title, path: relayTokenRequirementsPageMeta.path },
  ]);
  return (
    <DocsShell meta={relayTokenRequirementsPageMeta}>
      <JsonLd id="relay-token-article-schema" data={article} />
      <JsonLd id="relay-token-breadcrumb-schema" data={breadcrumb} />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Let players enter matchmaking with either 40 standard tokens or 40 gold tokens. At match start, spend standard tokens when they
        have enough; otherwise spend gold tokens. The queue requirement and match-start mutations both run on the Relay server.
      </p>

      <SectionTitle id="queue-requirement">Require Either Currency to Join the Queue</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In Unity, open <strong className="text-text">Tools → TurnKit → Configuration → Relay Configs</strong>, edit the target Relay,
        and add this queue requirement. Groups are OR branches, while conditions inside each group use the group combinator.
      </p>
      <div className="mb-5 rounded-[6px] border border-border bg-surface p-5 text-[14px] leading-[1.7] text-muted">
        <ul className="list-disc space-y-2 pl-5">
          <li>Group 1, combinator AND: STORE key <code>token</code>, operator GTE, value 40.</li>
          <li>Group 2, combinator AND: STORE key <code>gold_token</code>, operator GTE, value 40.</li>
        </ul>
        <p className="mt-3">Because the groups are OR branches, either balance is enough to pass the queue check.</p>
      </div>
      <DocsScreenshot
        src="/docs/guides/assets/queue-currency-requirement.png"
        alt="Queue requirement with separate OR groups requiring 40 token or 40 gold_token"
        caption="Two AND groups act as OR branches: 40 token or 40 gold_token qualifies the player."
      />

      <SectionTitle id="match-start-spending">Spend Currency When the Match Starts</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Add two Player Store mutations in the same Relay configuration, each at phase <code>ON_MATCH_START</code> and target{' '}
        <code>ACTING_PLAYER</code>. The conditions choose one mutation, so only one balance is charged.
      </p>
      <div className="mb-5 rounded-[6px] border border-border bg-surface p-5 text-[14px] leading-[1.7] text-muted">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-text">Standard tokens:</strong> mutation ID <code>token_on_start_reduction</code>; key{' '}
            <code>token</code>; operation SUB; value 40; condition STORE <code>token GTE 40</code>.
          </li>
          <li>
            <strong className="text-text">Gold tokens:</strong> mutation ID <code>gold_token_reduction</code>; key <code>gold_token</code>;
            operation SUB; value 40; combinator AND; conditions STORE <code>token LT 40</code> and STORE <code>gold_token GTE 40</code>.
          </li>
        </ol>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <DocsScreenshot src="/docs/guides/assets/token-for-queue.png" alt="Relay mutation subtracting 40 standard tokens at match start when token balance is at least 40" caption="Spend standard tokens when the balance is at least 40." />
        <DocsScreenshot src="/docs/guides/assets/gold-token-for-queue.png" alt="Relay mutation subtracting 40 gold tokens when normal token balance is under 40 and gold balance is at least 40" caption="Otherwise spend gold tokens, when its balance is at least 40." />
      </div>
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Save Relay changes and confirm your Player Store definitions include numeric <code>token</code> and <code>gold_token</code> keys.
        See <Link href="/docs/relay" className="text-accent hover:text-text">TurnKit Relay</Link> and the{' '}
        <Link href="/docs/player-store" className="text-accent hover:text-text">Player Store reference</Link> for the related configuration concepts.
      </p>
      <div id="related-guides" className="border-t border-border pt-6 text-[14px] leading-[1.7] text-muted">
        <h2 className="mb-3 font-semibold text-text">Related guides</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><Link href="/guides/google-play-iap" className="text-accent hover:text-text">Grant gold tokens from Google Play purchases</Link></li>
          <li><Link href="/guides/daily-login-rewards" className="text-accent hover:text-text">Daily login rewards</Link></li>
        </ul>
      </div>
    </DocsShell>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">{children}</h2>;
}
