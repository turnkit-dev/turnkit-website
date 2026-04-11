import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';
import { PricingGrid } from '@/components/pricing-grid';
import { CodeBlock } from '@/components/code-block';
import { landingContent } from '@/content/site-content';
import { WaitlistForm } from '@/components/waitlist-form';

const homeSections = [
  { href: '#top', label: 'Top' },
  { href: '#overview', label: 'Overview' },
  { href: '#relay', label: 'Turn Relay' },
  { href: '#simple-api', label: 'How it works in Code' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#modules', label: 'Modules' },
  { href: '#contact', label: 'Contact' },
];

const quickUnitySnippet = `// Find a match
await Relay.MatchWithAnyone("player1", ExampleConfig.Slug);

// Send a move as a Json
Relay.SendJson(moveData);
// Optionally use server lists for hand hiding
var myHand = Relay.GetMyLists(ExampleConfig.Tag.hand).First();
myHand.Move(SelectorType.ALL).To(revealedList);
myHand.Spawn("aceDiamonds");
Relay.EndMyTurn();

// Validate & vote
Relay.OnMoveMade += (message) =>
{
    bool isValid = IsMoveValid(message);
    Relay.Vote(message.moveNumber, isValid);
    // Configurable: Server can wait for consensus before the next turn (SYNC)
    // or allow moves to flow while validating in the background (ASYNC).
};

// 5. React if cheating is detected
Relay.OnVoteFailed += () => EndGame("Invalid move detected");`;

export default function HomePage() {
  const turnOrderRow = landingContent.configRows.find((row) => row.key === 'Turn order');
  const playerVotingRow = landingContent.configRows.find((row) => row.key === 'Player voting');
  const onVoteFailRow = landingContent.configRows.find((row) => row.key === 'On vote fail');

  return (
    <MarketingShell footerLayout="home">
      <div className="mx-auto flex w-full max-w-[1180px] px-0 pt-[60px]">
        <main className="min-w-0 flex-1 px-[clamp(24px,5vw,48px)]">
        <div className="mx-auto max-w-[960px]">
        <section id="top" className="relative py-12 pb-4">
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />

          <div className="animate-fade-up opacity-0 [animation-delay:0.1s]">
            <h1 className="mb-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
              {landingContent.heroTitle[0]}
              <br />
              {landingContent.heroTitle[1]}
            </h1>
          </div>
          
          <div className="animate-fade-up opacity-0 [animation-delay:0.2s]">
            <p className="mb-10 max-w-[520px] text-base leading-[1.6] text-muted">
              <strong className="font-medium text-text">{landingContent.heroHighlight}</strong>{' '}
              {landingContent.heroSubtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 animate-fade-up opacity-0 [animation-delay:0.3s]">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[22px] py-[11px] text-[13px] font-medium text-white transition hover:-translate-y-px hover:bg-[#3AADF5]"
            >
              Sign In
            </Link>
            <a
              href="https://discord.gg/SqMVU5xex3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] border border-border2 px-[22px] py-[11px] text-[13px] text-muted transition hover:border-faint hover:text-text"
            >
              Join Discord
            </a>
          </div>
          
          <div className="mt-16 animate-fade-up opacity-0 [animation-delay:0.4s]">
            <div className="flex items-center gap-4">
              <div className="max-w-[calc(100vw-80px)] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] border border-border2 bg-surface2 px-5 py-2.5 text-[13px] text-text">
                Game Client
              </div>
              <span className="hidden text-xs italic text-muted sm:inline">sends move</span>
            </div>
            <div className="py-1 pl-5 before:block before:h-7 before:w-px before:bg-[linear-gradient(to_bottom,#243040,#1A6FAA)] before:content-['']" />
            <div className="flex items-center gap-4">
              <div className="max-w-[calc(100vw-80px)] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] border border-accent2 bg-[rgba(47,156,235,0.07)] px-5 py-2.5 text-[13px] text-accent">
                TurnKit Relay
              </div>
              <span className="hidden text-xs italic text-muted sm:inline">validates turn | hides hands | enforces rules</span>
            </div>
            <div className="py-1 pl-5 before:block before:h-7 before:w-px before:bg-[linear-gradient(to_bottom,#243040,#1A6FAA)] before:content-['']" />
            <div className="flex items-center gap-4">
              <div className="max-w-[calc(100vw-80px)] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] border border-[rgba(61,214,140,0.3)] bg-[rgba(61,214,140,0.1)] px-5 py-2.5 text-[13px] text-green">
                Signed Match Result
              </div>
              <span className="hidden text-xs italic text-muted sm:inline">secure and generated automatically</span>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[960px]">
        <section id="overview" className="py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Overview</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Why TurnKit?</h2>
          <div className="mt-6 text-[14px] leading-[1.8] text-muted">
            <p>
              TurnKit is purpose-built for turn-based games: faster to ship, harder to cheat, and cheaper to run than alternatives. {' '}
            <Link
              href="/turn-based-game-server-comparison-2026"
              className="font-medium text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
            >
              See how TurnKit compares to other options.
            </Link>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {landingContent.engineTags.map((tag) => (
              <div key={tag} className="rounded-[2px] border border-border2 bg-surface2 px-[14px] py-[5px] text-xs text-muted">
                {tag}
              </div>
            ))}
          </div>
        </section>

        <section id="relay" className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Turn Relay</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
            Built for the hard parts of
            <br />
            turn-based multiplayer.
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-muted">
            The parts that take weeks to get right, TurnKit handles them out of the box.
          </p>
          <div className="grid gap-px overflow-hidden rounded border border-border bg-border md:grid-cols-2">
            {landingContent.features.map((feature) => (
              <div key={feature.title} className="bg-surface p-8 transition hover:bg-surface2">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[3px] border border-[rgba(47,156,235,0.2)] bg-[rgba(47,156,235,0.15)] text-base">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-display text-base font-semibold tracking-[-0.01em] text-text">{feature.title}</h3>
                <p className="text-[13px] leading-[1.6] text-muted">{feature.description}</p>
                {feature.title === 'Turn Enforcement' && turnOrderRow ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {turnOrderRow.values.map((value) => (
                      <span
                        key={value.label}
                        className={`rounded-[2px] border px-2.5 py-[3px] text-[11px] ${
                          value.active
                            ? 'border-[rgba(47,156,235,0.3)] bg-[rgba(47,156,235,0.15)] text-accent'
                            : 'border-border2 bg-surface2 text-muted'
                        }`}
                      >
                        {value.label}
                      </span>
                    ))}
                  </div>
                ) : null}
                {feature.title === 'Player Voting' && playerVotingRow && onVoteFailRow ? (
                  <div className="mt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {playerVotingRow.values.map((value) => (
                        <span
                          key={value.label}
                          className={`rounded-[2px] border px-2.5 py-[3px] text-[11px] ${
                            value.active
                              ? 'border-[rgba(47,156,235,0.3)] bg-[rgba(47,156,235,0.15)] text-accent'
                              : 'border-border2 bg-surface2 text-muted'
                          }`}
                        >
                          {value.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-accent">On vote fail</div>
                    <div className="flex flex-wrap items-center gap-2">
                      {onVoteFailRow.values.map((value) => (
                        <span
                          key={value.label}
                          className={`rounded-[2px] border px-2.5 py-[3px] text-[11px] ${
                            value.active
                              ? 'border-[rgba(47,156,235,0.3)] bg-[rgba(47,156,235,0.15)] text-accent'
                              : 'border-border2 bg-surface2 text-muted'
                          }`}
                        >
                          {value.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

       <section id="simple-api" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">How It Works in Code</div>
            <h2 className="mb-8 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Simple API. Match players, send moves, validate turns, and handle cheating without writing server side game logic.
            </h2>
            <CodeBlock code={quickUnitySnippet} language="csharp" />
            <p className="mt-6 text-[14px] text-muted">
              <Link
                href="/examples"
                className="font-medium text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
              >
                See full Unity examples. → Tic Tac Toe, Rock Paper Scissors games in under 100 lines.
              </Link>
            </p>
          </section>

        <section id="pricing" className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Pricing</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Free to start.</h2>
          <p className="mb-12 text-[15px] text-muted">
            No credit card needed to start. First 20 concurrent players are free for all modules. Relay pricing:
          </p>
          <PricingGrid tiers={landingContent.pricing.relay} showFullPricingLink />
          <div className="mt-5 rounded-[3px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
            <strong className="font-medium text-text">Burst protection included.</strong> If your game spikes past its limit, TurnKit
            automatically grants 24 hours of unlimited capacity once per month.
          </div>
          <div className="mt-8 rounded-[3px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
            <strong className="font-medium text-text"></strong>{' '}
            <Link
              href="/turn-based-game-server-comparison-2026#pricing-comparison"
              className="font-medium text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
            >
              See how pricing compares to other options.
            </Link>
          </div>
        </section>

        <section id="modules" className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Modules</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Use only what you need.</h2>
          <p className="mb-12 text-[15px] text-muted">
            Start with Relay or Leaderboards today, then add more TurnKit modules as your game grows.
          </p>
          <div className="flex flex-col gap-px overflow-hidden rounded border border-border bg-border">
            {landingContent.moduleRows.map((moduleRow) => (
              <div
                key={moduleRow.name}
                className="grid items-center gap-6 bg-surface px-7 py-5 transition hover:bg-surface2 md:grid-cols-[180px_1fr_auto]"
              >
                <div className="font-display text-[15px] font-semibold tracking-[-0.01em] text-text">{moduleRow.name}</div>
                <div className="hidden text-[13px] text-muted md:block">{moduleRow.description}</div>
                <span
                  className={`w-fit rounded-[2px] border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] ${
                    moduleRow.status === 'available'
                      ? 'border-[rgba(61,214,140,0.25)] bg-[rgba(61,214,140,0.12)] text-green'
                      : 'border-[rgba(240,164,41,0.2)] bg-[rgba(240,164,41,0.1)] text-amber'
                  }`}
                >
                  {moduleRow.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 pl-1 text-[13px] text-muted">
            <strong className="font-medium text-text">Not locked in.</strong> Each module is optional. Use your own systems and connect
            via webhooks, or adopt TurnKit modules gradually as your game grows.
          </p>
        </section>

        <section id="contact" className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Contact</div>
          
          <p className="max-w-[800px] text-[15px] leading-[1.8] text-muted">
            TurnKit is operated by <span className="text-text font-medium">Nenad Nikolic</span>. 
            For support, billing, or legal requests, email: 
            <a href="mailto:support@turnkit.dev" className="mx-1.5 text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.2em] transition hover:text-[#b2ddff]">
              support@turnkit.dev
            </a> 
            <span className="mx-2 text-border">•</span> 
            Mail: <span className="text-text">Svetosavska 107v/17, Kikinda, Serbia</span>
          </p>
        </section>
      </div>
      </main>
      <aside className="hidden w-[220px] shrink-0 xl:block">
        <div
          className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
          style={{ right: 'max(0px, calc((100vw - 1180px) / 2))' }}
        >
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
          <div className="flex flex-col gap-2">
            {homeSections.map((section) => (
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


