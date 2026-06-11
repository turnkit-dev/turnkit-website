import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Hands Free Voice Tube is a voice-controlled YouTube player that lets you start, pause, rewind, skip, mark favorites, and recall moments hands-free.';

export const metadata: Metadata = {
  title: 'Hands Free Voice Tube',
  description,
  alternates: {
    canonical: absoluteUrl('/handsfree-tube'),
  },
  openGraph: {
    title: 'Hands Free Voice Tube',
    description,
    url: absoluteUrl('/handsfree-tube'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hands Free Voice Tube',
    description,
  },
};

export default function HandsFreeTubePage() {
  return (
    <LegalPage eyebrow="App" title="Hands Free Voice Tube - Voice control YouTube videos." updatedLabel="Last updated: June 11, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.handsfree.tube"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          Download on Google Play
        </a>
      </p>

      <p>
        Hands Free Voice Tube transforms how you enjoy YouTube videos with effortless voice control, giving you true hands-free
        freedom.
      </p>
      <p>
        Simply paste a YouTube link, share it directly into the app, or pick from your recent videos. The video starts playing
        automatically while listening activates instantly, so you stay immersed without lifting a finger. Perfect for cooking in
        the kitchen, working out, driving, relaxing in bed, or tackling chores with busy hands.
      </p>
      <p>
        Speak natural voice commands to take full control: Start or Pause playback, Back or Forward to rewind or skip ahead by
        your custom seconds, Mark a favorite moment, and Recall to jump right back to it anytime. No more fumbling with the
        screen or missing key parts - just talk and enjoy seamless navigation.
      </p>
      <p>
        Enjoy 2 full videos daily with unlimited replays. Need more? Watch one short reward ad for 2 hours of unlimited access,
        or unlock forever with a one-time $4.99 purchase for ad-free, unrestricted use.
      </p>
      <p>
        Whether you want to dive deep into tutorials, binge your favorite channels, listen to music or podcasts, or catch up on
        long videos without constant pauses, Hands Free Voice Tube makes every moment more enjoyable and accessible. Experience
        the joy of truly hands-free YouTube watching today - your voice is all you need.
      </p>
      <p>Download now and reclaim your time and freedom with intuitive voice-powered playback.</p>

      <h2>Key Features</h2>
      <ul>
        <li>Paste, share, or open recent YouTube videos instantly.</li>
        <li>Automatic playback and listening activation.</li>
        <li>Voice commands for Start, Pause, Back, Forward, Mark, and Recall.</li>
        <li>Custom rewind and skip intervals.</li>
        <li>Rewarded access plus one-time lifetime unlock.</li>
        <li>Designed for cooking, workouts, driving, and hands-busy use.</li>
      </ul>

      <h2>Links</h2>
      <ul>
        <li>
          <Link
            href="/handsfree-tube/privacy"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-tube/terms"
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
