import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Hands Free Appointments is a practical voice-first calendar app that converts spoken scheduling into Google Calendar events.';

export const metadata: Metadata = {
  title: 'Hands Free Appointments',
  description,
  alternates: {
    canonical: absoluteUrl('/handsfree-appointments'),
  },
  openGraph: {
    title: 'Hands Free Appointments',
    description,
    url: absoluteUrl('/handsfree-appointments'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hands Free Appointments',
    description,
  },
};

export default function HandsFreeAppointmentsLegalIndexPage() {
  return (
    <LegalPage
      eyebrow="App"
      title="Hands Free Appointments"
      updatedLabel="Last updated: May 26, 2026"
    >
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.handsfree.appointments"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          Download on Google Play
        </a>
      </p>

      <p>
        Hands Free Appointments is a practical voice-first calendar app designed for real-life situations when your hands are
        busy or dirty.
      </p>
      <p>
        You open the app (phone needs to be unlocked), and simply speak: &quot;Monday 3 PM dentist appointment.&quot; The app
        parses it and adds the event to your calendar. It syncs seamlessly with Google Calendar.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>
          Weekly view gives you a clean at-a-glance overview of your schedule so you can quickly see what&apos;s booked and
          what&apos;s free.
        </li>
        <li>
          Say &quot;Pico&quot; to wake the app and add new appointments hands-free (ideal when working with tools, cooking,
          gardening, etc.).
        </li>
        <li>
          Auto-save kicks in after a few seconds. You can customize it: save when everything is parsed, always save, or never
          auto-save.
        </li>
        <li>
          Set default notifications before events, adjust event durations, and disable specific days in the weekly view to
          protect your free time.
        </li>
      </ul>

      <p>
        It&apos;s a straightforward, no-nonsense tool that makes scheduling faster and more convenient without forcing you to type
        or navigate menus when you&apos;re occupied. Simple, functional, and built for everyday practicality.
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link
            href="/handsfree-appointments/privacy"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-appointments/terms"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Terms of Service
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
