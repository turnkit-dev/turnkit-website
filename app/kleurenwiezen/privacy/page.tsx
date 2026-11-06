import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Read the Kleurenwiezen privacy policy covering player profiles, online game services, advertising, purchases, and account deletion.';

export const metadata: Metadata = {
  title: 'Kleurenwiezen Privacy Policy',
  description,
  alternates: {
    canonical: absoluteUrl('/kleurenwiezen/privacy'),
  },
  openGraph: {
    title: 'Kleurenwiezen Privacy Policy',
    description,
    url: absoluteUrl('/kleurenwiezen/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kleurenwiezen Privacy Policy',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function KleurenwiezenPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Kleurenwiezen Privacy Policy" updatedLabel="Last updated: November 6, 2026">
      <p>
        Kleurenwiezen (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app handles
        information and data.
      </p>

      <h2>Data We Process</h2>
      <p>
        Some settings and a profile image you select are stored on your device. The app also creates or uses a TurnKit player
        profile to provide online game services. Information processed for these services may include a player identifier,
        display name, match and score information, leaderboard entries, and in-game balances.
      </p>
      <p>
        If you use a sign-in option supported by the app, related authentication information is processed to connect your
        player profile. We do not sell personal data.
      </p>

      <h2>Permissions</h2>
      <p>
        The app uses an internet connection for online game services, advertising, and Google Play Billing. It includes the
        Google Play Billing permission for optional in-app purchases. If you choose a profile image, the app opens Android&apos;s
        system image picker so you can select it.
      </p>

      <h2>Advertising</h2>
      <p>
        Kleurenwiezen uses Google AdMob for interstitial and rewarded advertisements. Google may process device or advertising
        identifiers, ad interactions, and technical or usage information to provide and measure ads, in accordance with
        Google&apos;s policies.
      </p>
      <p>
        Learn more:{' '}
        <a href="https://policies.google.com/privacy" className={linkClassName}>
          Google Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://support.google.com/adspolicy/" className={linkClassName}>
          Google Advertising Policies
        </a>
        .
      </p>

      <h2>In-App Purchases</h2>
      <p>Kleurenwiezen offers an optional in-app purchase through Google Play Billing.</p>
      <p>
        Google Play processes payments under its own terms and privacy policy. NN Game Studio does not receive or store your
        payment card information. The app and TurnKit services process purchase verification details and the associated game
        balance to provide purchased content.
      </p>

      <h2>Online Game Data</h2>
      <p>
        TurnKit services process player profile and game information needed to provide online matches, synchronize play,
        display scores and leaderboards, and maintain in-game balances. Information may also be processed by Google services
        used for advertising, sign-in where available, and purchases.
      </p>

      <h2>Data Retention and Account Deletion</h2>
      <p>
        Player profile and game data are retained while needed to provide the app and its online services. You can request
        deletion from within the app at <strong>Settings → Delete Account</strong>, then confirm the request. The server
        schedules deletion seven days after the request. You can cancel during this period in Settings by choosing{' '}
        <strong>Stop account deletion</strong>.
      </p>
      <p>
        When deletion completes, the Kleurenwiezen player account and its associated server-side player data are removed. Data
        held independently by Google Play or Google AdMob is subject to those providers&apos; own retention and privacy policies.
      </p>
      <p>
        For details, see the{' '}
        <Link href="/kleurenwiezen/delete-account" className={linkClassName}>
          Kleurenwiezen Account Deletion page
        </Link>
        .
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect information processed by the app and its online services. No method of
        electronic storage or transmission can guarantee complete security. You are also responsible for protecting access to
        your device.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated when the app, its services, or legal requirements change. Updated versions will be
        published on this page with a revised &quot;Last updated&quot; date.
      </p>

      <h2>Contact</h2>
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
          <Link href="/kleurenwiezen" className={linkClassName}>
            Kleurenwiezen
          </Link>
        </li>
        <li>
          <Link href="/kleurenwiezen/delete-account" className={linkClassName}>
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
