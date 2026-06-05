import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'com.handsfree.notes privacy policy: local storage, offline transcription, AdMob ads, Google Play billing, and Crashlytics crash diagnostics.';

export const metadata: Metadata = {
  title: 'com.handsfree.notes Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-notes/privacy'),
  },
  openGraph: {
    title: 'com.handsfree.notes Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/handsfree-notes/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.notes Privacy Policy',
    description: privacyDescription,
  },
};

export default function HandsFreeNotesPrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="com.handsfree.notes Privacy Policy"
      updatedLabel="Last updated: May 15, 2026"
    >
      <p>
        com.handsfree.notes (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app
        handles information and data.
      </p>

      <h2>1. Data Storage and Processing</h2>
      <p>com.handsfree.notes is designed as an offline application.</p>
      <p>
        Voice recordings, transcripts, and notes created in the app are stored locally on your device. The app does not upload
        your recordings, transcripts, or notes to our servers.
      </p>
      <p>Speech transcription is processed locally on-device using offline speech recognition technology.</p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Microphone access: used to record audio notes.</li>
        <li>Storage/file access: used to import, export, and manage audio files.</li>
        <li>Notification permission: used for foreground recording notifications and app functionality.</li>
      </ul>
      <p>Permissions are optional and can be controlled through your device settings.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to display banner advertisements and rewarded advertisements.</p>
      <p>AdMob may collect certain device and usage information as described in Google&apos;s privacy policies.</p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/admob/answer/6128543">Google Advertising Policies</a>
      </p>

      <h2>4. In-App Purchases</h2>
      <p>The app offers optional premium features through Google Play Billing.</p>
      <p>
        Purchases are processed by Google Play and are subject to Google&apos;s terms and privacy policies. We do not receive or
        store your payment information.
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
        The app uses Firebase Crashlytics for crash diagnostics. Crashlytics may collect technical crash data (for example,
        device model, OS version, app version, timestamps, and stack traces) to help identify and fix app stability issues.
      </p>
      <p>
        At this time, the app does not use product analytics/tracking, cloud synchronization, or external account systems.
      </p>

      <h2>6. Data Security</h2>
      <p>
        Because your recordings and transcripts remain on your device, you are responsible for securing access to your device
        and backups.
      </p>
      <p>While reasonable care is taken during development, no software can guarantee complete security.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>The app is not directed toward children under 13.</p>

      <h2>8. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be posted with a revised &quot;Last updated&quot;
        date.
      </p>

      <h2>9. Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email: support@turnkit.dev
        <br />
        Country: Serbia
      </p>

      <h2>Related Legal Page</h2>
      <p>
        Read the <Link href="/handsfree-notes/terms">com.handsfree.notes Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
