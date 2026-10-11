import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Manillen, the traditional Flemish card game for Android. Team up in a four-player trick-taking game with trumps, smart bots, and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Manillen - Flemish Card Game for Android',
  description,
  alternates: {
    canonical: absoluteUrl('/manillen'),
  },
  openGraph: {
    title: 'Manillen - Flemish Card Game for Android',
    description,
    url: absoluteUrl('/manillen'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Manillen - Flemish Card Game for Android',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function ManillenPage() {
  return (
    <LegalPage eyebrow="App" title="Manillen" updatedLabel="Last updated: October 11, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.turnkit.manillen"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Download on Google Play
        </a>
      </p>

      <p>Manillen – Vlaams kaartspel!</p>

      <p>
        Manillen brengt het traditionele Vlaamse kaartspel naar je smartphone. Speel een tactisch kaartspel voor vier spelers
        waarin samenspel, troef en slimme keuzes het verschil maken. Of je Manillen al jaren speelt of het voor het eerst
        ontdekt: neem plaats aan tafel en speel mee.
      </p>

      <p>
        Manillen wordt gespeeld met vier spelers in twee vaste teams. Het spel gebruikt 32 kaarten, zodat iedere speler acht
        kaarten krijgt. De tien, ook wel de manille genoemd, is de hoogste kaart van elke kleur, gevolgd door de aas, koning,
        vrouw, boer, negen, acht en zeven.
      </p>

      <p>
        De deler kiest troef op basis van zijn kaarten. Werk samen met je partner om waardevolle slagen te winnen en zoveel
        mogelijk kaartpunten te verzamelen. Met meegaan en tegengaan kunnen de inzetten oplopen: schat je hand goed in voordat
        je het risico verhoogt.
      </p>

      <p>
        Houd bij welke kaarten al gespeeld zijn, bewaar je troeven voor het juiste moment en ondersteun je partner. Niet elke
        slag is evenveel waard, en één slim gespeelde kaart kan het verschil maken.
      </p>

      <ul>
        <li>Traditioneel Vlaams Manillen</li>
        <li>Vier spelers in twee vaste teams</li>
        <li>32 kaarten en acht kaarten per speler</li>
        <li>De tien is de hoogste kaart</li>
        <li>Troef kiezen, meegaan en tegengaan</li>
        <li>Tactisch samenspel en slagen winnen</li>
        <li>Speel tegen echte spelers of slimme bots</li>
        <li>Maandelijkse ranglijsten</li>
        <li>Eenvoudige bediening voor je smartphone</li>
      </ul>

      <p>
        Ken je Manillen van thuis, het café of een kaartavond met vrienden? Geniet van het vertrouwde Belgische kaartspel op je
        telefoon. Elke ronde brengt nieuwe kaarten, nieuwe keuzes en nieuwe kansen voor je team.
      </p>

      <p>De tafel staat klaar. Klaar voor een potje Manillen?</p>

      <h2>English</h2>

      <p>Manillen – the classic Flemish card game!</p>

      <p>
        Manillen brings the traditional Flemish card game to your smartphone. Play a tactical four-player partnership game
        where teamwork, trumps and smart decisions make the difference. Whether you have played Manillen for years or are
        discovering it for the first time, take your seat and join the game.
      </p>

      <p>
        Manillen is played by four players in two fixed teams using a 32-card deck. Each player receives eight cards. The ten,
        known as the manille, is the highest card in each suit, followed by the ace, king, queen, jack, nine, eight and seven.
      </p>

      <p>
        The dealer chooses trumps based on their hand. Work with your partner to capture valuable tricks and collect more card
        points than your opponents. Meegaan and tegengaan raise the stakes, rewarding players who judge their hands carefully.
      </p>

      <p>
        Keep track of the cards already played, save your trumps for the right moment and support your partner. Some tricks are
        worth more than others, and one well-played card can change the result.
      </p>

      <ul>
        <li>Traditional Flemish Manillen</li>
        <li>Four players in two fixed teams</li>
        <li>32 cards and eight cards per player</li>
        <li>Tens rank above aces</li>
        <li>Trump selection, meegaan and tegengaan</li>
        <li>Tactical teamwork and trick-taking gameplay</li>
        <li>Play with real players or smart bots</li>
        <li>Monthly leaderboards</li>
        <li>Simple controls designed for mobile</li>
      </ul>

      <p>
        Whether you know Manillen from family gatherings, Belgian cafés or card nights with friends, enjoy this classic
        partnership card game on your phone. Every hand brings new cards, new decisions and new opportunities for your team.
      </p>

      <p>The table is waiting. Ready to play Manillen?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.turnkit.manillen"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/manillen/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/manillen/delete-account" className={linkClassName}>
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
