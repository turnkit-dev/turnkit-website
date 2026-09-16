import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'Read the Amerikaner privacy policy covering gameplay data, online services, Google AdMob advertising, Google Play purchases, and Firebase Crashlytics.';

export const metadata: Metadata = {
  title: 'Amerikaner Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/amerikaner/privacy'),
  },
  openGraph: {
    title: 'Amerikaner Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/amerikaner/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Amerikaner Privacy Policy',
    description: privacyDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function AmerikanerPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Amerikaner Privacy Policy" updatedLabel="Last updated: September 16, 2026">
      <p>
        Amerikaner (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles
        information and data.
      </p>

      <h2>Data stored by the app</h2>
      <p>Amerikaner may store data locally on your device and on our servers where required for online game functionality.</p>
      <p>This may include:</p>
      <ul>
        <li>Player profile and display name</li>
        <li>Unique player or game identifiers</li>
        <li>Gameplay progress and statistics</li>
        <li>Leaderboard information</li>
        <li>In-game currency or token balances</li>
        <li>Game settings and preferences</li>
        <li>Match and gameplay data</li>
        <li>Technical information required for online multiplayer functionality</li>
      </ul>
      <p>
        The app does not require you to provide personal information such as your real name, email address, postal address, or
        phone number to play.
      </p>

      <h2>Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Internet access: used for online multiplayer, leaderboards, advertising and other online functionality.</li>
        <li>Notification permission: used for game alerts and notifications where supported by your device.</li>
      </ul>
      <p>Permissions can be managed through your device settings.</p>

      <h2>Advertising</h2>
      <p>The app uses Google AdMob to display advertisements.</p>
      <p>
        Google AdMob may collect device identifiers, advertising identifiers, usage information and other technical data in
        accordance with Google&apos;s privacy policies.
      </p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy" className={linkClassName}>Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/adspolicy/" className={linkClassName}>Google Advertising Policies</a>.
      </p>

      <h2>In-app purchases</h2>
      <p>Amerikaner may offer optional in-app purchases through Google Play Billing.</p>
      <p>
        Purchases are processed by Google Play and are subject to Google&apos;s terms and privacy policies. NN Game Studio does
        not receive or store your payment card information.
      </p>
      <p>Information about purchased items or in-game balances may be stored to provide the purchased content and maintain your game progress.</p>

      <h2>Crash reporting and online services</h2>
      <p>The app uses Firebase Crashlytics to identify and diagnose crashes and technical problems.</p>
      <p>Crashlytics may process technical information such as:</p>
      <ul>
        <li>Device model</li>
        <li>Operating system version</li>
        <li>App version</li>
        <li>Crash timestamps</li>
        <li>Stack traces and diagnostic information</li>
      </ul>
      <p>This information is used to improve the stability and reliability of the app.</p>
      <p>
        When using online features, Amerikaner may store information required to operate your game profile, multiplayer
        matches, leaderboards and other game services. We do not sell your personal data. Information may be processed by
        service providers required for the operation of the app, including Google services used for advertising, crash
        reporting and purchases.
      </p>

      <h2>Data retention and deletion</h2>
      <p>Game data is retained for as long as necessary to provide the app and its online services.</p>
      <p>You can request deletion of your game account and associated server-side data from within the app:</p>
      <p><strong>Settings → Delete Account</strong></p>
      <p>After the deletion period is completed, the associated game data is permanently removed from our servers.</p>
      <p>
        For more information, see the{' '}
        <Link href="/amerikaner/delete-account" className={linkClassName}>
          Amerikaner Account Deletion page
        </Link>
        .
      </p>

      <h2>Data security</h2>
      <p>We take reasonable measures to protect information processed by the app and its online services.</p>
      <p>However, no method of electronic storage or transmission can guarantee complete security. You are also responsible for protecting access to your device.</p>

      <h2>Children&apos;s privacy</h2>
      <p>Amerikaner is not directed toward children under 13. We do not knowingly request personal information from children under 13.</p>

      <h2>Changes to this policy</h2>
      <p>This Privacy Policy may be updated from time to time. Any updated version will be published on this page with a revised &quot;Last updated&quot; date.</p>

      <h2>Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email: <a href="mailto:support@turnkit.dev" className={linkClassName}>support@turnkit.dev</a>
        <br />
        Country: Serbia
      </p>

      <h2>Links</h2>
      <ul>
        <li><Link href="/amerikaner" className={linkClassName}>Amerikaner</Link></li>
        <li><Link href="/amerikaner/delete-account" className={linkClassName}>Account Deletion</Link></li>
        <li><Link href="/other-projects" className={linkClassName}>Other Projects</Link></li>
      </ul>
    </LegalPage>
  );
}
