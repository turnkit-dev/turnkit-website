import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Hands Free Notes is a private offline voice notepad with on-device speech-to-text, background recording, and searchable notes.';

export const metadata: Metadata = {
  title: 'Hands Free Notes',
  description,
  alternates: {
    canonical: absoluteUrl('/handsfree-notes'),
  },
  openGraph: {
    title: 'Hands Free Notes',
    description,
    url: absoluteUrl('/handsfree-notes'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hands Free Notes',
    description,
  },
};

export default function HandsFreeNotesLegalIndexPage() {
  return (
    <LegalPage eyebrow="App" title="Hands Free Notes - Your private offline voice notepad." updatedLabel="Last updated: May 16, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.handsfree.notes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          Download on Google Play
        </a>
      </p>

      <p>
        Turn your voice into text instantly with no internet required. Just say &quot;hello world&quot; to start recording or tap to
        begin. The app works seamlessly in the background so you can keep using your phone while it captures and transcribes everything
        on-device.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Fully offline speech-to-text. Everything stays on your device.</li>
        <li>Background recording with live transcription.</li>
        <li>Easy manual start and stop option.</li>
        <li>Playback original audio anytime.</li>
        <li>Edit, organize, filter, and search your notes.</li>
        <li>Share both recordings and transcribed notes to any app.</li>
        <li>Clean, simple interface with no cloud, no ads, no subscriptions.</li>
      </ul>

      <p>Perfect for quick notes, meetings, ideas, journaling, or hands-free note-taking on the go.</p>
      <p>Private. Offline. Voice-powered.</p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link
            href="/handsfree-notes/privacy"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-notes/terms"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Terms of Service
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-notes/delete-data"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Data Deletion
          </Link>
        </li>
        <li>
          <Link
            href="/other-projects"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
