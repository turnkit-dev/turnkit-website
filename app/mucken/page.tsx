import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Mucken, the traditional Franconian card game for four players, with tactical bidding, trumps, fixed teams, smart bots and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Mucken Card Game for Android | Traditional Franconian Game',
  description,
  alternates: {
    canonical: absoluteUrl('/mucken'),
  },
  openGraph: {
    title: 'Mucken Card Game for Android | Traditional Franconian Game',
    description,
    url: absoluteUrl('/mucken'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mucken Card Game for Android | Traditional Franconian Game',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.mucken';

export default function MuckenPage() {
  return (
    <LegalPage eyebrow="App" title="Mucken" updatedLabel="Last updated: September 30, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Download on Google Play
        </a>
      </p>

      <h2>Mucken – fränkisches Kartenspiel!</h2>
      <p>
        Mucken bringt das traditionelle fränkische Kartenspiel auf dein Smartphone. Spiele ein taktisches Stichspiel für vier
        Spieler, bei dem Teamarbeit, Reizen, Trümpfe und die Wahl des richtigen Spiels über Sieg oder Niederlage entscheiden.
        Egal, ob du Mucken seit Jahren spielst oder das Spiel gerade erst kennenlernst – du kannst direkt am Tisch Platz nehmen
        und losspielen.
      </p>
      <p>
        Mucken wird von vier Spielern in zwei festen Teams gespielt. Gespielt wird mit einem kurzen deutschen Blatt aus 24
        Karten, sodass jeder Spieler sechs Karten erhält. In der Reizrunde entscheidet sich, welches Team das Spiel übernimmt
        und welcher Spieltyp gespielt wird.
      </p>
      <p>
        Zur Auswahl stehen Muck und Wenz sowie anspruchsvollere Varianten wie Schneidermuck, Schneiderwenz, Schwarzmuck und
        Schwarzwenz. Je höher das Gebot, desto größer das Risiko – und desto wichtiger werden gutes Kartengedächtnis, Teamspiel
        und die richtige Einschätzung der eigenen Hand.
      </p>
      <p>
        Beobachte genau, welche Karten bereits gespielt wurden, unterstütze deinen Partner und entscheide sorgfältig, wann sich
        ein höheres Gebot lohnt. Ein einziger Stich kann den Unterschied zwischen einem gewonnenen und verlorenen Spiel
        ausmachen.
      </p>
      <ul>
        <li>Traditionelles fränkisches Mucken</li>
        <li>Vier Spieler in zwei festen Teams</li>
        <li>Kurzes deutsches Blatt mit 24 Karten</li>
        <li>Muck, Wenz, Schneider und Schwarz</li>
        <li>Taktisches Reizen und Stichspiel</li>
        <li>Spiele gegen echte Spieler oder smarte Bots</li>
        <li>Schnelle Partien mit strategischem Gameplay</li>
        <li>Monatliche Ranglisten</li>
        <li>Einfache Benutzeroberfläche für Mobilgeräte</li>
      </ul>
      <p>
        Ob du ein erfahrener Mucken-Spieler bist oder das fränkische Kartenspiel zum ersten Mal entdeckst – jede Runde bringt
        neue Karten, neue Entscheidungen und neue Möglichkeiten für dein Team.
      </p>
      <p>Der Tisch wartet. Bist du bereit zum Mucken?</p>

      <h2>English</h2>
      <p>Play Mucken, the traditional Franconian card game!</p>
      <p>
        Mucken brings the traditional Franconian trick-taking game to mobile. Play a tactical four-player card game where
        teamwork, bidding, trumps and choosing the right contract determine the outcome. Whether you have played Mucken for
        years or are discovering the game for the first time, you can jump straight to the table and start playing.
      </p>
      <p>
        Mucken is played by four players in two fixed teams using a short 24-card German deck. Each player receives six cards.
        During the auction, players compete to determine which team takes the contract and which type of game will be played.
      </p>
      <p>
        Choose between Muck and Wenz or attempt more demanding contracts such as Schneidermuck, Schneiderwenz, Schwarzmuck and
        Schwarzwenz. Higher bids bring greater risk, making card tracking, teamwork and judging the strength of your hand
        increasingly important.
      </p>
      <p>
        Keep track of the cards that have already been played, support your partner and decide carefully when your hand is
        strong enough for a higher bid. A single trick can make the difference between winning and losing the game.
      </p>
      <ul>
        <li>Traditional Franconian Mucken</li>
        <li>Four players in two fixed teams</li>
        <li>Short 24-card German deck</li>
        <li>Muck, Wenz, Schneider and Schwarz contracts</li>
        <li>Tactical bidding and trick-taking gameplay</li>
        <li>Play with real players or smart bots</li>
        <li>Quick matches with strategic gameplay</li>
        <li>Monthly leaderboards</li>
        <li>Clean interface designed for mobile</li>
      </ul>
      <p>
        Whether you are an experienced Mucken player or discovering this traditional card game for the first time, every hand
        brings a new combination of cards, bidding and teamwork.
      </p>
      <p>The table is waiting. Are you ready to play?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/mucken/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/mucken/delete-account" className={linkClassName}>
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
