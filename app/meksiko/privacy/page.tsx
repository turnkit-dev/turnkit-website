import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'Read the Meksiko privacy policy covering local gameplay data, permissions, Google AdMob advertising, Google Play purchases, and Crashlytics diagnostics.';

export const metadata: Metadata = {
  title: 'Meksiko Privacy Policy: Data, Ads and Purchases',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/meksiko/privacy'),
  },
  openGraph: {
    title: 'Meksiko Privacy Policy: Data, Ads and Purchases',
    description: privacyDescription,
    url: absoluteUrl('/meksiko/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meksiko Privacy Policy: Data, Ads and Purchases',
    description: privacyDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Meksiko Privacy Policy" updatedLabel="Last updated: July 7, 2026">
      <p>
        Meksiko (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles
        information and data.
      </p>

      <h2>1. Data Storage and Processing</h2>
      <p>Meksiko may store app-related data locally on your device.</p>
      <p>
        This may include gameplay progress, settings, basic app preferences, and other data needed for the app to function
        properly.
      </p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Internet access: used for app functionality, online features, and related services.</li>
        <li>Notification permission: used for app alerts and functionality where supported by your device.</li>
      </ul>
      <p>Permissions are optional and can be controlled through your device settings.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to display advertisements.</p>
      <p>AdMob may collect certain device and usage information as described in Google&apos;s privacy policies.</p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy" className={linkClassName}>Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/admob/answer/6128543" className={linkClassName}>Google Advertising Policies</a>
      </p>

      <h2>4. In-App Purchases</h2>
      <p>The app may offer optional premium features through Google Play Billing.</p>
      <p>
        Purchases are processed by Google Play and are subject to Google&apos;s terms and privacy policies. We do not receive
        or store your payment information.
      </p>

      <h2>5. Data Collection</h2>
      <p>We do not create user accounts and do not directly collect personal information such as:</p>
      <ul>
        <li>names</li>
        <li>email addresses</li>
        <li>uploaded cloud content</li>
        <li>remote backups</li>
      </ul>
      <p>
        The app uses Firebase Crashlytics for crash diagnostics. Crashlytics may collect technical crash data such as device
        model, OS version, app version, timestamps, and stack traces to help identify and fix app stability issues.
      </p>
      <p>At this time, the app does not use cloud synchronization or external account systems.</p>

      <h2>6. Data Security</h2>
      <p>You are responsible for securing access to your device and backups.</p>
      <p>While reasonable care is taken during development, no software can guarantee complete security.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>The app is not directed toward children under 13.</p>

      <h2>8. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be posted with a revised
        &quot;Last updated&quot; date.
      </p>

      <h2>9. Contact</h2>
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
          <Link href="/other-projects" className={linkClassName}>
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
