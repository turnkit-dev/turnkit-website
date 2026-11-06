import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Request deletion of your 120s player account in the app. Learn what is removed, how to cancel during the seven-day grace period, and when deletion completes.';

export const metadata: Metadata = {
  title: '120s Account Deletion',
  description,
  alternates: {
    canonical: absoluteUrl('/120s/delete-account'),
  },
  openGraph: {
    title: '120s Account Deletion',
    description,
    url: absoluteUrl('/120s/delete-account'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '120s Account Deletion',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function OneTwentyDeleteAccountPage() {
  return (
    <LegalPage eyebrow="Legal" title="120s Account Deletion" updatedLabel="Last updated: November 6, 2026">
      <p>120s is provided by NN Game Studio.</p>

      <h2>Request Account Deletion</h2>
      <p>
        Open 120s and go to <strong>Settings → Delete Account</strong>. Review the in-app confirmation screen and confirm the
        request. The app sends the request to the game service and shows a deletion countdown.
      </p>

      <h2>Seven-Day Grace Period</h2>
      <p>
        The server schedules deletion for seven days after your request. During this period, open Settings and choose{' '}
        <strong>Stop Account Deletion</strong> to cancel. After the seven-day deadline, the server&apos;s cleanup worker removes the
        account on its next run, which normally occurs about once a minute. Once deletion is complete, the account and its
        progress cannot be restored.
      </p>

      <h2>Data Covered</h2>
      <p>
        Deletion removes the player account and associated server-side records, including the player profile, refresh tokens,
        game-store balances and purchase grants, score entries and archived scores. Records held separately by Google Play
        Games, Google AdMob or Google Play Billing are handled under Google&apos;s policies.
      </p>
      <p>
        Server-side deletion does not erase local app settings, the installation identifier or the local path to a selected
        profile photo. Clear 120s app data or uninstall the app to remove those items from your device.
      </p>

      <h2>Need Help?</h2>
      <p>
        If you cannot access the in-app deletion process, email{' '}
        <a href="mailto:support@turnkit.dev" className={linkClassName}>
          support@turnkit.dev
        </a>
        .
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/120s" className={linkClassName}>
            120s
          </Link>
        </li>
        <li>
          <Link href="/120s/privacy" className={linkClassName}>
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
