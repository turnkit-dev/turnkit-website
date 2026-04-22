import Image from 'next/image';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marketing TurnKit',
  description: 'TurnKit in 60 seconds.',
  path: '/marketing-turnkit',
  keywords: ['TurnKit', 'leaderboards in 60 seconds', 'RankDrop'],
});

export default function TestPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <div className="relative flex min-h-[44vh] flex-1 items-center justify-center border-b border-border px-6 py-14 lg:min-h-screen lg:border-b-0">
          <div className="relative w-full max-w-[900px]">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="RankDrop logo"
                width={1000}
                height={1000}
                priority
                className="h-auto w-[min(90vw,1000px)]"
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 items-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="relative w-full">
            <h1 className="font-display text-[clamp(60px,10vw,110px)] font-black leading-[0.85] tracking-[-0.06em] text-text">
              Turn Relay & Leaderboards.
            </h1>
            <p className="mt-10 max-w-[45rem] text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-tight text-muted">
              <span className="block mt-4 opacity-90">
                Server enforced turns, hand hiding, client voting consensus. 
              </span>
              <span className="block mt-4 text-text">
                Simple API, your code stays Unity only.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



