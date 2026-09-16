import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'Read how Meksiko processes game profile, gameplay, multiplayer, advertising, purchase, and crash diagnostic data, and how to request account deletion.';

export const metadata: Metadata = {
  title: 'Meksiko Privacy Policy: Game Data, Ads and Account Deletion',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/meksiko/privacy'),
  },
  openGraph: {
    title: 'Meksiko Privacy Policy: Game Data, Ads and Account Deletion',
    description: privacyDescription,
    url: absoluteUrl('/meksiko/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meksiko Privacy Policy: Game Data, Ads and Account Deletion',
    description: privacyDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Meksiko Privacy Policy" updatedLabel="Last updated: September 16, 2026">
      <p>
        Meksiko (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles
        information and data.
      </p>

      <h2>1. Data We Process</h2>
      <p>Meksiko may store data locally on your device and on our servers where required for game functionality.</p>
      <p>
        This may include:
      </p>
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
      <p>The app does not require you to provide personal information such as your real name, postal address, or phone number to play.</p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li><strong>Internet access:</strong> used for online multiplayer, leaderboards, advertising, purchases and other online functionality.</li>
        <li><strong>Notification permission:</strong> used for game alerts and notifications where supported by your device.</li>
      </ul>
      <p>Permissions can be managed through your device settings.</p>

      <h2>3. Advertising</h2>
      <p>Meksiko uses Google AdMob to display advertisements.</p>
      <p>Google AdMob may process device identifiers, advertising identifiers, usage information and other technical data in accordance with Google&apos;s privacy policies.</p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy" className={linkClassName}>Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/adspolicy/" className={linkClassName}>Google Advertising Policies</a>
      </p>

      <h2>4. In-App Purchases</h2>
      <p>Meksiko offers optional in-app purchases through Google Play Billing.</p>
      <p>
        Purchases are processed by Google Play and are subject to Google&apos;s terms and privacy policies. NN Game Studio does
        not receive or store your payment card information.
      </p>
      <p>Information about purchased items or in-game balances may be stored so that we can provide purchased content and maintain your game progress.</p>

      <h2>5. Crash Reporting</h2>
      <p>Meksiko uses Firebase Crashlytics to diagnose crashes and technical problems.</p>
      <p>Crashlytics may process technical information including:</p>
      <ul>
        <li>Device model</li>
        <li>Operating system version</li>
        <li>App version</li>
        <li>Crash timestamps</li>
        <li>Stack traces and diagnostic information</li>
      </ul>
      <p>This information is used to improve the stability and reliability of the app.</p>

      <h2>6. Online Game Data</h2>
      <p>When using Meksiko, information required to operate your game profile, multiplayer matches, leaderboards and other game services may be stored on our servers.</p>
      <p>We do not sell your personal data.</p>
      <p>Information may also be processed by service providers required for the operation of the app, including Google services used for advertising, crash reporting and purchases.</p>

      <h2>7. Data Retention and Account Deletion</h2>
      <p>Game data is retained for as long as necessary to provide Meksiko and its online services.</p>
      <p>You can request deletion of your Meksiko game account and associated server-side data from within the app:</p>
      <p><strong>Settings → Delete Account</strong></p>
      <p>After a deletion request is confirmed, the account is scheduled for deletion. The associated account and server-side game data will be permanently deleted after 7 days.</p>
      <p>
        You can also request deletion without access to the app by following the instructions at{' '}
        <Link href="/meksiko/delete-account" className={linkClassName}>Meksiko Account Deletion</Link>.
      </p>
      <p>Certain information may be retained where required for legitimate purposes such as security, fraud prevention, legal obligations or dispute resolution.</p>

      <h2>8. Data Security</h2>
      <p>We take reasonable technical and organizational measures to protect information processed by Meksiko and its online services.</p>
      <p>However, no method of electronic storage or transmission can guarantee complete security.</p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>Meksiko is not directed toward children under 13.</p>
      <p>We do not knowingly request personal information from children under 13.</p>

      <h2>10. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be published on this page with a revised
        &quot;Last updated&quot; date.
      </p>

      <h2>11. Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email: support@turnkit.dev
        <br />
        Country: Serbia
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/meksiko" className={linkClassName}>
            Meksiko
          </Link>
        </li>
        <li>
          <Link href="/meksiko/delete-account" className={linkClassName}>
            Account Deletion
          </Link>
        </li>
        <li>
          <Link href="/other-projects" className={linkClassName}>
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
