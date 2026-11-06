import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Newfoundland 120s, the classic 120 card game and Newfoundland trick-taking card game. Bid, choose trump, and play as a team.';

export const metadata: Metadata = {
  title: '120s - Newfoundland Card Game for Android',
  description,
  alternates: {
    canonical: absoluteUrl('/120s'),
  },
  openGraph: {
    title: '120s - Newfoundland Card Game for Android',
    description,
    url: absoluteUrl('/120s'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '120s - Newfoundland Card Game for Android',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.onetwenty';

export default function OneTwentyPage() {
  return (
    <LegalPage eyebrow="App" title="120s" updatedLabel="Last updated: November 6, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Get it on Google Play
        </a>
      </p>

      <h2>120s – the classic Newfoundland card game!</h2>
      <p>
        Bring Newfoundland 120s to your phone. Bid for the chance to name trump, pick up the four-card kitty, and improve your
        hand through card exchanges. Then play a five-trick hand with your partner, keeping track of the cards in play and your
        team&apos;s score.
      </p>
      <p>
        This 120 card game is played by four people in two fixed partnerships. Bids are 15, 20, 25 or 30 points. The winning
        bidder chooses trump, takes the kitty and exchanges cards before the tricks begin. Players can exchange cards from
        their hands for replacement cards, then work together to make their bid and reach 120 points. A team wins after it
        reaches 120 points and has made a successful bid.
      </p>
      <ul>
        <li>Four players in two fixed partnerships; no solo mode</li>
        <li>Bidding at 15, 20, 25 or 30 points, followed by a trump choice</li>
        <li>Four-card kitty and card exchanges before trick play</li>
        <li>Five tricks per hand, with team scoring toward 120 points</li>
        <li>Online matchmaking with other players and automated players for open seats</li>
      </ul>
      <p>
        Whether you grew up playing 120s with family or are learning the game for the first time, enjoy this classic
        Newfoundland card game on your phone.
      </p>
      <p>The table is ready. Ready to play 120s?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Get it on Google Play
          </a>
        </li>
        <li>
          <Link href="/120s/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/120s/delete-account" className={linkClassName}>
            Account Deletion
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
