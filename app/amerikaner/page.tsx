import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Spill Amerikaner, det klassiske norske kortspillet for fire. By på stikk, velg trumf og finn en hemmelig makker, eller spill alene som Amerikaner.';

export const metadata: Metadata = {
  title: 'Amerikaner – klassisk norsk kortspill for Android',
  description,
  alternates: {
    canonical: absoluteUrl('/amerikaner'),
  },
  openGraph: {
    title: 'Amerikaner – klassisk norsk kortspill for Android',
    description,
    url: absoluteUrl('/amerikaner'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Amerikaner – klassisk norsk kortspill for Android',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.amerikaner';

export default function AmerikanerPage() {
  return (
    <LegalPage eyebrow="App" title="Amerikaner" updatedLabel="Last updated: September 16, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Download on Google Play
        </a>
      </p>

      <h2>Spill Amerikaner, det klassiske norske kortspillet!</h2>
      <p>
        Amerikaner er endelig på mobilen. Spill det velkjente kortspillet for fire med budgivning, trumf, hemmelig makker og
        taktiske stikk. Enten du kjenner spillet fra hytta, familiesammenkomster eller lange kortkvelder, er det bare å trykke
        &quot;Spill&quot; og ta plass ved bordet.
      </p>
      <p>
        Hver runde starter med budgivning. Hvor mange stikk tør du love? Vinner du budrunden, tar du inn kortene fra bordet,
        velger hvilke du vil beholde og leder første stikk. Fargen du spiller blir trumf, og ved å kalle et kort får du en
        hemmelig makker.
      </p>
      <p>Men byr du Amerikaner, står du helt alene. Ingen makker. Ingen trumf. Du må ta alle 12 stikk.</p>
      <ul>
        <li>Klassisk Amerikaner med kjente norske regler</li>
        <li>Budgivning, trumf og hemmelig makker</li>
        <li>Spill med ekte spillere eller smarte boter</li>
        <li>Raske kamper med mye taktikk</li>
        <li>Månedlige topplister</li>
        <li>Enkelt, ryddig og laget for mobil</li>
      </ul>
      <p>
        Enten du har spilt Amerikaner i årevis eller lærer spillet for første gang, får du den samme blandingen av kortflaks,
        taktikk og spenning hver gang budene begynner å stige.
      </p>
      <p>Bordet venter. Hvor høyt tør du by?</p>

      <h2>English</h2>
      <p>Play Amerikaner, the classic Norwegian card game!</p>
      <p>
        Amerikaner is finally on mobile. Play the traditional four-player trick-taking game with bidding, trump cards, a
        secret partner and plenty of tactical decisions. Whether you know it from cabin trips, family gatherings or long
        evenings around the card table, just tap &quot;Play&quot; and take your seat.
      </p>
      <p>
        Every round begins with bidding. How many tricks are you willing to promise? Win the auction, take the kitty, choose
        which cards to keep and lead the first trick. The suit you lead becomes trump, and by calling a card you secretly
        choose your partner.
      </p>
      <p>But bid Amerikaner and you are completely on your own. No partner. No trump. You must win all 12 tricks.</p>
      <ul>
        <li>Classic Amerikaner based on familiar Norwegian rules</li>
        <li>Bidding, trump cards and a secret partner</li>
        <li>Play with real players or smart bots</li>
        <li>Quick matches with plenty of strategy</li>
        <li>Monthly leaderboards</li>
        <li>Clean, smooth and designed for mobile</li>
      </ul>
      <p>
        Whether you have played Amerikaner for years or are discovering it for the first time, every match brings the same mix
        of luck, tactics and tension as the bids climb higher.
      </p>
      <p>The table is waiting. How high will you bid?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/amerikaner/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/amerikaner/delete-account" className={linkClassName}>
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
