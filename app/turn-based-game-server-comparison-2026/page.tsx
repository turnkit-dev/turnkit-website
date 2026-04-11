import type { Metadata } from 'next';
import Script from 'next/script';
import { DocsSidebar } from '@/components/docs-shell';
import { MarketingShell } from '@/components/marketing-shell';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

const sections = [
  { href: '#top', label: 'Top' },
  { href: '#tldr', label: 'TL;DR' },
  { href: '#options', label: 'Options' },
  { href: '#feature-comparison', label: 'Feature Comparison' },
  { href: '#pricing-comparison', label: 'Pricing Comparison' },
  { href: '#limitations', label: 'Limitations' }
];

const comparisonDescription =
  'Honest 2026 comparison of turn-based game server options: custom backend, per-match servers, basic relays, and TurnKit authoritative relay pricing.';

const featureRows = [
  {
    feature: 'Development Speed',
    customBackend: 'Very slow',
    perMatchServers: 'Slow',
    basicRelays: 'Fast',
    turnKit: 'Fastest, hard parts out of box',
  },
  {
    feature: 'Turn Enforcement',
    customBackend: 'Yes, build it yourself',
    perMatchServers: 'Yes, build it yourself',
    basicRelays: 'No',
    turnKit: 'Yes, server-side',
  },
  {
    feature: 'Hidden Data / Hand Hiding',
    customBackend: 'Yes, build it yourself',
    perMatchServers: 'Yes, build it yourself',
    basicRelays: 'No',
    turnKit: 'Yes, automatic server filtering',
  },
  {
    feature: 'Signed Match Results',
    customBackend: 'Build yourself',
    perMatchServers: 'Build yourself',
    basicRelays: 'No',
    turnKit: 'Automatic and cryptographic',
  },
  {
    feature: 'Cheating Protection',
    customBackend: 'High',
    perMatchServers: 'High',
    basicRelays: 'None',
    turnKit: 'High',
  },
  {
    feature: 'Pricing for Turn-Based Use',
    customBackend: 'High effort',
    perMatchServers: 'Expensive at scale',
    basicRelays: 'Cheap at low CCU, expensive at high and risky',
    turnKit: 'Cheapest predictable tiers',
  }
];

const pricingRows = [
  { ccu: '20', unityRelay: '$0.00', photon: '$0.00', beamable: '$125.00', turnKit: '$0.00', lowest: ['unityRelay', 'photon', 'turnKit'] },
  { ccu: '40', unityRelay: '$0.00', photon: '$0.00', beamable: '$595.00', turnKit: '$4.99', lowest: ['unityRelay', 'photon'] },
  { ccu: '80', unityRelay: '$4.80', photon: '$0.00', beamable: '$595.00', turnKit: '$9.99', lowest: ['photon'] },
  { ccu: '160', unityRelay: '$17.60', photon: '$95.00', beamable: '$595.00', turnKit: '$19.99', lowest: ['unityRelay'] },
  { ccu: '320', unityRelay: '$45.25', photon: '$95.00', beamable: '$595.00', turnKit: '$39.99', lowest: ['turnKit'] },
  { ccu: '640', unityRelay: '$112.00', photon: '$185.00', beamable: '$595.00', turnKit: '$79.99', lowest: ['turnKit'] },
];

export const metadata: Metadata = buildMetadata({
  title: 'Turn-Based Game Server Comparison 2026 - Authoritative Relay vs Custom vs Per-Match',
  description: comparisonDescription,
  path: '/turn-based-game-server-comparison-2026',
  type: 'article',
  keywords: [
    'turn-based game server comparison',
    'authoritative relay',
    'Unity Relay pricing comparison',
    'Photon turn-based server comparison',
    'Beamable pricing comparison',
  ],
});

export default function TurnBasedGameServerComparisonPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'Best Turn-Based Game Server in 2026: Honest Comparison',
    description: comparisonDescription,
    path: '/turn-based-game-server-comparison-2026',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Turn-Based Server Comparison 2026', path: '/turn-based-game-server-comparison-2026' },
  ]);

  return (
    <MarketingShell footerLayout="docs">
      <Script
        id="comparison-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="comparison-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto flex w-full max-w-[1400px] px-0 pt-[60px]">
        <aside className="hidden w-[260px] shrink-0 md:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[260px] overflow-y-auto border-r border-border bg-bg px-6 py-8"
            style={{ left: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <DocsSidebar currentPath="/turn-based-game-server-comparison-2026" />
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 md:max-w-[900px] md:px-[clamp(24px,5vw,64px)] md:py-12">
          <section id="top" className="relative py-12 pb-8">
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
            <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
              Comparison 2026
            </div>
            <h1 className="mb-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
              Best Turn-Based Game Server in 2026:
              <br />
              Honest Comparison
            </h1>
          </section>

          <section id="tldr" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="rounded border border-[rgba(61,214,140,0.24)] bg-[rgba(61,214,140,0.08)] p-6">
              <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
                TurnKit Relay is winner for most indie turn-based games.
              </h2>
              <p className="text-[15px] leading-[1.8] text-text">
                For turn-based multiplayer card games, strategy games, and board-style games, <strong className="font-medium">TurnKit wins on speed of development, cheating protection, and cost.</strong>
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded border border-border bg-border">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-surface2">
                    <tr>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Feature</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Custom Backend</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Per-Match Servers</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Basic Relays</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">TurnKit (2026)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-surface' : 'bg-[#0d1319]'}>
                        <td className="px-4 py-4 text-[13px] font-medium text-text">{row.feature}</td>
                        <td className="px-4 py-4 text-[13px] text-muted">{row.customBackend}</td>
                        <td className="px-4 py-4 text-[13px] text-muted">{row.perMatchServers}</td>
                        <td className="px-4 py-4 text-[13px] text-muted">{row.basicRelays}</td>
                        <td className="px-4 py-4 text-[13px] font-medium text-accent">{row.turnKit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="options" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">The Usual Three Painful Options</div>
            <div className="grid gap-px overflow-hidden rounded border border-border bg-border">
              <div className="bg-surface p-6">
                <h2 className="mb-2 font-display text-[20px] font-semibold tracking-[-0.02em] text-text">Build your own custom backend</h2>
                <p className="text-[14px] leading-[1.8] text-muted">
                  Full control, but also months of work for turn validation, hidden data handling, reconnect logic, signed
                  results, and all the edge cases that appear once real players start exploiting your flow. Not to mention the ongoing burden of DevOps and infrastructure scaling.
                </p>
              </div>
              <div className="bg-[#0d1319] p-6">
                <h2 className="mb-2 font-display text-[20px] font-semibold tracking-[-0.02em] text-text">Per-match game servers</h2>
                <p className="text-[14px] leading-[1.8] text-muted">
                    Frameworks like Mirror or Netcode for GameObjects require a full headless game instance for every single match. This leads to massive overhead, high hosting bills, and complex orchestration—especially for games that don't need real-time physics. 
                </p>
              </div>
              <div className="bg-surface p-6">
                <h2 className="mb-2 font-display text-[20px] font-semibold tracking-[-0.02em] text-text">Basic relays</h2>
                <p className="text-[14px] leading-[1.8] text-muted">
                  Standard relays (Unity, Photon) offer no authority. One player acts as the host, leaving your game state vulnerable to memory injection, speed hacks, and "god mode" exploits.
                </p>
              </div>
            </div>
          </section>

          <section id="feature-comparison" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Feature Comparison</div>
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Where TurnKit is meaningfully different.
            </h2>
            <p className="max-w-[700px] text-[15px] leading-[1.8] text-muted">
              TurnKit is purpose-built as an authoritative relay for turn-based multiplayer. It sits between a raw relay and a full game
              server, keeping the operational model lightweight while still enforcing the parts that matter.
            </p>
          </section>

          <section id="pricing-comparison" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Pricing Comparison</div>
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              A card game example with pricing comparisons
            </h2>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">TL;DR</div>
            <div className="rounded border border-[rgba(61,214,140,0.24)] bg-[rgba(61,214,140,0.08)] p-6">
              <p className="text-[15px] leading-[1.8] text-text">
                <strong className="font-medium">TurnKit is cheapest authorative option at any CCU and even cheaper than non authorative ones at 320+ CCU.</strong>
              </p>
            </div>
            <div className="overflow-hidden rounded border border-border bg-border">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-surface2">
                    <tr>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">CCU</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">Unity Relay</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">Photon Pun</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">Beamable</th>
                      <th className="px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">TurnKit Relay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row, index) => (
                      <tr key={row.ccu} className={index % 2 === 0 ? 'bg-surface' : 'bg-[#0d1319]'}>
                        <td className="px-4 py-4 text-[13px] font-medium text-text">{row.ccu}</td>
                        <PriceCell value={row.unityRelay} highlight={row.lowest.includes('unityRelay')} />
                        <PriceCell value={row.photon} highlight={row.lowest.includes('photon')} />
                        <PriceCell value={row.beamable} highlight={row.lowest.includes('beamable')} />
                        <PriceCell value={row.turnKit} highlight={row.lowest.includes('turnKit')} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-5 text-[13px] leading-[1.7] text-muted">
              Assumptions used for this benchmark: Match data 0.15 MB, 4 matches per day, 
              18 MB / MAU, and 0.54 GB / CCU. Pricing as of [April 10, 2026] based on publicly available data. Vendor pricing can change, 
              free tiers can shift, and real production cost varies with payload size, 
              player behavior, and match frequency.
            </p>
          </section>

          <section id="limitations" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Limitations and Flaws</div>
            <div className="grid gap-5">
              <div className="rounded-[3px] border border-[rgba(240,164,41,0.24)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.8] text-text">
                TurnKit is meant for turn-based games only.
              </div>
              <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.8] text-text">
                In 1v1 games, client voting allows possible vote grief: a losing player can falsely vote fail. A reputation system is planned to reduce this abuse.
              </div>
              <div className="rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[14px] leading-[1.8] text-text">
                Similar abuse is possible in 3+ player games if multiple players collude.
              </div>
              <div className="rounded-[3px] border border-[rgba(255,107,107,0.22)] bg-[rgba(255,107,107,0.08)] px-5 py-4 text-[14px] leading-[1.8] text-text">
                Because of these trust limits, TurnKit is <strong className="font-medium">not recommended for games involving real money</strong>.
              </div>
            </div>
          </section>
        </main>
        <aside className="hidden w-[220px] shrink-0 xl:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
            style={{ right: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <a key={section.href} href={section.href} className="border-l-2 border-transparent pl-3 text-xs text-muted transition hover:text-text">
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </MarketingShell>
  );
}

function PriceCell({ value, highlight, accent = false }: { value: string; highlight?: boolean; accent?: boolean }) {
  return (
    <td
      className={`px-4 py-4 text-[13px] ${
        highlight
          ? 'border-t-2 border-accent bg-[rgba(47,156,235,0.05)] text-text'
          : accent
            ? 'text-accent'
            : 'text-muted'
      }`}
    >
      {value}
    </td>
  );
}
