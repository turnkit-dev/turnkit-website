import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { blogNavSections, hybridApproachPageMeta } from '@/content/blog-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

const articleDescription =
  'A hybrid turn-based multiplayer architecture that keeps the generic hard parts on the server and lets clients validate game-specific rules.';

export const metadata: Metadata = buildMetadata({
  title: 'Making a Multiplayer Turn Based Game with a Hybrid Approach',
  description: articleDescription,
  path: hybridApproachPageMeta.path,
  type: 'article',
  keywords: [
    'turn based multiplayer',
    'hybrid multiplayer architecture',
    'turn based server',
    'hand hiding',
    'client voting consensus',
  ],
});

export default function HybridApproachBlogPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Making a Multiplayer Turn Based Game with a Hybrid Approach',
    description: articleDescription,
    path: hybridApproachPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Hybrid Approach', path: hybridApproachPageMeta.path },
  ]);

  return (
    <DocsShell meta={hybridApproachPageMeta} sections={blogNavSections}>
      <JsonLd id="hybrid-approach-article-schema" data={articleSchema} />
      <JsonLd id="hybrid-approach-breadcrumb-schema" data={breadcrumbSchema} />

      <section id="top" className="relative py-6 pb-8">
        <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
        <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
          Blog Post
        </div>
      </section>

      <article className="space-y-8 text-[15px] leading-[1.8] text-muted">
        <p>
          Making a multiplayer turn based game means making client side code (Unity, Godot, or whatever engine you use) and the server side.
          This leads to remaking same systems for all turn based games, turn enforcement and for most games some hand hiding system, in addition to networking, authentication and other must have features. Also validating every function on server side, so doubling the work.
        </p>

        <p>
          Using Mirror, FishNet or similar frameworks helps reusing code, but it forces you into one game server for every game and that becomes expensive fast. Turn based server could handle thousands of games if its well optimised.
        </p>

        <p>
          Using Relay servers can speed up development, but you still implement turn enforcment, hand hiding and they leave you open to hacking and players ruining your games.
        </p>

        <h3 id="approach" className="scroll-mt-20 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
          A Hybrid Approach That Cuts the Workload
        </h3>

        <p>Here's how it works:</p>

        <ul className="ml-5 list-disc space-y-2 text-muted">
          <li>
            A specialized turn-based server handles the generic but critical parts that every game needs. Your client can simply react to clean events like "your turn started" or "turn changed".
          </li>
          <li>
            Hand hiding (and other hidden data) is solved in a generic way: you define lists and visibility rules via client-side configuration. The server automatically creates and filters those lists so each player only sees what they're allowed to see.
          </li>
          <li>Reconnecting players and other core features are handled reliably by the server.</li>
        </ul>

        <p>
          This leaves you with only the specific game rules, which some simple games might not even need on the server. For more complex rules, you can use client voting consensus:
        </p>

        <p id="consensus" className="scroll-mt-20">
          Every client validates moves in the background (players don't have to click anything). When a move arrives as an event, other clients check if it's legal based on the game rules you already wrote for the client. The server accepts the move if enough clients agree.
        </p>

        <p>
          I haven't seen any solution that supports this hybrid pattern, so I built my own. It's probably too niche for big companies, but it fits indie and solo developers really well.
        </p>

        <p id="demo" className="scroll-mt-20">
          You can try it yourself with the {' '}
          <Link href="/live-demo" className="text-accent transition hover:text-text">
            live demo.
          </Link>
        </p>

        <p>
          Or check the {' '}
          <Link href="/docs" className="text-accent transition hover:text-text">
            docs.
          </Link>
        </p>

        <p id="tradeoffs" className="scroll-mt-20">
          This aproach, like any, does have its trade offs. Multiple client can hack together and outvote an honest player, but a match with multiple hackers is rare and already ruined usually. In a 1x1 match hacker can vote fail at end of the game when he is about to lose, so some reputation tracking system would be needed in this case.
        </p>
      </article>
    </DocsShell>
  );
}
