import type { Metadata } from 'next';
import Link from 'next/link';
import { InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { playerAuthenticationModesPageMeta } from '@/content/docs-content';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Player Authentication - TurnKit Docs',
  description: playerAuthenticationModesPageMeta.description,
  alternates: {
    canonical: absoluteUrl(playerAuthenticationModesPageMeta.path),
  },
  openGraph: {
    title: 'Player Authentication - TurnKit Docs',
    description: playerAuthenticationModesPageMeta.description,
    url: absoluteUrl(playerAuthenticationModesPageMeta.path),
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Player Authentication - TurnKit Docs',
    description: playerAuthenticationModesPageMeta.description,
  },
};

const comparisonRows = [
  {
    mode: 'NO_AUTH',
    bestFor: 'Quick testing and prototypes',
    requirements: 'Nothing',
    verification: 'Use X-Player-Id',
  },
  {
    mode: 'EMAIL_OTP',
    bestFor: 'Simple email login without building a backend',
    requirements: 'SMTP settings (host, port, username, password, from address)',
    verification: 'Email + OTP -> player JWT',
  },
  {
    mode: 'YOUR_BACKEND',
    bestFor: 'Games with existing player authentication',
    requirements: 'Your own backend + secret key',
    verification: 'Signed proof exchange -> player JWT',
  },
  {
    mode: 'UGS',
    bestFor: 'Unity games already using Unity Authentication',
    requirements: 'Unity Authentication id token + backend UGS verifier config',
    verification: 'Unity JWT exchange -> player JWT',
  },
];

