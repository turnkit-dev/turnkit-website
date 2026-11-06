import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Learn how 120s handles guest profiles, online game data, advertising, purchases, device permissions, and account deletion.';

export const metadata: Metadata = {
  title: '120s Privacy Policy',
  description,
  alternates: {
    canonical: absoluteUrl('/120s/privacy'),
  },
  openGraph: {
    title: '120s Privacy Policy',
    description,
    url: absoluteUrl('/120s/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '120s Privacy Policy',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function OneTwentyPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="120s Privacy Policy" updatedLabel="Last updated: November 6, 2026">
      <p>
        120s (&quot;the app&quot;) is provided by NN Game Studio. This policy explains what information the app uses and how it is
        handled.
      </p>

      <h2>Accounts and Information</h2>
      <p>
        You do not need to register with an email address or provide a real name, phone number or postal address. When the app
        starts, it creates a guest player profile using a random installation identifier and a generated display name so its
        online game services can identify your player. On supported Android devices, the app can also use Google Play Games
        sign-in when that method is enabled for the app.
      </p>
      <p>
        To provide player profiles and online matches, TurnKit game services process player identifiers, display names,
        authentication and session information, match state, card moves and scores. The app can also maintain game-store
        balances, purchase grants and reward records for a player profile. Google Play Games profile details, such as a public
        display name or avatar, may be used for your in-game presentation.
      </p>

      <h2>Information Stored on Your Device</h2>
      <p>
        The app stores its installation identifier, player and session data, display-name and avatar presentation settings,
        sound and music levels, language choice, temporary match recovery information, local ad-frequency records and an
        account-deletion deadline in Android app storage. If you choose a profile photo, the app keeps its local file path for
        display on your device; the app code does not upload that photo to TurnKit servers.
      </p>

      <h2>Permissions</h2>
      <p>
        The Android app uses internet access for player services, matchmaking, advertising and purchases. Its manifest also
        declares Google Play Billing for in-app purchases. Settings can open the Android photo picker when you choose a profile
        photo. The app does not request camera, microphone, location, contacts or broad storage permissions in its game code.
      </p>

      <h2>Advertising</h2>
      <p>
        120s uses Google AdMob for interstitial and rewarded advertisements. Google may process device or advertising
        identifiers, app usage and ad delivery or interaction information to provide and measure ads, subject to Google&apos;s
        policies.
      </p>
      <p>
        Learn more in the{' '}
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
      <p>
        The app includes an optional Google Play Billing purchase for game tokens. Google Play processes payment information;
        NN Game Studio does not receive your payment card details. The game service stores the purchase grant and resulting
        player balance needed to provide the purchased content.
      </p>

      <h2>Online Services and Retention</h2>
      <p>
        The app uses TurnKit services for guest profiles, matchmaking and game sessions. We keep account and game-service data
        while the player profile is active and use it to operate the game. NN Game Studio does not sell personal data.
      </p>
      <p>
        You can request deletion from within the app at <strong>Settings → Delete Account</strong>, then confirm on the
        confirmation screen. The server schedules deletion seven days after the request. You can cancel during that period
        from Settings. For the exact process, see the{' '}
        <Link href="/120s/delete-account" className={linkClassName}>
          120s Account Deletion page
        </Link>
        .
      </p>
      <p>
        After the grace period, the server removes the player account and associated data, including profile records, refresh
        tokens, game-store balances and purchase grants, score entries and archived scores. Local app settings, the installation
        identifier and a selected profile-photo path are not removed by server-side account deletion. Clear app data or uninstall
        the app to remove those local items. Data retained independently by Google Play Games, Google AdMob or Google Play
        Billing is governed by Google&apos;s own policies.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards for information handled by the app and its services. No electronic storage or transmission
        method can guarantee complete security.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy when the app or its data practices change. The current version and its publication date will
        appear on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email:{' '}
        <a href="mailto:support@turnkit.dev" className={linkClassName}>
          support@turnkit.dev
        </a>
        <br />
        Country: Serbia
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/120s" className={linkClassName}>
            120s
          </Link>
        </li>
        <li>
          <Link href="/120s/delete-account" className={linkClassName}>
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
