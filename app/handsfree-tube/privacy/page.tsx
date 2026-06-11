import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'com.handsfree.tube privacy policy: local video playback state, reward ads, Google Play billing, and crash diagnostics.';

export const metadata: Metadata = {
  title: 'com.handsfree.tube Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-tube/privacy'),
  },
  openGraph: {
    title: 'com.handsfree.tube Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/handsfree-tube/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.tube Privacy Policy',
    description: privacyDescription,
  },
};

export default function HandsFreeTubePrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="com.handsfree.tube Privacy Policy"
      updatedLabel="Last updated: June 11, 2026"
    >
      <p>
        com.handsfree.tube (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles
        information and data.
      </p>

      <h2>1. Data Storage and Processing</h2>
      <p>com.handsfree.tube is designed to play YouTube videos with local app controls.</p>
      <p>
        Video playback state, favorites, recent video history, and app preferences are stored locally on your device. The app
        does not upload your personal playback data to our servers.
      </p>
      <p>
        When you open or share a YouTube link into the app, the app processes that link to start playback on your device.
      </p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Internet access: used to load and play YouTube content.</li>
        <li>Notification permission: used for playback and app functionality.</li>
      </ul>
      <p>Permissions are optional where supported by the device and can be controlled through your device settings.</p>

      <h2>3. Advertising</h2>
      <p>The app may use Google AdMob or similar advertising services to display banner advertisements and rewarded advertisements.</p>
      <p>Ad services may collect certain device and usage information as described in their privacy policies.</p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/admob/answer/6128543">Google Advertising Policies</a>
      </p>

      <h2>4. In-App Purchases</h2>
      <p>The app offers optional premium access through Google Play Billing.</p>
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
        The app may use Firebase Crashlytics for crash diagnostics. Crashlytics may collect technical crash data (for example,
        device model, OS version, app version, timestamps, and stack traces) to help identify and fix app stability issues.
      </p>
      <p>At this time, the app does not use product analytics/tracking or external account systems.</p>

      <h2>6. Data Security</h2>
      <p>
        Because your playback preferences and favorites remain on your device, you are responsible for securing access to your
        device and backups.
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
        Read the <Link href="/handsfree-tube/terms">com.handsfree.tube Terms of Service</Link>.
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.handsfree.tube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link
            href="/handsfree-tube"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Hands Free Voice Tube
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-tube/terms"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Terms of Service
          </Link>
        </li>
        <li>
          <Link
            href="/other-projects"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
