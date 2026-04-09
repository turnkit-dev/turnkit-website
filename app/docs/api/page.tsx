import type { Metadata } from 'next';
import { InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { ScalarApiReference } from '@/components/scalar-api-reference';
import { apiPageMeta } from '@/content/docs-content';

const apiBaseUrl = process.env.NEXT_PUBLIC_TURNKIT_API_BASE_URL ?? 'https://api.turnkit.dev';
const rawSpecPath = '/openapi.json';

export const metadata: Metadata = {
  title: 'REST API - TurnKit Docs',
  description: apiPageMeta.description,
  alternates: {
    canonical: apiPageMeta.path,
  },
  openGraph: {
    title: 'REST API - TurnKit Docs',
    description: apiPageMeta.description,
    url: `https://turnkit.dev${apiPageMeta.path}`,
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'REST API - TurnKit Docs',
    description: apiPageMeta.description,
  },
};

export default function ApiDocsPage() {
  return (
    <DocsShell meta={apiPageMeta}>
      <div id="overview" className="mb-8 space-y-4">
        <p className="text-base leading-[1.6] text-muted">
          REST API reference for TurnKit server endpoints. The reference below is rendered from the bundled OpenAPI document shipped with
          this site, so it should be refreshed whenever backend endpoint behavior changes.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="Base URL">
            <InlineCode code={apiBaseUrl} className="break-all" />
          </InfoCard>
          <InfoCard title="Auth">
            <p className="text-[13px] text-muted">
              Use the API key or bearer token scheme defined in the OpenAPI document for each secured endpoint.
            </p>
          </InfoCard>
          <InfoCard title="Raw Spec">
            <a
              href={rawSpecPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
            >
              Open OpenAPI document
            </a>
          </InfoCard>
        </div>
        <div className="rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6] text-text">
          Browser-facing developer auth endpoints are stricter now. In browser flows,{' '}
          <InlineCode code="/v1/dev/auth/refresh" /> and <InlineCode code="/v1/dev/auth/logout" /> require an allowed{' '}
          <InlineCode code="Origin" />, the CSRF header <InlineCode code="X-XSRF-TOKEN" />, and request handling compatible with the
          backend security config.
        </div>
      </div>
      <div id="reference" className="overflow-hidden rounded-[6px] border border-border bg-white">
        <ScalarApiReference specUrl={rawSpecPath} />
      </div>
    </DocsShell>
  );
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="rounded-[6px] border border-border bg-surface p-5">
      <h2 className="mb-2 text-sm font-semibold text-text">{title}</h2>
      {children}
    </div>
  );
}
