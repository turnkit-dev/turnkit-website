import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/docs-shell';
import { turnkitAuthBrevoPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'TurnKit Auth with Brevo - TurnKit Docs',
  description: turnkitAuthBrevoPageMeta.description,
  alternates: {
    canonical: turnkitAuthBrevoPageMeta.path,
  },
  openGraph: {
    title: 'TurnKit Auth with Brevo - TurnKit Docs',
    description: turnkitAuthBrevoPageMeta.description,
    url: `https://turnkit.dev${turnkitAuthBrevoPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'TurnKit Auth with Brevo - TurnKit Docs',
    description: turnkitAuthBrevoPageMeta.description,
  },
};

const smtpRows = [
  { field: 'SMTP HOST', value: 'smtp-relay.brevo.com' },
  { field: 'PORT', value: '465' },
  { field: 'USERNAME', value: 'Login from Brevo real-time SMTP page' },
  { field: 'PASSWORD', value: 'Password from Brevo real-time SMTP page' },
  { field: 'FROM', value: 'The email address you used to sign up with Brevo' },
  { field: 'NAME', value: 'Your game name' },
];

export default function TurnkitAuthBrevoPage() {
  return (
    <DocsShell meta={turnkitAuthBrevoPageMeta}>
      <p className="mb-8 max-w-[760px] text-base leading-[1.7] text-muted">
        Use Brevo SMTP with <strong className="text-text">TURNKIT_AUTH</strong> to let players sign in with email OTP. This is the
        fastest setup if you want TurnKit to handle auth for you.
      </p>

      <SectionTitle id="create-brevo-account">Create Brevo Account</SectionTitle>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <ol className="list-decimal space-y-3 pl-5 text-[14px] leading-[1.7] text-muted">
          <li>
            Open{' '}
            <a
              href="https://onboarding.brevo.com/account/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition hover:text-text"
            >
              Brevo registration
            </a>{' '}
            and create your account.
          </li>
        </ol>
      </div>

      <SectionTitle id="copy-smtp-credentials">Copy SMTP Credentials</SectionTitle>
      <div className="mb-10 rounded-[6px] border border-border bg-surface p-5">
        <ol className="list-decimal space-y-3 pl-5 text-[14px] leading-[1.7] text-muted">
          <li>
            Open{' '}
            <a
              href="https://app.brevo.com/transactional/email/real-time"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition hover:text-text"
            >
              Brevo real-time SMTP
            </a>
            .
          </li>
          <li>Copy the login and password shown there.</li>
        </ol>
      </div>

      <SectionTitle id="configure-turnkit-auth">Configure TurnKit Auth</SectionTitle>
      <p className="mb-5 max-w-[760px] text-base leading-[1.7] text-muted">
        In your game dashboard, open{' '}
        <Link href="/docs/player-authentication-modes" className="text-accent transition hover:text-text">
          Player Authentication Mode
        </Link>{' '}
        and switch it to <strong className="text-text">TURNKIT_AUTH</strong>.
      </p>
      <div className="mb-6 overflow-x-auto rounded-[6px] border border-border bg-surface">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface2">
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Field</th>
              <th className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Value</th>
            </tr>
          </thead>
          <tbody>
            {smtpRows.map((row) => (
              <tr key={row.field} className="border-b border-border last:border-b-0">
                <td className="px-4 py-4 text-[13px] font-semibold text-text">{row.field}</td>
                <td className="px-4 py-4 text-[13px] leading-[1.6] text-muted">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-10 rounded-[6px] border border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        After filling the fields, press <strong className="text-text">SAVE</strong>.
      </div>

      <SectionTitle id="sender-note">Sender Note</SectionTitle>
      <div className="rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.7] text-text">
        <strong className="text-amber">Note:</strong> If the email you used in Brevo is not verified for your website domain, the
        sender will still use your email name, but Brevo may send from an address ending in{' '}
        <strong className="text-amber">@random_number.brevosend.com</strong>.
      </div>
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
