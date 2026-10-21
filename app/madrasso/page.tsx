import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Madrasso, the traditional Venetian card game for four players in fixed partnerships, with a 40-card Italian deck, trumps, online matches, bots, and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Madrasso Card Game for Android | Traditional Venetian Game',
  description,
  alternates: {
    canonical: absoluteUrl('/madrasso'),
  },
  openGraph: {
    title: 'Madrasso Card Game for Android | Traditional Venetian Game',
    description,
    url: absoluteUrl('/madrasso'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Madrasso Card Game for Android | Traditional Venetian Game',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.turnkit.madrasso';

export default function MadrassoPage() {
  return (
    <LegalPage eyebrow="App" title="Madrasso" updatedLabel="Last updated: October 12, 2026">
      <p>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Scarica su Google Play
        </a>
      </p>

      <p>Madrasso – il tradizionale gioco di carte veneto!</p>

      <p>
        Porta Madrasso sul tuo smartphone e siediti al tavolo con altri tre giocatori. Questo tradizionale gioco di prese si
        gioca in due coppie fisse: strategia, memoria e collaborazione con il compagno possono fare la differenza.
      </p>

      <p>
        Si usa un mazzo italiano da 40 carte, preferibilmente trevigiane. La ventunesima carta scoperta determina il seme di
        briscola e appartiene al mazziere. Segui il seme quando puoi, usa le briscole con attenzione e prova a conquistare le
        prese più preziose.
      </p>

      <p>
        Durante la prima mano, in determinate condizioni, chi ha il sette di briscola può scambiarlo con la carta scoperta.
        Ogni decisione conta: osserva le carte già giocate, pensa a quelle ancora in gioco e coordina le tue mosse con il
        compagno.
      </p>

      <p>
        Ogni mano comprende dieci prese. Accumula punti con la tua coppia e punta a raggiungere 777 punti. Una squadra può
        anche vincere facendo cappotto, cioè conquistando tutte le prese di una mano.
      </p>

      <p>
        Gioca online contro altri giocatori o allenati con i bot. Ogni partita offre nuove carte, nuove strategie e nuove
        occasioni per ribaltare il risultato.
      </p>

      <ul>
        <li>Tradizionale gioco di carte veneto</li>
        <li>Quattro giocatori in coppie fisse</li>
        <li>Mazzo italiano da 40 carte, con carte trevigiane</li>
        <li>Briscola determinata dalla carta scoperta</li>
        <li>Possibile scambio del sette di briscola</li>
        <li>Gioco di prese con strategia di squadra</li>
        <li>Partite contro giocatori o bot</li>
        <li>Classifiche mensili</li>
        <li>Comandi semplici, pensati per smartphone</li>
      </ul>

      <p>
        Conosci Madrasso dalle partite in famiglia o dagli incontri con gli amici? Riscopri questo gioco di carte veneto sul
        tuo telefono. Ogni mano porta nuove decisioni e ogni presa può cambiare la partita.
      </p>

      <p>Il tavolo è pronto. Giochiamo a Madrasso?</p>

      <h2>English</h2>

      <p>Madrasso – the traditional Venetian card game!</p>

      <p>
        Bring Madrasso to your smartphone and take a seat with three other players. This traditional trick-taking game is
        played in two fixed partnerships, where strategy, memory and teamwork can make the difference.
      </p>

      <p>
        The game uses a 40-card Italian deck, traditionally Trevigiane. The twenty-first card is turned face up to set the
        trump suit and belongs to the dealer. Follow suit when you can, manage your trumps carefully and compete for valuable
        tricks.
      </p>

      <p>
        During the first deal, the holder of the trump seven may be able to exchange it for the exposed card. Watch the cards
        already played, think about what is still in play and coordinate your moves with your partner.
      </p>

      <p>
        Each deal has ten tricks. Score points as a team and race to 777. A team can also win by making a cappotto: winning
        every trick in a deal.
      </p>

      <p>Play online against other players or practise against bots. Every match brings new cards, fresh strategies and chances to turn the game around.</p>

      <ul>
        <li>Traditional Venetian card game</li>
        <li>Four players in fixed partnerships</li>
        <li>40-card Italian deck, traditionally Trevigiane</li>
        <li>Trump suit set by the exposed card</li>
        <li>Optional trump-seven exchange</li>
        <li>Tactical team-based trick-taking</li>
        <li>Play against people or bots</li>
        <li>Monthly leaderboards</li>
        <li>Simple controls designed for smartphones</li>
      </ul>

      <p>
        Whether you remember Madrasso from family games or evenings with friends, enjoy this traditional Venetian card game
        on your phone. Every deal brings new decisions, and every trick can change the match.
      </p>

      <p>The table is ready. Ready to play Madrasso?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            Scarica su Google Play
          </a>
        </li>
        <li>
          <Link href="/madrasso/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/madrasso/delete-account" className={linkClassName}>
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
