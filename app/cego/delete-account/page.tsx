import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Learn how to delete your Cego game account and associated server-side profile, balance, leaderboard and gameplay data.';

export const metadata: Metadata = {
  title: 'Cego Account Deletion',
  description,
  alternates: {
    canonical: absoluteUrl('/cego/delete-account'),
  },
  openGraph: {
    title: 'Cego Account Deletion',
    description,
    url: absoluteUrl('/cego/delete-account'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cego Account Deletion',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function CegoDeleteAccountPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cego Account Deletion" updatedLabel="Last updated: October 12, 2026">
      <p>Cego is published by NN Game Studio.</p>

      <h2>Delete Your Account</h2>
      <p>You can delete your Cego game account and associated server-side data directly from the app.</p>
      <p>Open Cego and go to:</p>
      <p>
        <strong>Settings → Delete Account</strong>
      </p>
      <p>Then confirm the deletion request.</p>

      <h2>Deletion Process</h2>
      <p>Your account will be scheduled for deletion.</p>
      <p>After 7 days, your Cego game account and associated server-side data will be permanently deleted.</p>
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
      <h2>Cancellation and Recovery</h2>
      <p>
        If your app supports cancelling deletion by signing in or opening the account again, the deletion request may be
        cancelled according to the instructions shown in the app.
      </p>
      <p>Once deletion has been completed, your account and game progress cannot be recovered.</p>

      <h2>Data Retention</h2>
      <p>
        We do not retain the deleted game account data on our servers after the deletion process has been completed, except where
        retention is required by law or necessary for security, fraud prevention, or legal obligations.
      </p>
      <p>
        Information processed independently by third-party services such as Google Play or Google AdMob is subject to their own
        retention and privacy policies.
      </p>

      <h2>Contact</h2>
      <p>
        If you cannot access the app or have problems deleting your account, contact:{' '}
        <a href="mailto:support@turnkit.dev" className={linkClassName}>
          support@turnkit.dev
        </a>
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/cego" className={linkClassName}>
            Cego
          </Link>
        </li>
        <li>
          <Link href="/cego/privacy" className={linkClassName}>
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
