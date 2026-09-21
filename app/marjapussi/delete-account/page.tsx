import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Learn how to delete your Marjapussi game account and associated server-side profile, balance, leaderboard, and gameplay data from NN Game Studio.';

export const metadata: Metadata = {
  title: 'Delete Your Marjapussi Game Account and Data',
  description,
  alternates: {
    canonical: absoluteUrl('/marjapussi/delete-account'),
  },
  openGraph: {
    title: 'Delete Your Marjapussi Game Account and Data',
    description,
    url: absoluteUrl('/marjapussi/delete-account'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Delete Your Marjapussi Game Account and Data',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MarjapussiDeleteAccountPage() {
  return (
    <LegalPage eyebrow="Legal" title="Marjapussi Account Deletion" updatedLabel="Last updated: September 21, 2026">
      <p>Marjapussi is published by NN Game Studio.</p>

      <p>You can delete your Marjapussi game account and associated server-side data directly from the app.</p>

      <p>Open Marjapussi and go to:</p>
      <p>
        <strong>Settings → Delete Account</strong>
      </p>

      <p>Then confirm the deletion request.</p>

      <p>Your account will be scheduled for deletion.</p>

      <p>After 7 days, your Marjapussi game account and associated server-side data will be permanently deleted.</p>

      <p>This includes data such as:</p>
      <ul>
        <li>Player profile</li>
        <li>Display name</li>
        <li>In-game currency or token balance</li>
        <li>Leaderboard data</li>
        <li>Gameplay statistics and progress</li>
        <li>Other game data associated with your player account</li>
      </ul>

      <p>Your account remains scheduled for deletion during this period.</p>

      <p>
        If your app supports cancelling deletion by signing in or opening the account again, the deletion request may be
        cancelled according to the instructions shown in the app.
      </p>

      <p>Once deletion has been completed, your account and game progress cannot be recovered.</p>

      <p>
        We do not retain the deleted game account data on our servers after the deletion process has been completed, except where
        retention is required by law or necessary for security, fraud prevention, or legal obligations.
      </p>

      <p>
        Information processed independently by third-party services such as Google Play, Google AdMob or Firebase is subject to
        their own retention and privacy policies.
      </p>

      <p>
        If you cannot access the app or have problems deleting your account, contact:{' '}
        <a href="mailto:support@turnkit.dev" className={linkClassName}>
          support@turnkit.dev
        </a>
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/marjapussi" className={linkClassName}>
            Marjapussi
          </Link>
        </li>
        <li>
          <Link href="/marjapussi/privacy" className={linkClassName}>
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
