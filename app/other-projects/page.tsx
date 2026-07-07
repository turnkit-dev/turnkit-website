import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';
import { absoluteUrl } from '@/lib/seo';

const otherProjectsDescription =
  'Explore other projects by TurnKit: Mexico card game, RankDrop leaderboards, Hands Free Cooking, Hands Free Notes, Hands Free Appointments, and Zumba Space Marble Blast, plus collaboration and freelance availability.';

export const metadata: Metadata = {
  title: 'Other Projects - TurnKit',
  description: otherProjectsDescription,
  alternates: {
    canonical: absoluteUrl('/other-projects'),
  },
  openGraph: {
    title: 'Other Projects - TurnKit',
    description: otherProjectsDescription,
    url: absoluteUrl('/other-projects'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Other Projects - TurnKit',
    description: otherProjectsDescription,
  },
};

export default function OtherProjectsPage() {
  return (
    <MarketingShell>
      <main className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[96px] pb-12">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Other Projects</div>
        <h1 className="mb-8 font-display text-[clamp(30px,5vw,46px)] font-bold leading-[1.12] tracking-[-0.03em] text-text">
          Other Projects
        </h1>

        <div className="flex flex-col gap-5">
          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Mexico card game</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Igraj Meksiko, pravu balkansku kartašku igru!
            </p>
            <div className="mt-4 max-w-[780px] space-y-4 text-[15px] leading-[1.8] text-muted">
              <p>English below</p>
              <p>
                Konacno na tvom telefonu: klasicni Meksiko koji svi volimo. Ona ista napeta igra za troje, sa licitacijom,
                adutom i pravim balkanskim duhom. Bilo da cekas bus, odmaras posle posla ili se druzis sa ekipom, samo kliknes
                &quot;Igraj&quot; i vec si za stolom.
              </p>
              <p>
                Svaka partija nosi ono poznato uzbudjenje. Licitiras koliko ce ruku da uzmes, biras adut, a onda krece prava
                borba. Ponekad se udruzujes sa ostalima da srusite deklaranta, a ponekad se boris sam. Ko ne ispuni licitaciju
                ide u minus. Ko igra pametno, penje se na rang listu.
              </p>
              <p>Zasto ce ti se svideti?</p>
              <ul className="list-disc pl-6">
                <li>Brze partije i prava strategija</li>
                <li>Igraj odmah sa pravim igracima ili pametnim botovima</li>
                <li>Mesecne rang liste</li>
                <li>Jednostavno, lepo i optimizovano za telefon</li>
              </ul>
              <p>
                Bilo da si dugogodisnji igrac ili tek ucis, Meksiko uvek donosi ono pravo osecanje: malo srece, puno taktike i
                mnogo emocija kad licitacija uspe ili potpuno propadne.
              </p>
              <p>Dodji, ceka te sto. Igraj Meksiko i oseti zasto je ova igra toliko voljena kod nas.</p>
              <p>English:</p>
              <p>
                Play Meksiko, the real Balkan card game!
              </p>
              <p>
                The classic Meksiko card game is finally on your phone. Enjoy the same tense 3-player trick-taking game with
                bidding, trump cards and real Balkan spirit. Whether you are waiting for the bus, relaxing after work or
                playing with friends, just tap &quot;Play&quot; and take your seat at the table.
              </p>
              <p>
                Every round brings that familiar pressure. Bid how many tricks you can win, choose the trump suit and enter the
                battle. Sometimes you work with the others to beat the declarer. Sometimes you fight alone. Miss your bid and
                you lose points. Play smart and climb the leaderboard.
              </p>
              <p>Why you&apos;ll love it:</p>
              <ul className="list-disc pl-6">
                <li>Fast rounds with real strategy</li>
                <li>Play instantly with real players or smart bots</li>
                <li>Monthly leaderboards</li>
                <li>Clean, smooth and made for mobile</li>
              </ul>
              <p>
                Whether you already know Meksiko or you are learning it for the first time, every match brings the same mix of
                luck, tactics and emotion.
              </p>
              <p>The table is waiting. Play Meksiko and feel why this card game is so loved in our region.</p>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Hands Free Cooking Offline</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Offline hands-free recipe app for cooking with messy or dirty hands, with voice commands, starter recipes, and URL import.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/handsfree-cooking"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.handsfree.cooking"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">RankDrop</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Leaderboards in 60 seconds. No monthly fees. Production ready. You own your data. Self-hosted, configured from the
              Editor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/rankdrop"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://assetstore.unity.com/packages/tools/integration/rankdrop-leaderboards-in-60-seconds-366688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download for Unity
              </a>
              <a
                href="https://brainzy.itch.io/godot-rankdrop-leaderboards-in-60-seconds-no-monthly-costs-and-own-your-data"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download for Godot
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Hands Free Notes</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Offline speech to text. Speak to notes. Fully private, works in background.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/handsfree-notes"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.handsfree.notes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Hands Free Voice Tube</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">Voice control YouTube videos.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/handsfree-tube"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.handsfree.tube"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Hands Free Appointments</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Voice-first calendar app. Speak appointments naturally and sync directly with Google Calendar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/handsfree-appointments"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.handsfree.appointments"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Zumba Space Marble Blast 2024</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Marble shooter set in space. Match 3 same-colored marbles to pop them before they reach the black hole.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/zumba-space-marble-blast"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                Read More
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.zumbaspaceadventure.zumbaspacemarble"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[4px] border border-border bg-surface p-6">
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-text">Interested in working together?</h2>
            <p className="max-w-[780px] text-[15px] leading-[1.8] text-muted">
              Available for collaboration and freelance work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.upwork.com/freelancers/~01d45ddb224d7b2b46?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[3px] bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              >
                View my Upwork profile
              </a>
              <a
                href="mailto:support@turnkit.dev"
                className="inline-flex items-center rounded-[3px] border border-border2 px-[18px] py-[10px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Email me
              </a>
            </div>
          </section>
        </div>
      </main>
    </MarketingShell>
  );
}
