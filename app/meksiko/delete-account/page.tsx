import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const deleteAccountDescription =
  'Learn how to delete your Meksiko game account and associated server-side profile, balance, leaderboard, and gameplay data from NN Game Studio.';

export const metadata: Metadata = {
  title: 'Delete Your Meksiko Game Account and Data',
  description: deleteAccountDescription,
  alternates: {
    canonical: absoluteUrl('/meksiko/delete-account'),
  },
  openGraph: {
    title: 'Delete Your Meksiko Game Account and Data',
    description: deleteAccountDescription,
    url: absoluteUrl('/meksiko/delete-account'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Delete Your Meksiko Game Account and Data',
    description: deleteAccountDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoDeleteAccountPage() {
  return (
    <LegalPage eyebrow="Legal" title="Meksiko Account Deletion" updatedLabel="Last updated: September 16, 2026">
      <p>Meksiko is published by NN Game Studio.</p>

      <p>You can request deletion of your Meksiko game account and associated data either from within the app or by contacting us.</p>

      <h2>Delete your account in the app</h2>
      <p>Open Meksiko and go to:</p>
      <p>
        <strong>Settings → Delete Account</strong>
      </p>
      <p>Then confirm the deletion request.</p>

      <h2>Delete your account without the app</h2>
      <p>If you no longer have access to Meksiko, you can request account deletion by contacting:</p>
      <p><a href="mailto:support@turnkit.dev" className={linkClassName}>support@turnkit.dev</a></p>
      <p>Please include enough information for us to identify your game account. Do not send passwords or payment card information.</p>

      <h2>What happens next</h2>
      <p>After your deletion request is confirmed, your account will be scheduled for deletion.</p>
      <p>
        After <strong>7 days</strong>, your Meksiko game account and associated server-side data will be permanently deleted.
      </p>
      <p>This includes data such as:</p>
      <ul>
        <li>Player profile</li>
        <li>Display name</li>
        <li>In-game currency or token balance</li>
        <li>Leaderboard data</li>
        <li>Gameplay statistics and progress</li>
        <li>Match and gameplay data</li>
        <li>Other server-side data associated with your game account</li>
      </ul>

      <h2>Data that may be retained</h2>
      <p>We may retain limited information where necessary for legitimate purposes such as:</p>
      <ul>
        <li>Security and fraud prevention</li>
        <li>Legal or regulatory obligations</li>
        <li>Resolving disputes</li>
        <li>Financial or transaction records that we are legally required to retain</li>
      </ul>
      <p>Data processed independently by services such as Google Play, Google AdMob or Firebase is subject to those providers&apos; own retention and privacy policies.</p>

      <h2>Important</h2>
      <p>After deletion, the account and game progress cannot be recovered.</p>
      <p>For questions or problems with account deletion, contact <a href="mailto:support@turnkit.dev" className={linkClassName}>support@turnkit.dev</a>.</p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/meksiko" className={linkClassName}>
            Meksiko
          </Link>
        </li>
        <li>
          <Link href="/meksiko/privacy" className={linkClassName}>
            Privacy Policy
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
