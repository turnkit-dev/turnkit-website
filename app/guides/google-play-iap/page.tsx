import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock, InlineCode } from '@/components/code-block';
import { DocsScreenshot } from '@/components/docs-screenshot';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { googlePlayIapPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Google Play IAP: Grant Gold Tokens | TurnKit Guide',
  description: googlePlayIapPageMeta.description,
  path: googlePlayIapPageMeta.path,
  type: 'article',
  keywords: ['Unity Google Play IAP', 'Google Play purchase verification', 'TurnKit Player Store', 'grant in-game currency'],
});

export default function GooglePlayIapGuide() {
  const article = buildTechArticleSchema({
    headline: googlePlayIapPageMeta.title,
    description: googlePlayIapPageMeta.description,
    path: googlePlayIapPageMeta.path,
  });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Guides', path: '/docs' },
    { name: googlePlayIapPageMeta.title, path: googlePlayIapPageMeta.path },
  ]);

  return (
    <DocsShell meta={googlePlayIapPageMeta}>
      <JsonLd id="google-play-iap-article-schema" data={article} />
      <JsonLd id="google-play-iap-breadcrumb-schema" data={breadcrumb} />
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        This guide connects a consumable Google Play product to a server-side TurnKit Player Store transaction. Example product grants{' '}
        <strong className="text-text">520 gold tokens</strong> after Play confirms a completed purchase.
      </p>

      <SectionTitle id="define-gold-token">Define the Gold Token Store Key</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In Unity, open <InlineCode code="Tools → TurnKit → Configuration" /> and create a Player Store definition with key{' '}
        <InlineCode code="gold_token" />. Use type <InlineCode code="NUMBER" />, disable client writes, enable client reads, and leave the
        cooldown empty. This keeps balances visible to the game client while preventing clients from editing them.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/player-store-defs.png"
        alt="TurnKit Player Store definitions showing daily_reward_index, gold_token, and token numeric keys"
        caption="Player Store definitions. Create gold_token with client writes disabled and client reads enabled."
      />

      <SectionTitle id="grant-transaction">Create the Grant Transaction</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In <InlineCode code="Player Store Tx Catalog" />, create an enabled transaction named{' '}
        <InlineCode code="grant_gold_token_520" />. Add one mutation: <InlineCode code="gold_token → ADD → 520" />.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/grant-gold-token.png"
        alt="TurnKit transaction catalog entry granting 520 gold_token"
        caption="The grant transaction adds 520 to the gold_token balance."
      />
      <p className="mb-8 text-[14px] leading-[1.7] text-muted">
        For transaction behavior and client usage, see <Link href="/docs/player-store" className="text-accent hover:text-text">Player Store</Link>.
      </p>

      <SectionTitle id="play-console-product">Create and Activate a Play Product</SectionTitle>
      <div className="mb-8 rounded-[6px] border border-border bg-surface p-5 text-[14px] leading-[1.7] text-muted">
        <ol className="list-decimal space-y-2 pl-5">
          <li>In Play Console, open the app whose package matches the Android package configured in TurnKit.</li>
          <li>
            Open <strong className="text-text">Monetize with Play → Products → One-time products</strong> (some consoles may still label
            these in-app products), then create a product with ID <InlineCode code="gold_token_520" />.
          </li>
          <li>Add product details, configure regional pricing, and create at least one purchase option.</li>
          <li>Save and activate the product and purchase option.</li>
        </ol>
      </div>
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Product IDs are case-sensitive and must match the TurnKit purchase mapping. The purchase option ID belongs to the Play Billing
        offer flow; TurnKit mapping uses the product ID. See Google&apos;s{' '}
        <ExternalLink href="https://developer.android.com/google/play/billing/one-time-products">one-time product guide</ExternalLink> and{' '}
        <ExternalLink href="https://developer.android.com/google/play/billing/integrate">Billing integration guide</ExternalLink>.
      </p>

      <SectionTitle id="verification-credentials">Set Up Play Verification Credentials</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        TurnKit verifies purchases through Google Play Developer API. In Google Cloud, create or select a project, enable the Google Play
        Developer API, and create a service account. In Play Console, invite its email address and grant the permissions needed for Play
        Billing API access. Download a JSON key for the service account and keep it private.
      </p>
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Follow Google&apos;s current{' '}
        <ExternalLink href="https://developers.google.com/android-publisher/getting_started">Google Play Developer API setup</ExternalLink>.
        Google lists <em>View financial data, orders, and cancellation survey responses</em> and <em>Manage orders and subscriptions</em>{' '}
        for Play Billing API access.
      </p>

      <SectionTitle id="purchase-mapping">Save Credentials and Add the Purchase Mapping</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        In TurnKit Configuration, check the read-only App Id and Android Package. Paste the full service-account JSON into{' '}
        <strong className="text-text">Google Play App Config</strong> and save. The app ID and package are supplied by local TurnKit/Unity
        config.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/google-play-app-config.png"
        alt="TurnKit Google Play App Config showing app ID, Android package, service account JSON area, and saved status"
        caption="A blank JSON box with status Saved on backend means an existing credential remains saved; paste JSON only to add or replace it."
      />
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Under Purchase Mappings, add an active mapping with provider <InlineCode code="GOOGLE_PLAY" />, purchase type{' '}
        <InlineCode code="PRODUCT" />, product ID <InlineCode code="gold_token_520" />, and grant transaction ID{' '}
        <InlineCode code="grant_gold_token_520" />.
      </p>
      <DocsScreenshot
        src="/docs/guides/assets/google-play-purchase-mapping.png"
        alt="TurnKit purchase mapping connecting Google Play product gold_token_520 to grant_gold_token_520"
        caption="Map the Play product ID to the enabled grant transaction."
      />

      <SectionTitle id="verify-purchase">Verify Purchases from Unity</SectionTitle>
      <p className="mb-5 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Integrate Google Play Billing in the app and call TurnKit only after Play reports the purchase state as{' '}
        <InlineCode code="PURCHASED" />. Pending purchases must not grant currency. The example uses the active player session; use the
        explicit <InlineCode code="TurnKitPlayerSession" /> overload when your flow is outside that context.
      </p>
      <CodeBlock
        className="mb-6"
        language="csharp"
        code={`var result = await PlayerStore.GooglePlayPurchase(
    "com.example.game", // exact Play Console package name
    "gold_token_520",
    purchaseToken,
    StorePurchaseType.PRODUCT
).Verify();

if (!result.Succeeded)
{
    // Show verification failure. Never grant currency locally.
    return;
}

// TurnKit applies the grant_gold_token_520 mapping after verification.`}
      />
      <div className="mb-8 rounded-[6px] border border-border bg-surface p-5 text-[14px] leading-[1.7] text-muted">
        <strong className="text-text">When using Unity IAP:</strong> keep the purchase pending while this TurnKit request runs. In the
        legacy <InlineCode code="ProcessPurchase" /> listener, return <InlineCode code="PurchaseProcessingResult.Pending" /> and call{' '}
        <InlineCode code="ConfirmPendingPurchase(product)" /> only after verification succeeds and TurnKit reports the grant applied or
        already applied. With Unity IAP 5&apos;s <InlineCode code="StoreController" /> flow, confirm the <InlineCode code="PendingOrder" />
        after the same server result. If verification fails, leave the order pending so the app can retry. Do not return{' '}
        <InlineCode code="Complete" /> before the server response. Unity&apos;s{' '}
        <ExternalLink href="https://docs.unity3d.com/Packages/com.unity.purchasing@4.5/manual/UnityIAPProcessingPurchases.html">
          purchase processing guide
        </ExternalLink>{' '}
        documents the pending flow. Google recommends server-side consumption for added reliability, while client-side confirmation after
        the server grant is also supported.
      </div>
      <SectionTitle id="test-purchase">Test the Purchase</SectionTitle>
      <p className="mb-8 max-w-[760px] text-[14px] leading-[1.7] text-muted">
        Add a license tester and use an internal test track on an Android device. The installed app package must match Play Console.
        Test both successful verification and pending purchases. Read Google&apos;s{' '}
        <ExternalLink href="https://developer.android.com/google/play/billing/test">Play Billing test guide</ExternalLink> before release.
      </p>
      <RelatedGuides />
    </DocsShell>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">{children}</h2>;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent transition hover:text-text">{children}</a>;
}

function RelatedGuides() {
  return (
    <div className="mt-12 border-t border-border pt-6 text-[14px] leading-[1.7] text-muted">
      <h2 className="mb-3 font-semibold text-text">Related guides</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li><Link href="/guides/relay-token-requirements" className="text-accent hover:text-text">Require and spend tokens for matchmaking</Link></li>
        <li><Link href="/docs/player-store" className="text-accent hover:text-text">Player Store reference</Link></li>
      </ul>
    </div>
  );
}
