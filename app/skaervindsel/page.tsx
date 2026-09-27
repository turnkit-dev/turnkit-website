import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Skærvindsel, the classic Danish card game for Android. Bid, choose trumps and contracts, and play with a partner, alone, against real players or smart bots.';

export const metadata: Metadata = {
  title: 'Skærvindsel – Classic Danish Card Game for Android',
  description,
  alternates: {
    canonical: absoluteUrl('/skaervindsel'),
  },
  openGraph: {
    title: 'Skærvindsel – Classic Danish Card Game for Android',
    description,
    url: absoluteUrl('/skaervindsel'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Skærvindsel – Classic Danish Card Game for Android',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function SkaervindselPage() {
  return (
    <LegalPage eyebrow="App" title="Skærvindsel" updatedLabel="Last updated: September 27, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.turnkit.skaervindsel"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Download on Google Play
        </a>
      </p>

      <div lang="da">
        <p>Skærvindsel – klassisk dansk kortspil!</p>

        <p>
          Skærvindsel bringer det traditionelle danske kortspil til mobilen. Spil et taktisk stikspil, hvor budgivning, trumfer
          og det rigtige valg af kontrakt afgør spillet. Uanset om du har spillet Skærvindsel i mange år eller lærer reglerne for
          første gang, kan du hoppe direkte til bordet og begynde at spille.
        </p>

        <p>
          Skærvindsel spilles af fire spillere med 28 kort. Budrunden afgør, hvem der bliver spilfører, hvilken kontrakt der
          spilles, og hvordan hånden skal vindes. Afhængigt af kontrakten kan du spille med en makker eller forsøge at klare dig
          alene.
        </p>

        <p>
          De sorte damer, knægtene og trumf-syveren spiller en central rolle blandt spillets stærkeste kort. Vælg dine bud med
          omhu, hold øje med de kort, der allerede er spillet, og planlæg dine stik for at gennemføre kontrakten.
        </p>

        <ul>
          <li>Klassisk dansk Skærvindsel</li>
          <li>Fire spillere og 28 kort</li>
          <li>Budgivning, trumfer og forskellige kontrakter</li>
          <li>Spil med en makker eller alene afhængigt af kontrakten</li>
          <li>Spil mod rigtige spillere eller smarte bots</li>
          <li>Hurtige kampe med taktisk gameplay</li>
          <li>Månedlige ranglister</li>
          <li>Enkel brugerflade designet til mobil</li>
        </ul>

        <p>
          Uanset om du er en erfaren Skærvindsel-spiller eller opdager spillet for første gang, byder hver hånd på en ny
          kombination af kort, budgivning og taktik.
        </p>

        <p>Bordet venter. Er du klar til at spille?</p>
      </div>

      <h2>English</h2>

      <p>Play Skærvindsel, the classic Danish card game!</p>

      <p>
        Skærvindsel brings the traditional Danish card game to mobile. Play a tactical trick-taking game where bidding, trumps
        and choosing the right contract determine the outcome. Whether you have played Skærvindsel for years or are learning the
        rules for the first time, you can jump straight to the table and start playing.
      </p>

      <p>
        Skærvindsel is played by four players with a 28-card deck. The auction determines the declarer, the contract and how the
        hand must be won. Depending on the contract, you may play with a partner or attempt to win on your own.
      </p>

      <p>
        The black queens, jacks and trump seven play a central role among the game&apos;s strongest cards. Choose your bids
        carefully, keep track of the cards that have already been played and plan your tricks to complete the contract.
      </p>

      <ul>
        <li>Classic Danish Skærvindsel</li>
        <li>Four players and a 28-card deck</li>
        <li>Bidding, trumps and multiple contracts</li>
        <li>Play with a partner or alone depending on the contract</li>
        <li>Play with real players or smart bots</li>
        <li>Quick matches with tactical gameplay</li>
        <li>Monthly leaderboards</li>
        <li>Clean interface designed for mobile</li>
      </ul>

      <p>
        Whether you are an experienced Skærvindsel player or discovering the game for the first time, every hand brings a new
        combination of cards, bidding and strategy.
      </p>

      <p>The table is waiting. Are you ready to play?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.turnkit.skaervindsel"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/skaervindsel/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/skaervindsel/delete-account" className={linkClassName}>
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
