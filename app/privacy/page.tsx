import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'Review how TurnKit collects and processes personal data through its website, developer dashboard, APIs, SDKs and related services.';

export const metadata: Metadata = {
  title: 'Privacy Policy - TurnKit',
  description: privacyDescription,
  alternates: { canonical: absoluteUrl('/privacy') },
  openGraph: {
    title: 'Privacy Policy - TurnKit',
    description: privacyDescription,
    url: absoluteUrl('/privacy'),
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Privacy Policy - TurnKit', description: privacyDescription },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updatedLabel="Last updated: July 22, 2026">
      <p>
        This Privacy Policy explains how TurnKit collects and processes personal data through the TurnKit website, developer
        dashboard, APIs, SDKs and related services.
      </p>

      <h2>1. Who operates TurnKit</h2>
      <p>TurnKit is operated by:</p>
      <p><strong>Nenad Nikolić, operating as TurnKit</strong><br />Svetosavska 107v/17<br />Kikinda, Serbia<br />Email: <a href="mailto:support@turnkit.dev">support@turnkit.dev</a></p>
      <p>Nenad Nikolić is the data controller for developer accounts, website usage, subscriptions, support, security and administration of the TurnKit service.</p>
      <p>When developers use TurnKit to process information relating to players of their games or applications, the developer generally acts as the data controller and TurnKit acts as the data processor.</p>

      <h2>2. Data we process</h2>
      <h3>Developer account data</h3>
      <p>When you create or access a TurnKit account, we may receive your:</p>
      <ul><li>Name or username</li><li>Email address</li><li>Profile image</li><li>Google or GitHub account identifier</li><li>Account settings and project configuration</li></ul>
      <p>We do not receive or store your Google or GitHub password.</p>
      <h3>Billing data</h3>
      <p>When you purchase a subscription, we may receive:</p>
      <ul><li>Subscription and payment status</li><li>Transaction and customer identifiers</li><li>Billing country and currency</li><li>Invoice, refund and tax information</li></ul>
      <p>Payments are processed by our merchant-of-record or payment provider. TurnKit does not store complete payment-card details.</p>
      <h3>Technical and usage data</h3>
      <p>We may process:</p>
      <ul><li>IP addresses</li><li>Login and authentication events</li><li>Browser, device, application and SDK information</li><li>API requests and usage volumes</li><li>Concurrent-user usage</li><li>Connection and session events</li><li>Error, diagnostic and security logs</li></ul>
      <h3>Player data submitted by developers</h3>
      <p>Depending on the modules used, developers may submit:</p>
      <ul><li>Player identifiers and display names</li><li>Matchmaking and game-session information</li><li>Leaderboard scores and rankings</li><li>PlayerStore keys, values and transaction information</li><li>Relay messages and turn information required to operate an active game session</li></ul>
      <p>Relay message contents are intended to be transient and are not intentionally retained after the relevant session, except where limited processing is necessary for security, debugging or abuse prevention.</p>
      <p>Developers are responsible for deciding what player data they submit and must not submit unnecessary or highly sensitive personal data.</p>

      <h2>3. How and why we use data</h2>
      <p>We process data to:</p>
      <ul><li>Create and maintain developer accounts</li><li>Authenticate users</li><li>Provide TurnKit modules and APIs</li><li>Operate matchmaking, relay, leaderboard and PlayerStore features</li><li>Manage subscriptions and usage limits</li><li>Process billing and refunds</li><li>Provide support</li><li>Monitor performance and reliability</li><li>Prevent fraud, attacks, cheating and abuse</li><li>Enforce our Terms of Service</li><li>Comply with legal and accounting obligations</li></ul>
      <p>Where applicable, our legal bases are:</p>
      <ul><li><strong>Performance of a contract</strong>, when processing is necessary to provide TurnKit</li><li><strong>Legitimate interests</strong>, including service security, fraud prevention, debugging and improvement</li><li><strong>Legal obligations</strong>, including accounting, tax and lawful disclosure requirements</li><li><strong>Consent</strong>, where we specifically request it for optional processing</li></ul>
      <p>We do not sell personal data.</p>

      <h2>4. Service providers and recipients</h2>
      <p>We may share data with providers necessary to operate TurnKit, including:</p>
      <ul><li><strong>Amazon Web Services</strong>, for backend, database and infrastructure hosting</li><li><strong>Vercel</strong>, for website and web-application hosting</li><li><strong>Google and GitHub</strong>, when you use their authentication services</li><li><strong>Polar</strong>, for subscription, payment, tax and billing administration</li></ul>
      <p>We may also disclose information to professional advisers, regulators, courts or public authorities where required by law or necessary to protect legal rights.</p>
      <p>Each independent provider may process information under its own privacy policy.</p>

      <h2>5. International transfers</h2>
      <p>TurnKit is operated from Serbia and uses service providers that may process data in Serbia, the European Economic Area, the United States and other countries.</p>
      <p>Where required by applicable law, international transfers are protected through an adequacy decision, approved contractual clauses, provider data-protection agreements or another legally recognized safeguard.</p>
      <p>Information about applicable safeguards may be requested at <a href="mailto:support@turnkit.dev">support@turnkit.dev</a>.</p>

      <h2>6. Data retention</h2>
      <p>We retain data only for as long as necessary for the purposes described above:</p>
      <ul><li>Developer account data is retained while the account is active and is normally removed or anonymized within 30 days after account deletion.</li><li>Persistent player data is retained until it is deleted by the developer, the relevant project is deleted or the service relationship ends.</li><li>Routine technical and security logs are normally retained for up to 90 days.</li><li>Support communications may be retained for up to three years after resolution.</li><li>Billing and transaction records are retained for the period required by applicable accounting and tax laws.</li><li>Deleted information may remain temporarily in protected backups until the normal backup cycle expires.</li></ul>
      <p>Information may be retained longer where necessary to investigate fraud or security incidents, resolve disputes, comply with law or establish or defend legal claims.</p>

      <h2>7. Your rights</h2>
      <p>Depending on applicable law, you may have the right to:</p>
      <ul><li>Access your personal data</li><li>Correct inaccurate data</li><li>Request deletion</li><li>Restrict certain processing</li><li>Object to processing based on legitimate interests</li><li>Receive eligible data in a portable format</li><li>Withdraw consent where processing is based on consent</li><li>Lodge a complaint with a competent data-protection authority</li></ul>
      <p>To exercise these rights, contact <a href="mailto:support@turnkit.dev">support@turnkit.dev</a>. We may need to verify your identity before completing a request.</p>
      <p>When TurnKit processes player data on behalf of a developer, requests concerning that data should normally be submitted to the developer responsible for the relevant game or application.</p>
      <p>You may lodge a complaint with the Serbian Commissioner for Information of Public Importance and Personal Data Protection or, where applicable, a supervisory authority in the country where you live or work.</p>

      <h2>8. Security</h2>
      <p>We use reasonable technical and organizational measures intended to protect personal data, including encryption in transit, access controls, restricted infrastructure access and security monitoring.</p>
      <p>No online service can guarantee absolute security.</p>
      <p>Developers are responsible for protecting their TurnKit credentials and for not submitting unnecessary personal data through player identifiers, logs, Relay messages or PlayerStore values.</p>

      <h2>9. Children</h2>
      <p>TurnKit developer accounts are not intended for individuals under 18.</p>
      <p>Developers using TurnKit in games or applications intended for children are responsible for complying with applicable children’s privacy laws, providing appropriate notices and obtaining any required parental consent.</p>

      <h2>10. Cookies</h2>
      <p>TurnKit may use cookies or similar technologies that are necessary for authentication, security, session management and user preferences.</p>
      <p>If TurnKit introduces non-essential analytics, advertising or marketing cookies, we will provide additional information and obtain consent where required.</p>

      <h2>11. Changes to this Policy</h2>
      <p>We may update this Privacy Policy when our services, providers or legal obligations change.</p>
      <p>The current version will be published on the TurnKit website with an updated revision date. Where required, we will provide additional notice of material changes.</p>

      <h2>12. Contact</h2>
      <p>For privacy questions or requests, contact:</p>
      <p><strong>Nenad Nikolić, operating as TurnKit</strong><br />Svetosavska 107v/17<br />Kikinda, Serbia<br />Email: <a href="mailto:support@turnkit.dev">support@turnkit.dev</a></p>
    </LegalPage>
  );
}
