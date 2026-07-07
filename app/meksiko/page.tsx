import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Meksiko is a fun Balkan 3 player card game with bidding, trump cards, real players or bots, and monthly leaderboards.';

export const metadata: Metadata = {
  title: 'Meksiko',
  description,
  alternates: {
    canonical: absoluteUrl('/meksiko'),
  },
  openGraph: {
    title: 'Meksiko',
    description,
    url: absoluteUrl('/meksiko'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meksiko',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoPage() {
  return (
    <LegalPage eyebrow="App" title="Meksiko" updatedLabel="Last updated: July 7, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.turnkit.meksiko"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Download on Google Play
        </a>
      </p>

      <p>Igraj Meksiko, pravu balkansku kartašku igru!</p>

      <p>
        Konačno na tvom telefonu: klasični Meksiko koji svi volimo. Ona ista napeta igra za troje, sa licitacijom, adutom i
        pravim balkanskim duhom. Bilo da čekaš bus, odmaraš posle posla ili se družiš sa ekipom, samo klikneš
        &quot;Igraj&quot; i već si za stolom.
      </p>

      <p>
        Svaka partija nosi ono poznato uzbuđenje. Licitiraš koliko će ruku da uzmeš, biraš adut, a onda kreće prava borba.
        Ponekad se udružuješ sa ostalima da srušite deklaranta, a ponekad se boriš sam. Ko ne ispuni licitaciju ide u minus.
        Ko igra pametno, penje se na rang listu.
      </p>

      <h2>Zašto će ti se svideti?</h2>
      <ul>
        <li>Brze partije i prava strategija</li>
        <li>Igraj odmah sa pravim igračima ili pametnim botovima</li>
        <li>Mesečne rang liste</li>
        <li>Jednostavno, lepo i optimizovano za telefon</li>
      </ul>

      <p>
        Bilo da si dugogodišnji igrač ili tek učiš, Meksiko uvek donosi ono pravo osećanje: malo sreće, puno taktike i mnogo
        emocija kad licitacija uspe ili potpuno propadne.
      </p>

      <p>Dođi, čeka te sto. Igraj Meksiko i oseti zašto je ova igra toliko voljena kod nas.</p>

      <p>English:</p>

      <p>Play Meksiko, the real Balkan card game!</p>

      <p>
        The classic Meksiko card game is finally on your phone. Enjoy the same tense 3-player trick-taking game with bidding,
        trump cards and real Balkan spirit. Whether you are waiting for the bus, relaxing after work or playing with friends,
        just tap &quot;Play&quot; and take your seat at the table.
      </p>

      <p>
        Every round brings that familiar pressure. Bid how many tricks you can win, choose the trump suit and enter the
        battle. Sometimes you work with the others to beat the declarer. Sometimes you fight alone. Miss your bid and you lose
        points. Play smart and climb the leaderboard.
      </p>

      <h2>Why you&apos;ll love it</h2>
      <ul>
        <li>Fast rounds with real strategy</li>
        <li>Play instantly with real players or smart bots</li>
        <li>Monthly leaderboards</li>
        <li>Clean, smooth and made for mobile</li>
      </ul>

      <p>
        Whether you already know Meksiko or you are learning it for the first time, every match brings the same mix of luck,
        tactics and emotion.
      </p>
      <p>The table is waiting. Play Meksiko and feel why this card game is so loved in our region.</p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.turnkit.meksiko"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link href="/meksiko/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/meksiko/delete-account" className={linkClassName}>
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
