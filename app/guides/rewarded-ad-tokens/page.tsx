import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsScreenshot } from '@/components/docs-screenshot';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { rewardedAdTokensPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rewarded Ads: Grant Tokens in Unity | TurnKit Guide',
  description: rewardedAdTokensPageMeta.description,
  path: rewardedAdTokensPageMeta.path,
  type: 'article',
  keywords: ['Unity rewarded ads rewards', 'rewarded ad server-side verification', 'grant game currency securely'],
});

export default function RewardedAdTokensGuide() {
  const article = buildTechArticleSchema({ headline: rewardedAdTokensPageMeta.title, description: rewardedAdTokensPageMeta.description, path: rewardedAdTokensPageMeta.path });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' }, { name: 'Documentation', path: '/docs' },
    { name: 'Guides', path: '/docs' }, { name: rewardedAdTokensPageMeta.title, path: rewardedAdTokensPageMeta.path },
  ]);
  return (
    <DocsShell meta={rewardedAdTokensPageMeta}>
      <JsonLd id="rewarded-ads-article-schema" data={article} />
      <JsonLd id="rewarded-ads-breadcrumb-schema" data={breadcrumb} />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Grant tokens only after the ad network confirms a completed rewarded ad. Keep the reward amount and transaction on the server so
        a modified client cannot award itself currency.
      </p>

      <SectionTitle id="create-reward-transaction">Create a Reward Transaction</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In Unity, open <InlineCode code="Tools → TurnKit → Configuration → Player Store Tx Catalog" /> and create an enabled transaction
        named <InlineCode code="reward_id" />. Add one mutation: <InlineCode code="token → ADD → 40" />.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/rewarded-token-transaction.png"
        alt="TurnKit reward_id transaction adding 40 to the token Player Store key"
        caption="This catalog entry grants 40 tokens when the trusted ad-completion flow executes reward_id."
      />

      <SectionTitle id="validate-ad-completion">Validate Ad Completion Before Granting</SectionTitle>
      <div className="mb-8 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        <strong className="text-amber">Security rule:</strong> A client callback alone does not prove an ad was completed. If your ad
        provider offers server-side verification (SSV), validate its signed completion on a trusted backend and prevent replay before
        granting. Otherwise use the provider&apos;s documented server verification method. Never accept a client-supplied token amount or
        transaction ID as authorization.
      </div>

      <SectionTitle id="claim-tokens">Execute the Transaction</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        After trusted completion validation, execute the fixed transaction in the authenticated player context. Do not execute it directly
        from an unverified ad callback.
      </p>
      <CodeBlock className="mb-6" language="csharp" code={`var result = await PlayerStore.Transaction("reward_id").Execute();`} />
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Read <Link href="/docs/player-store" className="text-accent hover:text-text">Player Store</Link> for transaction behavior and{' '}
        <Link href="/docs/unity-client" className="text-accent hover:text-text">Unity Client API</Link> for client integration.
      </p>
      <div id="related-guides" className="border-t border-border pt-6 text-[14px] leading-[1.7] text-muted">
        <h2 className="mb-3 font-semibold text-text">Related guides</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><Link href="/guides/daily-login-rewards" className="text-accent hover:text-text">Daily login rewards</Link></li>
          <li><Link href="/guides/google-play-iap" className="text-accent hover:text-text">Grant gold tokens from Google Play</Link></li>
        </ul>
      </div>
    </DocsShell>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">{children}</h2>;
}
