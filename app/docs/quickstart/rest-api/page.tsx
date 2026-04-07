import type { Metadata } from 'next';
import Link from 'next/link';
import { InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { restQuickstartPageMeta } from '@/content/docs-content';

export const metadata: Metadata = {
  title: 'REST API Quickstart - TurnKit Docs',
  description: restQuickstartPageMeta.description,
  alternates: {
    canonical: restQuickstartPageMeta.path,
  },
  openGraph: {
    title: 'REST API Quickstart - TurnKit Docs',
    description: restQuickstartPageMeta.description,
    url: `https://turnkit.dev${restQuickstartPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'REST API Quickstart - TurnKit Docs',
    description: restQuickstartPageMeta.description,
  },
};

export default function RestApiQuickstartPage() {
  return (
    <DocsShell meta={restQuickstartPageMeta}>
      <p className="mb-5 text-text">
        1. Go to the{' '}
        <Link 
          href="/" 
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          Dashboard
        </Link>
        , press <strong>New Game</strong>, and enter your project name.
      </p>
      <p className="mb-5 text-text">
        2. Ensure <strong>Quick Start</strong> is already selected and press <strong>Create Game</strong>.
      </p>
      <p className="mb-10 text-text">
        3. Copy the <InlineCode code="Client Key" />. This is only shown once during creation.
      </p>

      <h2 id="next-steps" className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
        Next Steps
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[6px] border border-border bg-surface p-5">
          <h3 className="mb-2 text-sm font-semibold text-text">Matchmaking</h3>
          <p className="text-[13px] text-muted">
            Check out{' '}
            <Link href="/docs/api#tag/relay-queue/POST/v1/client/relay/queue" className="text-[#7fc4ff] hover:underline">
              POST /v1/client/relay/queue
            </Link>{' '}
            to get your <InlineCode code="sessionId" />.
          </p>
        </div>
        <div className="rounded-[6px] border border-border bg-surface p-5">
          <h3 className="mb-2 text-sm font-semibold text-text">Real-time Relay</h3>
          <p className="text-[13px] text-muted">
            See the{' '}
            <Link href="/docs/websocket" className="text-[#7fc4ff] hover:underline">
              WebSocket docs
            </Link>{' '}
            for how to use the relay during the match.
          </p>
        </div>
      </div>

      <div className="mb-6 mt-8 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6]">
        <strong className="text-amber">Note:</strong> The{' '}
        <Link href="/examples" className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]">
          /examples
        </Link>{' '}
        directory includes Unity examples and a full standalone C# client for reference.
      </div>
    </DocsShell>
  );
}