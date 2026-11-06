import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Learn how to request deletion of your Kleurenwiezen player account and associated server-side player data.';

export const metadata: Metadata = {
  title: 'Kleurenwiezen Account Deletion',
  description,
  alternates: {
    canonical: absoluteUrl('/kleurenwiezen/delete-account'),
  },
  openGraph: {
    title: 'Kleurenwiezen Account Deletion',
    description,
    url: absoluteUrl('/kleurenwiezen/delete-account'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kleurenwiezen Account Deletion',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function KleurenwiezenDeleteAccountPage() {
  return (
    <LegalPage eyebrow="Legal" title="Kleurenwiezen Account Deletion" updatedLabel="Last updated: November 6, 2026">
      <p>Kleurenwiezen is provided by NN Game Studio.</p>

      <h2>Delete Your Account</h2>
      <p>You can request deletion of your Kleurenwiezen player account and associated server-side player data in the app.</p>
      <p>Open Kleurenwiezen and go to:</p>
      <p>
        <strong>Settings → Delete Account</strong>
      </p>
      <p>Then confirm the deletion request.</p>

      <h2>Deletion Schedule and Data Covered</h2>
      <p>
        The server schedules deletion seven days after your request. When deletion completes, your Kleurenwiezen player account
        and associated server-side player data are removed, including player profile and game records linked to that account.
      </p>
      <p>Records held independently by Google Play or Google AdMob are governed by those providers&apos; own policies.</p>

      <h2>Cancel a Request</h2>
      <p>
        During the seven-day period, open Settings and choose <strong>Stop account deletion</strong> to cancel the request.
        After deletion is completed, the account and associated game data cannot be recovered.
      </p>

      <h2>Contact</h2>
      <p>
        If you cannot access the deletion flow or need help, email{' '}
        <a href="mailto:support@turnkit.dev" className={linkClassName}>
          support@turnkit.dev
        </a>
        .
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/kleurenwiezen" className={linkClassName}>
            Kleurenwiezen
          </Link>
        </li>
        <li>
          <Link href="/kleurenwiezen/privacy" className={linkClassName}>
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
