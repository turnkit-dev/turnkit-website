import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from '@/components/mobile-menu';
import { WaitlistForm } from '@/components/waitlist-form';
import { landingContent } from '@/content/site-content';

export default function HomePage() {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-border bg-[rgba(8,12,16,0.85)] px-4 sm:px-[clamp(16px,4vw,64px)] backdrop-blur-xl">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 font-display text-[16px] font-extrabold tracking-[-0.02em] text-text sm:shrink-0 sm:gap-2.5 sm:text-[18px]">
          <Image
            src="/assets/logo.png"
            alt="TurnKit turn-based multiplayer backend logo"
            width={32}
            height={32}
            className="h-8 w-8 drop-shadow-[0_0_6px_rgba(61,214,140,0.4)]"
          />
          <span className="hidden sm:inline">
            Turn<span className="text-accent">Kit</span>
          </span>
        </Link>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          {landingContent.navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[18px] py-2 text-xs font-medium text-white transition hover:bg-[#3AADF5]"
          >
            Get Early Access
          </a>
        </div>
        <div className="sm:hidden">
          <div className="ml-2 flex shrink-0 items-center gap-2">
            <Link
              href="/#waitlist"
              className="inline-flex h-10 shrink-0 items-center rounded-[3px] bg-accent px-2.5 text-[11px] font-medium text-white transition hover:bg-[#3AADF5]"
            >
              Sign Up
            </Link>
            <MobileMenu ariaLabel="Open navigation menu" ctaHref="/#waitlist" ctaLabel="Sign Up" showDocsSection={false} />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)] pt-[60px]">
        <section className="relative py-12 pb-4">
          {/* Hero Glow Utility from CSS */}
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
          
          <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
            {landingContent.heroTag}
          </div>
          
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
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[22px] py-[11px] text-[13px] font-medium text-white transition hover:-translate-y-px hover:bg-[#3AADF5]"
            >
              Get Early Access
            </a>
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

      <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)]">
        <section className="py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Overview</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">What is TurnKit?</h2>
          <div className="mt-6 grid gap-8 text-[14px] leading-[1.8] text-muted sm:grid-cols-2">
            <p>
              TurnKit is <strong className="font-medium text-text">backend infrastructure for turn-based multiplayer games</strong>. It
              provides an authoritative relay that connects your game clients, validates turns server-side, filters what each player
              can see, and generates a cryptographically signed match result when the game ends.
            </p>
            <p>
              A typical match flow: <strong className="font-medium text-text">Matchmaking</strong> queues players and checks inventory is
              valid before the game starts. <strong className="font-medium text-text">TurnRelay</strong> enforces turns and keeps the match
              fair. <strong className="font-medium text-text">PlayerStore</strong> handles rewards, currencies, and the in-game shop after
              the match ends. <strong className="font-medium text-text">Leaderboards</strong> records the final score.
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

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
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
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="mb-1 text-[13px] text-muted">Every option is configurable per game.</p>
            <div className="mt-8 flex flex-col gap-px overflow-hidden rounded border border-border bg-border">
              {landingContent.configRows.map((row) => (
                <div key={row.key} className="grid bg-surface transition hover:bg-surface2 md:grid-cols-[200px_1fr]">
                  <div className="flex items-center border-b border-border px-6 py-4 text-xs font-medium text-accent md:border-b-0 md:border-r">
                    {row.key}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 px-6 py-4">
                    {row.values.map((value) => (
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
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Pricing</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Free to start.</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-muted">
            Concurrent players across all active matches. No credit card required to get started.
          </p>
          <div className="grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {landingContent.pricingTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`p-7 transition hover:bg-surface2 ${
                  tier.featured ? 'border-t-2 border-accent bg-[rgba(47,156,235,0.05)]' : 'bg-surface'
                }`}
              >
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted">{tier.tier}</div>
                <div className={`mb-1 font-display text-2xl font-bold tracking-[-0.02em] ${tier.free ? 'text-green' : 'text-text'}`}>
                  {tier.price}
                  {tier.suffix ? <span className="font-mono text-[13px] font-normal text-muted">{tier.suffix}</span> : null}
                </div>
                <div className="text-xs text-faint">{tier.ccu}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[3px] border border-border2 bg-surface2 px-5 py-4 text-[13px] leading-[1.6] text-muted">
            <strong className="font-medium text-text">Burst protection included.</strong> If your game spikes past its limit, TurnKit
            automatically grants 24 hours of unlimited capacity once per month.
          </div>
        </section>

        <section className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Modules</div>
          <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Use only what you need.</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-muted">
            Bring your own auth, database, or matchmaking or use TurnKit modules as they become available.
          </p>
          <div className="flex flex-col gap-px overflow-hidden rounded border border-border bg-border">
            {landingContent.moduleRows.map((moduleRow) => (
              <div
                key={moduleRow.name}
                className="grid items-center gap-6 bg-surface px-7 py-5 transition hover:bg-surface2 md:grid-cols-[180px_1fr_auto]"
              >
                <div className="font-display text-[15px] font-semibold tracking-[-0.01em] text-text">{moduleRow.name}</div>
                <div className="hidden text-[13px] text-muted md:block">{moduleRow.description}</div>
                <span className="w-fit rounded-[2px] border border-[rgba(240,164,41,0.2)] bg-[rgba(240,164,41,0.1)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-amber">
                  {moduleRow.badge}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 pl-1 text-[13px] text-muted">
            <strong className="font-medium text-text">Not locked in.</strong> Each module is optional. Use your own systems and connect
            via webhooks, or adopt TurnKit modules gradually as your game grows.
          </p>
        </section>

        <section id="waitlist" className="border-t border-border py-[clamp(32px,5vw,48px)]">
          <div className="rounded border border-border2 bg-surface p-[clamp(36px,5vw,56px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Early Access</div>
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">Follow the build.</h2>
            <p className="mb-8 text-[14px] text-muted">Get updates as TurnKit develops. No spam, just progress.</p>
            <WaitlistForm />
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[960px] px-[clamp(24px,5vw,48px)]">
        <footer className="border-t border-border py-8">
          <div className="flex flex-col gap-4 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <div>TurnKit.dev - built by an indie developer, for indie developers.</div>
            <div className="flex gap-5">
              {landingContent.footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
