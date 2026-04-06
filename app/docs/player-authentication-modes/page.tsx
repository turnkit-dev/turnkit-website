import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { playerAuthenticationModesPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'Player Authentication Modes - TurnKit Docs',
  description: playerAuthenticationModesPageMeta.description,
  alternates: {
    canonical: playerAuthenticationModesPageMeta.path,
  },
  openGraph: {
    title: 'Player Authentication Modes - TurnKit Docs',
    description: playerAuthenticationModesPageMeta.description,
    url: `https://turnkit.dev${playerAuthenticationModesPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Player Authentication Modes - TurnKit Docs',
    description: playerAuthenticationModesPageMeta.description,
  },
};

const comparisonRows = [
  {
    mode: 'OPEN',
    bestFor: 'Quick testing and prototypes',
    requirements: 'Nothing',
    verification: 'None',
  },
  {
    mode: 'TURNKIT_AUTH',
    bestFor: 'Simple email login without building a backend',
    requirements: 'SMTP settings (host, port, username, password, from address)',
    verification: 'Email + OTP -> player JWT',
  },
  {
    mode: 'SIGNED',
    bestFor: 'Games with existing player authentication',
    requirements: 'Your own backend + secret key',
    verification: 'Signed exchange -> player JWT',
  },
];

export default function PlayerAuthenticationModesPage() {
  return (
    <DocsShell meta={playerAuthenticationModesPageMeta}>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit supports three ways for players to authenticate. <strong className="text-text">OPEN</strong> is the default and fastest
        option.
      </p>

      <SectionTitle id="quick-comparison">Quick Comparison</SectionTitle>
      <div className="mb-10 overflow-x-auto rounded-[6px] border border-border bg-surface">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface2">
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Mode</th>
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Best for</th>
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">What you need</th>
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Player verification</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.mode} className="border-b border-border last:border-b-0">
                <td className="px-4 py-4 text-[13px] font-semibold text-text">{row.mode}</td>
                <td className="px-4 py-4 text-[13px] leading-[1.6] text-muted">{row.bestFor}</td>
                <td className="px-4 py-4 text-[13px] leading-[1.6] text-muted">{row.requirements}</td>
                <td className="px-4 py-4 text-[13px] leading-[1.6] text-muted">{row.verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="open-mode">OPEN Mode</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        No authentication is required. Players only need your client key to join queues and matches.
      </p>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        This is the fastest way to start testing, public demos, or games where you prefer zero login friction.
      </p>
      <div className="mb-10 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        <strong className="text-amber">Note:</strong> Do not use OPEN mode with{' '}
        <Link href="/pricing#auto-upgrade" className="text-accent transition hover:text-text">
          auto-upgrade
        </Link>{' '}
        billing. Malicious users could create many fake players and consume your free 20 CCU limit.
      </div>

      <SectionTitle id="turnkit-auth-mode">TURNKIT_AUTH Mode</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">TurnKit manages player login using email + OTP.</p>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text">How to implement</h3>
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-[1.7] text-muted">
          <li>Set mode to TURNKIT_AUTH in the dashboard.</li>
          <li>
            Configure your SMTP settings. A quick option is setting up{' '}
            <Link href="/docs/guides/turnkit-auth-brevo" className="text-accent transition hover:text-text">
              Brevo as your email provider
            </Link>
            .
          </li>
          <li>
            Client calls <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">/v1/client/auth/otp/request</code> and{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">/v1/client/auth/otp/verify</code>.
          </li>
          <li>
            Use the returned player JWT in{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">Authorization: Bearer &lt;player-jwt&gt;</code>{' '}
            for normal client calls.
          </li>
        </ol>
      </div>

      <SectionTitle id="signed-mode">SIGNED Mode</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">Your backend signs player identities.</p>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text">How to implement</h3>
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-[1.7] text-muted">
          <li>Set mode to SIGNED in the dashboard.</li>
          <li>Store secret key only on your backend.</li>
          <li>
            Backend computes HMAC-SHA256 over{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">playerId + &quot;\n&quot; + timestamp + &quot;\n&quot; + nonce</code>{' '}
            and returns{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">playerId</code>,{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">timestamp</code>,{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">nonce</code>, and{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">signature</code> to the client.
          </li>
          <li>
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">timestamp</code> is Unix epoch seconds encoded as a
            string.
          </li>
          <li>
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">nonce</code> must be a random URL-safe string, not a
            time-based value. The server currently requires{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">[A-Za-z0-9_-]{"{16,128}"}</code>.
          </li>
          <li>
            Client calls <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">POST /v1/client/auth/signed/exchange</code>{' '}
            with that payload. TurnKit verifies signature, replay protection, and freshness before issuing a player JWT.
          </li>
          <li>
            Use that player JWT in{' '}
            <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">Authorization: Bearer &lt;player-jwt&gt;</code>{' '}
            for normal client calls.
          </li>
        </ol>
      </div>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        <strong className="text-text">OPEN</strong> is the only mode that still sends{' '}
        <code className="rounded-[3px] bg-surface2 px-1.5 py-0.5 text-[#eef5fb]">X-Player-Id</code> directly on client requests.
      </p>
      <p className="max-w-[760px] text-base leading-[1.7] text-muted">All modes work with MatchWithAnyone().</p>
    </DocsShell>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
      {children}
    </h2>
  );
}
