import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const deleteDataDescription =
  'How to delete local data for com.handsfree.notes, including recordings and transcripts stored on your device.';

export const metadata: Metadata = {
  title: 'com.handsfree.notes Data Deletion',
  description: deleteDataDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-notes/delete-data'),
  },
  openGraph: {
    title: 'com.handsfree.notes Data Deletion',
    description: deleteDataDescription,
    url: absoluteUrl('/handsfree-notes/delete-data'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.notes Data Deletion',
    description: deleteDataDescription,
  },
};

export default function HandsFreeNotesDeleteDataPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="com.handsfree.notes Data Deletion"
      updatedLabel="Last updated: May 16, 2026"
    >
      <p>com.handsfree.notes stores recordings and transcripts locally on your device.</p>

      <h2>To delete your data</h2>
      <ul>
        <li>Delete recordings and notes inside the app, or</li>
        <li>Uninstall the application to remove locally stored app data.</li>
      </ul>

      <p>The app does not store user recordings or transcripts on external servers.</p>
    </LegalPage>
  );
}
