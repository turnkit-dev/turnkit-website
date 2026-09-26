import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsScreenshot } from '@/components/docs-screenshot';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { dailyLoginRewardsPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Daily Login Rewards in Unity | TurnKit Guide',
  description: dailyLoginRewardsPageMeta.description,
  path: dailyLoginRewardsPageMeta.path,
  type: 'article',
  keywords: ['Unity daily login rewards', 'daily reward cooldown', 'TurnKit Player Store transaction'],
});

export default function DailyLoginRewardsGuide() {
  const article = buildTechArticleSchema({ headline: dailyLoginRewardsPageMeta.title, description: dailyLoginRewardsPageMeta.description, path: dailyLoginRewardsPageMeta.path });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' }, { name: 'Documentation', path: '/docs' },
    { name: 'Guides', path: '/docs' }, { name: dailyLoginRewardsPageMeta.title, path: dailyLoginRewardsPageMeta.path },
  ]);
  return (
    <DocsShell meta={dailyLoginRewardsPageMeta}>
      <JsonLd id="daily-login-article-schema" data={article} />
      <JsonLd id="daily-login-breadcrumb-schema" data={breadcrumb} />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Use a server-managed Player Store cooldown to limit claims to once every 24 hours. This example increments a claim index and
        grants 120 standard tokens each time. The index records successful claims; it does not define a rotating reward schedule.
      </p>

      <SectionTitle id="define-reward-index">Define the Daily Reward Index</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In <InlineCode code="Tools → TurnKit → Configuration → Player Store Defs" />, create <InlineCode code="daily_reward_index" /> as
        a NUMBER. Disable client writes, enable client reads, and set cooldown duration to <InlineCode code="PT24H" />. The definition
        displays this cooldown as 86,400 seconds.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/player-store-defs.png"
        alt="TurnKit Player Store definitions including a daily_reward_index number with an 86400 second cooldown"
        caption="The screenshot shows daily_reward_index with an 86,400-second cooldown alongside token and gold_token definitions."
      />

      <SectionTitle id="create-login-transaction">Create the Login Transaction</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In <InlineCode code="Player Store Tx Catalog" />, create an enabled transaction named <InlineCode code="daily_login" />. Add
        both mutations:
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-5 text-[14px] leading-[1.7] text-muted">
        <li><InlineCode code="daily_reward_index → ADD → 1" /></li>
        <li><InlineCode code="token → ADD → 120" /></li>
      </ul>
      <DocsScreenshot
        src="/docs/guides/assets/daily-login-index.png"
        alt="TurnKit daily_login transaction adding one to daily_reward_index and 120 to token"
        caption="One atomic transaction advances the claim index and grants 120 tokens."
      />

      <SectionTitle id="claim-reward">Claim the Reward</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Call the transaction from the authenticated player context when the player claims. Handle the cooldown response as “already
        claimed for this period.” Because the cooldown is configured on <code>daily_reward_index</code>, keep that key server-managed.
      </p>
      <CodeBlock className="mb-6" language="csharp" code={`var result = await PlayerStore.Transaction("daily_login").Execute();`} />
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        See <Link href="/docs/player-store" className="text-accent hover:text-text">Player Store</Link> for transaction rules. If your
        game has a multi-day reward calendar, use the incremented index in server-side logic to choose the next reward; do not trust a
        client-selected reward amount.
      </p>
      <div id="related-guides" className="border-t border-border pt-6 text-[14px] leading-[1.7] text-muted">
        <h2 className="mb-3 font-semibold text-text">Related guides</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><Link href="/guides/rewarded-ad-tokens" className="text-accent hover:text-text">Rewarded ads: grant tokens</Link></li>
          <li><Link href="/guides/relay-token-requirements" className="text-accent hover:text-text">Require and spend tokens for matchmaking</Link></li>
        </ul>
      </div>
    </DocsShell>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">{children}</h2>;
}
