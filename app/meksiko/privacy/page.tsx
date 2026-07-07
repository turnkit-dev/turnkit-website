import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'Meksiko privacy policy: local gameplay data, matchmaking and leaderboard services, optional ads, purchases, and crash diagnostics.';

export const metadata: Metadata = {
  title: 'Meksiko Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/meksiko/privacy'),
  },
  openGraph: {
    title: 'Meksiko Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/meksiko/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meksiko Privacy Policy',
    description: privacyDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Meksiko Privacy Policy" updatedLabel="Last updated: July 3, 2026">
      <p>Meksiko (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles information and data.</p>

      <h2>1. Gameplay Data and Processing</h2>
      <p>Meksiko uses online services to run multiplayer matches, matchmaking, bot fallback, rankings, and related gameplay features.</p>
      <p>
        The app may process gameplay-related data such as player identifiers, match state, bids, tricks, scores, leaderboard positions,
        and basic session metadata required to keep matches working correctly.
      </p>
      <p>Some app data may also be stored locally on your device to support sign-in state, settings, and smoother gameplay.</p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Internet/network access: used for online matches, leaderboards, and related app services.</li>
        <li>Notification permission: used for match-related alerts and app functionality when supported by your device.</li>
      </ul>
      <p>Permissions are optional where platform controls allow and can be managed through your device settings.</p>

      <h2>3. Advertising</h2>
      <p>The app may use Google AdMob to display advertisements.</p>
      <p>Ad services may collect certain device and usage information as described in their own privacy policies.</p>
      <p>
        Learn more: <a href="https://policies.google.com/privacy" className={linkClassName}>Google Privacy Policy</a> and{' '}
        <a href="https://support.google.com/admob/answer/6128543" className={linkClassName}>Google Advertising Policies</a>
      </p>

      <h2>4. In-App Purchases</h2>
      <p>The app may offer optional purchases or premium features through Google Play Billing.</p>
      <p>
        Purchases are processed by Google Play and are subject to Google&apos;s terms and privacy policies. We do not receive or store
        your payment card information.
      </p>

      <h2>5. Data Collection</h2>
      <p>We may process limited data needed to operate the app, including:</p>
      <ul>
        <li>player identifiers and sign-in related account data</li>
        <li>gameplay events, scores, leaderboard data, and match results</li>
        <li>device and app technical data needed for stability, fraud prevention, and service reliability</li>
      </ul>
      <p>
        The app may use Firebase Crashlytics or similar diagnostics tools for crash reporting. These tools may collect technical crash data
        such as device model, OS version, app version, timestamps, and stack traces to help identify and fix stability issues.
      </p>

      <h2>6. Data Security</h2>
      <p>We take reasonable steps to protect app data and service infrastructure.</p>
      <p>No software or online service can guarantee complete security.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>The app is not directed toward children under 13.</p>

      <h2>8. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be posted with a revised &quot;Last updated&quot; date.
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
        Read the{' '}
        <Link href="/meksiko/terms" className={linkClassName}>
          Meksiko Terms of Service
        </Link>
        .
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/meksiko/terms" className={linkClassName}>
            Terms of Service
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
