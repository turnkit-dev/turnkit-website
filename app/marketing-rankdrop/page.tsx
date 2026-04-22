import Image from 'next/image';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marketing RankDrop',
  description: 'RankDrop in 60 seconds.',
  path: '/marketing-rankdrop',
  keywords: ['RankDrop', 'leaderboards in 60 seconds', 'TurnKit'],
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

        <div className="relative flex flex-1 items-center px-6 py-14 sm:px-10 lg:px-14">
          <div className="relative max-w-[1000px]">
            <h1 className="font-display text-[clamp(50px,9vw,90px)] font-extrabold leading-[0.9] tracking-[-0.05em] text-text">
              RankDrop
            </h1>
            <p className="mt-8 max-w-[50rem] text-[48px] font-medium协议 leading-[1.2] text-muted">
              Self hosted Leaderboards in 60 seconds. No running fees.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
