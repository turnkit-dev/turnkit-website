import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Discover Kleurenwiezen, the Flemish trick-taking card game for four players with individual scores, changing partnerships, and eight-hand matches.';

export const metadata: Metadata = {
  title: 'Kleurenwiezen – Flemish Card Game for Four Players',
  description,
  alternates: {
    canonical: absoluteUrl('/kleurenwiezen'),
  },
  openGraph: {
    title: 'Kleurenwiezen – Flemish Card Game for Four Players',
    description,
    url: absoluteUrl('/kleurenwiezen'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kleurenwiezen – Flemish Card Game for Four Players',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.kleurenwiezen';

export default function KleurenwiezenPage() {
  return (
    <LegalPage eyebrow="App" title="Kleurenwiezen" updatedLabel="Last updated: November 6, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Download on Google Play
        </a>
      </p>

      <h2>Kleurenwiezen – het Vlaamse kaartspel van bieden en slagen!</h2>

      <p>
        Speel Kleurenwiezen op je smartphone. Vier spelers spelen elk voor hun eigen score. De biedingen bepalen het contract
        en kunnen tijdelijke samenwerkingen vormen die van hand tot hand veranderen.
      </p>

      <p>
        Speel samen in een kleurcontract, ga alleen voor een aantal slagen, of kies een bijzonder contract zoals Troel,
        Small Misere, Large Misere, Open Misere, Piccolo, Abondance of Solo Slim. Bij Troel zoekt de speler met drie of vier
        azen een partner via een kaart die hij of zij noemt. Alleen als Troel het definitieve contract blijft, kiest de partner
        of de genoemde kleur troef blijft of wordt veranderd.
      </p>

      <p>
        Gebruik je kaarten verstandig, volg kleur wanneer je kunt en probeer je contract te halen. Een match telt acht
        gespeelde handen. Na de laatste hand wint de speler met de hoogste individuele score.
      </p>

      <p>Ken je Kleurenwiezen van thuis of uit het café? Ontdek dit Vlaamse kaartspel op je telefoon.</p>

      <p>De tafel is klaar. Speel je mee?</p>

      <ul>
        <li>Vlaams kaartspel voor vier spelers</li>
        <li>Individuele scores; tijdelijke samenwerkingen per hand</li>
        <li>Bieden bepaalt het contract en, waar van toepassing, de troefkleur</li>
        <li>Contracten zoals Together, Solo, Troel, Small Misere, Large Misere, Open Misere, Piccolo, Abondance en Solo Slim</li>
        <li>Match van acht volledig gespeelde handen</li>
        <li>Standaard kaartspel van 52 kaarten, zonder jokers</li>
      </ul>

      <h2>English</h2>

      <p>Kleurenwiezen – the Flemish game of bidding and tricks!</p>

      <p>
        Play Kleurenwiezen on your phone. Four players compete for individual scores. Bidding determines the contract and can
        create temporary partnerships that change from hand to hand.
      </p>

      <p>
        Team up for a suit contract, play alone for a number of tricks, or choose a special contract such as Troel, Small
        Misere, Large Misere, Open Misere, Piccolo, Abondance, or Solo Slim. In Troel, the player holding three or four aces
        calls a card to find a partner. If Troel remains the final contract, the partner decides whether to keep the called
        suit as trump or change it.
      </p>

      <p>
        Choose your cards carefully, follow suit when you can, and try to make your contract. A match lasts eight completed
        hands. The player with the highest individual score at the end wins.
      </p>

      <p>
        Whether you know Kleurenwiezen from home games or are discovering it for the first time, enjoy this Flemish card game
        on your phone.
      </p>

      <p>The table is ready. Ready to play Kleurenwiezen?</p>

      <ul>
        <li>Flemish card game for four players</li>
        <li>Individual scores, with temporary partnerships each hand</li>
        <li>Bidding determines the contract and, where applicable, the trump suit</li>
        <li>Contracts including Together, Solo, Troel, Small Misere, Large Misere, Open Misere, Piccolo, Abondance, and Solo Slim</li>
        <li>Matches of eight completed hands</li>
        <li>Standard 52-card deck, without jokers</li>
      </ul>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/kleurenwiezen/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/kleurenwiezen/delete-account" className={linkClassName}>
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