export default function PlayerAuthenticationModesPage() {
  return (
    <DocsShell meta={playerAuthenticationModesPageMeta}>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit now separates player auth into a policy plus one or more enabled methods. <strong className="text-text">NO_AUTH</strong>{' '}
        is the default and fastest option, while <strong className="text-text">AUTH_REQUIRED</strong> protects client endpoints with a
        player JWT.
      </p>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Relay, leaderboards, and other client APIs all follow the same pattern: finish player auth first when required, then call the
        normal client endpoints with that player JWT. Relay itself still upgrades to a short-lived <InlineCode code="relayToken" /> for
        the WebSocket step after queue join succeeds.
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

      <SectionTitle id="no-auth-policy">NO_AUTH Policy</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        No authentication is required. Players only need your client key and use <InlineCode code="X-Player-Id" /> on runtime requests.
      </p>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        For Relay specifically, that means the queue join call stays on the lightweight path: client key plus{' '}
        <InlineCode code="X-Player-Id" />, then use the returned <InlineCode code="relayToken" /> on the WebSocket connection.
      </p>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        This is the fastest way to start testing, public demos, or games where you prefer zero login friction.
      </p>
      <div className="mb-10 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        <strong className="text-amber">Note:</strong> Do not use NO_AUTH with{' '}
        <Link href="/pricing#auto-upgrade" className="text-accent transition hover:text-text">
          auto-upgrade
        </Link>{' '}
        billing. Malicious users could create many fake players and consume your free 20 CCU limit.
      </div>

      <SectionTitle id="email-otp-method">EMAIL_OTP Method</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit manages player login using email + OTP. Enable this method when you want TurnKit to send codes through your SMTP
        provider.
      </p>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text">How to implement</h3>
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-[1.7] text-muted">
          <li>Set policy to AUTH_REQUIRED in the dashboard.</li>
          <li>Enable the EMAIL_OTP method.</li>
          <li>
            Configure your SMTP settings. A quick option is setting up{' '}
            <Link href="/docs/guides/turnkit-auth-brevo" className="text-accent transition hover:text-text">
              Brevo as your email provider
            </Link>
            .
          </li>
          <li>
            Client calls <InlineCode code="/v1/client/auth/email-otp/request" /> and <InlineCode code="/v1/client/auth/email-otp/verify" />.
          </li>
          <li>
            Use the returned player JWT in <InlineCode code="Authorization: Bearer <player-jwt>" /> for normal client calls.
          </li>
          <li>
            That includes <InlineCode code="POST /v1/client/relay/queue" /> before opening the relay WebSocket.
          </li>
        </ol>
      </div>
      <p className="mb-10 max-w-[760px] text-base leading-[1.7] text-muted">
        In Unity, the matching client-side calls are documented in the{' '}
        <Link href="/docs/unity-client#player-and-session" className="text-accent transition hover:text-text">
          Unity Client API reference
        </Link>
        .
      </p>
      <div className="mb-10 rounded-[6px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        OTP endpoints expect <InlineCode code="Content-Type: application/json" />. Default backend limits are currently 5 requests per
        10 minutes for <InlineCode code="/v1/client/auth/email-otp/request" /> and 10 requests per 10 minutes for{' '}
        <InlineCode code="/v1/client/auth/email-otp/verify" />, typically scoped by game, email, and client IP.
      </div>

      <SectionTitle id="your-backend-method">YOUR_BACKEND Method</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">Your backend signs player identities.</p>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text">How to implement</h3>
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-[1.7] text-muted">
          <li>Set policy to AUTH_REQUIRED in the dashboard.</li>
          <li>Enable the YOUR_BACKEND method.</li>
          <li>Store secret key only on your backend.</li>
          <li>
            Backend computes HMAC-SHA256 over{' '}
            <InlineCode code={'playerId + "\\n" + timestamp + "\\n" + nonce'} /> and returns <InlineCode code="playerId" />,{' '}
            <InlineCode code="timestamp" />, <InlineCode code="nonce" />, and <InlineCode code="signature" /> to the client.
          </li>
          <li>
            <InlineCode code="timestamp" /> is Unix epoch seconds encoded as a
            string.
          </li>
          <li>
            <InlineCode code="nonce" /> must be a random URL-safe string, not a time-based value. The server currently requires{' '}
            <InlineCode code="[A-Za-z0-9_-]{16,128}" />.
          </li>
          <li>
            Client calls <InlineCode code="POST /v1/client/auth/your-backend/exchange" />{' '}
            with that payload. TurnKit verifies signature, replay protection, and freshness before issuing a player JWT.
          </li>
          <li>
            Use that player JWT in <InlineCode code="Authorization: Bearer <player-jwt>" /> for normal client calls.
          </li>
          <li>
            Queue Relay with that player JWT, then switch to the returned <InlineCode code="relayToken" /> for the WebSocket itself.
          </li>
        </ol>
      </div>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        <strong className="text-text">NO_AUTH</strong> is the only policy that still sends{' '}
        <InlineCode code="X-Player-Id" /> directly on client requests.
      </p>
      <SectionTitle id="ugs-method">UGS Method</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        TurnKit can verify a Unity Authentication JWT through Unity JWKS and issue a normal TurnKit player JWT that works with
        leaderboards, queue, relay, and the rest of the runtime API.
      </p>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text">How to implement</h3>
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-[1.7] text-muted">
          <li>Set policy to AUTH_REQUIRED in the dashboard.</li>
          <li>Enable the UGS method.</li>
          <li>Configure backend UGS verification with your Unity project ID and optional environment ID.</li>
          <li>Sign the player in with Unity Authentication and obtain the Unity id token on the client.</li>
          <li>
            Client calls <InlineCode code="POST /v1/client/auth/ugs/exchange" /> with{' '}
            <InlineCode code="Authorization: Bearer <client-key>" /> and JSON containing{' '}
            <InlineCode code="idToken" /> plus optional <InlineCode code="serverProof" />.
          </li>
          <li>
            Use the returned TurnKit token exactly like any other player JWT in{' '}
            <InlineCode code="Authorization: Bearer <player-jwt>" /> for normal client calls.
          </li>
          <li>
            Queue Relay with that player JWT, then open the WebSocket with the returned <InlineCode code="relayToken" />.
          </li>
        </ol>
      </div>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        The backend verifies the Unity JWT signature through JWKS, checks issuer, project ID, optional environment ID, and time-based
        claims, then maps the Unity <InlineCode code="sub" /> to the TurnKit player ID.
      </p>
      <p className="max-w-[760px] text-base leading-[1.7] text-muted">
        Methods remain saved even if you temporarily switch the policy back to NO_AUTH, and you can enable YOUR_BACKEND, EMAIL_OTP,
        and UGS in any combination that fits your game.
      </p>
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
