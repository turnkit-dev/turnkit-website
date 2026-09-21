import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Play Marjapussi, the classic Finnish card game for Android with trick-taking, trump suits, marriages, real players or smart bots, and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Marjapussi - Classic Finnish Card Game for Android',
  description,
  alternates: {
    canonical: absoluteUrl('/marjapussi'),
  },
  openGraph: {
    title: 'Marjapussi - Classic Finnish Card Game for Android',
    description,
    url: absoluteUrl('/marjapussi'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Marjapussi - Classic Finnish Card Game for Android',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MarjapussiPage() {
  return (
    <LegalPage eyebrow="App" title="Marjapussi" updatedLabel="Last updated: September 21, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.turnkit.marjapussi"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Download on Google Play
        </a>
      </p>

      <p>Marjapussi – klassinen suomalainen korttipeli!</p>

      <p>
        Marjapussi tuo perinteisen suomalaisen korttipelin mobiiliin. Pelaa taktista tikkipeliä, jossa yhteistyö parin kanssa,
        valtit ja avioliittojen muodostaminen ratkaisevat pelin. Olitpa pelannut Marjapussia vuosia tai vasta opettelemassa
        sääntöjä, voit hypätä suoraan pöytään ja aloittaa pelin.
      </p>

      <p>
        Marjapussissa neljä pelaajaa pelaa kahden hengen joukkueissa. Kerää tikkejä yhdessä parisi kanssa ja muodosta kuninkaan
        ja kuningattaren avioliittoja saadaksesi pisteitä ja määrittääksesi valttimaan.
      </p>

      <p>
        Jokainen jako vaatii sekä hyvää korttipeliä että yhteistyötä. Seuraa pelattuja kortteja, auta pariasi ja päätä tarkkaan,
        milloin kannattaa muodostaa avioliitto.
      </p>

      <ul>
        <li>Klassinen suomalainen Marjapussi</li>
        <li>Neljä pelaajaa ja kahden hengen joukkueet</li>
        <li>Tikit, valtit ja avioliitot</li>
        <li>Pelaa oikeiden pelaajien tai älykkäiden bottien kanssa</li>
        <li>Nopeat pelit ja taktinen pelattavuus</li>
        <li>Kuukausittaiset tulostaulukot</li>
        <li>Selkeä ja mobiilille suunniteltu käyttöliittymä</li>
      </ul>

      <p>
        Olitpa kokenut Marjapussi-pelaaja tai kokeilet peliä ensimmäistä kertaa, jokainen jako tarjoaa uuden yhdistelmän
        korttionnea, yhteistyötä ja taktiikkaa.
      </p>

      <p>Pöytä odottaa. Oletko valmis pelaamaan?</p>

      <h2>English</h2>

      <p>Play Marjapussi, the classic Finnish card game!</p>

      <p>
        Marjapussi brings the traditional Finnish card game to mobile. Play the tactical trick-taking game where teamwork,
        trump suits and forming marriages are key to winning. Whether you have played Marjapussi for years or are learning the
        rules for the first time, you can jump straight to the table and start playing.
      </p>

      <p>
        Marjapussi is played by four players in two teams. Win tricks together with your partner and form marriages with kings
        and queens to score points and establish trump suits.
      </p>

      <p>
        Every deal requires both careful card play and good teamwork. Keep track of the cards that have been played, support your
        partner and choose the right moment to form a marriage.
      </p>

      <ul>
        <li>Classic Finnish Marjapussi</li>
        <li>Four players in two teams</li>
        <li>Tricks, trump suits and marriages</li>
        <li>Play with real players or smart bots</li>
        <li>Quick matches with tactical gameplay</li>
        <li>Monthly leaderboards</li>
        <li>Clean interface designed for mobile</li>
      </ul>

      <p>
        Whether you are an experienced Marjapussi player or discovering the game for the first time, every deal brings a new
        combination of luck, teamwork and strategy.
      </p>

      <p>The table is waiting. Are you ready to play?</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.turnkit.marjapussi"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/marjapussi/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/marjapussi/delete-account" className={linkClassName}>
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
