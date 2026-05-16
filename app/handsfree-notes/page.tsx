import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description = 'Legal pages for com.handsfree.notes: privacy policy, terms of service, and data deletion instructions.';

export const metadata: Metadata = {
  title: 'com.handsfree.notes Legal',
  description,
  alternates: {
    canonical: absoluteUrl('/handsfree-notes'),
  },
  openGraph: {
    title: 'com.handsfree.notes Legal',
    description,
    url: absoluteUrl('/handsfree-notes'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.notes Legal',
    description,
  },
};

export default function HandsFreeNotesLegalIndexPage() {
  return (
    <LegalPage eyebrow="Legal" title="com.handsfree.notes Legal Pages" updatedLabel="Last updated: May 16, 2026">
      <p>Use the pages below for policy and legal information.</p>
      <ul>
        <li>
          <Link href="/handsfree-notes/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/handsfree-notes/terms">Terms of Service</Link>
        </li>
        <li>
          <Link href="/handsfree-notes/delete-data">Data Deletion</Link>
        </li>
      </ul>
    </LegalPage>
  );
}
