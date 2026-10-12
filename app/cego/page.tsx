import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Cego, the traditional Black Forest card game, with tactical bidding, 22 permanent trumps, smart bots and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Cego Card Game for Android | Traditional Black Forest Game',
  description,
  alternates: {
    canonical: absoluteUrl('/cego'),
  },
  openGraph: {
    title: 'Cego Card Game for Android | Traditional Black Forest Game',
    description,
    url: absoluteUrl('/cego'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cego Card Game for Android | Traditional Black Forest Game',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.cego';

export default function CegoPage() {
  return (
    <LegalPage eyebrow="App" title="Cego" updatedLabel="Last updated: October 12, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Download on Google Play
        </a>
      </p>

      <h2>Cego – das traditionelle Schwarzwälder Kartenspiel!</h2>
      <p>
        Cego bringt das traditionelle Kartenspiel aus Baden und dem Schwarzwald auf dein Smartphone. Spiele ein taktisches
        Stichspiel, bei dem Reizen, Trümpfe und kluge Entscheidungen über Sieg oder Niederlage entscheiden. Ob du Cego schon
        lange kennst oder das Spiel zum ersten Mal entdeckst: Nimm am Tisch Platz und spiele mit.
      </p>
      <p>
        Gespielt wird mit einem besonderen Cego-Blatt aus 54 Karten. Die 22 Trümpfe, auch Trocke genannt, bilden das Herz des
        Spiels. Wer seine Karten geschickt einsetzt, wertvolle Stiche gewinnt und die gespielten Trümpfe im Blick behält, hat
        die besten Chancen.
      </p>
      <p>
        In der Reizrunde entscheidet sich, wer das Spiel übernimmt. Beim Cego spielt der Blinde – die verdeckten Karten auf
        dem Tisch – eine entscheidende Rolle. Schätze deine Hand richtig ein und entscheide, wie viel Risiko du eingehen
        möchtest.
      </p>
      <p>
        Cego ist auch unter dem Namen Zego bekannt und gehört zur badischen Tarock-Tradition. Unterschiedliche Spielarten und
        Ansagen sorgen für abwechslungsreiche Runden und neue taktische Herausforderungen.
      </p>
      <p>
        Behalte die gespielten Karten im Blick, spare deine starken Trümpfe für den richtigen Moment und passe deine Strategie
        an den Spielverlauf an. Ein guter Plan hilft – doch manchmal entscheidet ein einziger Stich.
      </p>
      <ul>
        <li>Traditionelles Cego aus Baden und dem Schwarzwald</li>
        <li>Besonderes Cego-Blatt mit 54 Karten</li>
        <li>22 Trümpfe, auch Trocke genannt</li>
        <li>Reizen und taktisches Stichspiel</li>
        <li>Der Blinde als zentrales Spielelement</li>
        <li>Abwechslungsreiche Entscheidungen in jeder Runde</li>
        <li>Spiele gegen echte Spieler oder clevere Bots</li>
        <li>Monatliche Ranglisten</li>
        <li>Einfache Bedienung auf deinem Smartphone</li>
      </ul>
      <p>
        Kennst du Cego vom Stammtisch, aus der Familie oder von einem Kartenabend mit Freunden? Genieße das traditionsreiche
        Schwarzwälder Kartenspiel auf deinem Handy. Jede Runde bringt neue Karten, neue Entscheidungen und neue Chancen.
      </p>
      <p>Der Tisch ist bereit. Lust auf eine Runde Cego?</p>

      <h2>English</h2>
      <p>Cego – the traditional Black Forest card game!</p>
      <p>
        Cego brings the traditional card game from Baden and Germany’s Black Forest to your smartphone. Play a tactical
        trick-taking game where bidding, trumps and smart decisions determine the outcome. Whether you already know Cego or
        are discovering it for the first time, take your seat and join the game.
      </p>
      <p>
        The game uses a special 54-card Cego deck. Its 22 permanent trumps, traditionally called Trocke, are at the heart of
        the action. Play your cards carefully, capture valuable tricks and keep track of the trumps already played.
      </p>
      <p>
        Bidding determines who takes on the game. In a Cego contract, the face-down cards on the table, known as the Blinde or
        blind, play a central role. Judge your hand carefully and decide how much risk you are willing to take.
      </p>
      <p>
        Also known as Zego, Cego belongs to Baden’s Tarock tradition. Its different contracts and bidding choices bring variety
        and fresh tactical challenges to the table.
      </p>
      <p>
        Follow the cards already played, save your strongest trumps for the right moment and adapt your strategy as the hand
        unfolds. A good plan helps, but a single trick can change the result.
      </p>
      <ul>
        <li>Traditional Cego from Baden and the Black Forest</li>
        <li>Special 54-card Cego deck</li>
        <li>22 permanent trumps, known as Trocke</li>
        <li>Bidding and tactical trick-taking gameplay</li>
        <li>The blind as a central part of the game</li>
        <li>Meaningful decisions in every hand</li>
        <li>Play with real players or smart bots</li>
        <li>Monthly leaderboards</li>
        <li>Simple controls designed for mobile</li>
      </ul>
      <p>
        Whether you know Cego from family gatherings, local card clubs or evenings with friends, enjoy this traditional German
        card game on your phone. Every hand brings new cards, new decisions and new opportunities.
      </p>
      <p>The table is waiting. Ready to play Cego?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/cego/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/cego/delete-account" className={linkClassName}>
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
