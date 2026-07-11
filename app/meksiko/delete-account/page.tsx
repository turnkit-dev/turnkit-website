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
    <LegalPage eyebrow="Legal" title="Meksiko Account Deletion" updatedLabel="Last updated: July 7, 2026">
      <p>Meksiko is published by NN Game Studio.</p>

      <p>To delete your Meksiko game account and associated server-side data, open the app and go to:</p>

      <p>
        <strong>Settings -&gt; Delete Account</strong>
      </p>

      <p>Then confirm the deletion request.</p>

      <h2>What happens next</h2>
      <p>After 7 days, your Meksiko game account will be deleted.</p>
      <p>
        This includes your player profile, display name, token balance, leaderboard data, and gameplay data stored on our
        servers.
      </p>

      <h2>Important</h2>
      <p>After deletion, the account and game progress cannot be recovered.</p>
      <p>We do not retain deleted account data on our servers after the deletion is completed.</p>

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
