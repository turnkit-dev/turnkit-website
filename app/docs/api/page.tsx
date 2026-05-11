import type { Metadata } from 'next';
import { InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { JsonLd } from '@/components/json-ld';
import { apiPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';
import openApiSpec from '@/public/openapi.json';

const apiBaseUrl = process.env.NEXT_PUBLIC_TURNKIT_API_BASE_URL ?? 'https://api.turnkit.dev';
const rawSpecPath = '/openapi.json';

export const metadata: Metadata = buildMetadata({
  title: 'REST API - TurnKit Docs',
  description: apiPageMeta.description,
  path: apiPageMeta.path,
  type: 'article',
  keywords: ['game backend REST API', 'TurnKit API reference', 'multiplayer API docs'],
});

export default function ApiDocsPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'TurnKit REST API reference',
    description: apiPageMeta.description,
    path: apiPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'REST API', path: apiPageMeta.path },
  ]);
  const endpointGroups = buildEndpointGroups(openApiSpec);

  return (
    <DocsShell meta={apiPageMeta}>
      <JsonLd id="api-reference-article-schema" data={articleSchema} />
      <JsonLd id="api-reference-breadcrumb-schema" data={breadcrumbSchema} />
      <div id="overview" className="mb-8 space-y-4">
        <p className="text-base leading-[1.6] text-muted">
          REST API reference for TurnKit server endpoints.
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
      </div>
      <div id="reference" className="space-y-8">
        <section className="rounded-[6px] border border-border bg-surface p-5">
          <h2 className="mb-4 text-lg font-semibold text-text">API Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetaStat label="OpenAPI" value={openApiSpec.openapi} />
            <MetaStat label="Version" value={openApiSpec.info.version} />
            <MetaStat label="Endpoints" value={String(endpointGroups.reduce((count, group) => count + group.endpoints.length, 0))} />
          </div>
          {openApiSpec.info.description ? <p className="mt-4 text-[14px] leading-[1.7] text-muted">{openApiSpec.info.description}</p> : null}
        </section>

        {endpointGroups.map((group) => (
          <section key={group.name} id={slugify(group.name)} className="rounded-[6px] border border-border bg-surface">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold text-text">{group.name}</h2>
              {group.description ? <p className="mt-2 text-[13px] leading-[1.6] text-muted">{group.description}</p> : null}
            </div>
            <div className="divide-y divide-border">
              {group.endpoints.map((endpoint) => (
                <article key={`${endpoint.method}-${endpoint.path}`} className="px-5 py-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <MethodBadge method={endpoint.method} />
                        <InlineCode code={endpoint.path} className="break-all" />
                      </div>
                      <h3 className="text-[16px] font-semibold text-text">{endpoint.summary}</h3>
                      {endpoint.description ? <p className="mt-2 max-w-[900px] text-[14px] leading-[1.7] text-muted">{endpoint.description}</p> : null}
                    </div>
                    {endpoint.operationId ? (
                      <div className="text-[11px] uppercase tracking-[0.08em] text-faint">
                        Operation
                        <div className="mt-1 text-[12px] normal-case tracking-normal text-muted">{endpoint.operationId}</div>
                      </div>
                    ) : null}
                  </div>

                  {endpoint.parameters.length ? (
                    <div className="mt-5">
                      <SectionLabel>Parameters</SectionLabel>
                      <div className="overflow-x-auto rounded-[6px] border border-border bg-bg">
                        <table className="w-full border-collapse text-[13px]">
                          <thead>
                            <tr>
                              <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Name</th>
                              <th className="border-b border-border px-4 py-3 text-left font-medium text-text">In</th>
                              <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Type</th>
                              <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Required</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((parameter) => (
                              <tr key={`${parameter.name}-${parameter.in}`}>
                                <td className="border-b border-border px-4 py-3 align-top text-text">{parameter.name}</td>
                                <td className="border-b border-border px-4 py-3 align-top text-muted">{parameter.in}</td>
                                <td className="border-b border-border px-4 py-3 align-top text-muted">{parameter.type}</td>
                                <td className="border-b border-border px-4 py-3 align-top text-muted">{parameter.required ? 'Yes' : 'No'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}

                  {endpoint.requestBody ? (
                    <div className="mt-5">
                      <SectionLabel>Request Body</SectionLabel>
                      <div className="rounded-[6px] border border-border bg-bg px-4 py-3 text-[13px] text-muted">
                        <span className="text-text">{endpoint.requestBody.required ? 'Required' : 'Optional'}</span>
                        {' · '}
                        {endpoint.requestBody.contentTypes.join(', ')}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5">
                    <SectionLabel>Responses</SectionLabel>
                    <div className="overflow-x-auto rounded-[6px] border border-border bg-bg">
                      <table className="w-full border-collapse text-[13px]">
                        <thead>
                          <tr>
                            <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Status</th>
                            <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Description</th>
                            <th className="border-b border-border px-4 py-3 text-left font-medium text-text">Content</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.responses.map((response) => (
                            <tr key={response.code}>
                              <td className="border-b border-border px-4 py-3 align-top text-text">{response.code}</td>
                              <td className="border-b border-border px-4 py-3 align-top text-muted">{response.description}</td>
                              <td className="border-b border-border px-4 py-3 align-top text-muted">{response.contentTypes.join(', ') || 'None'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
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

interface OpenApiParameter {
  name: string;
  in: string;
  required?: boolean;
  schema?: {
    type?: string;
    format?: string;
  };
}

interface OpenApiRequestBody {
  required?: boolean;
  content?: Record<string, unknown>;
}

interface OpenApiResponse {
  description?: string;
  content?: Record<string, unknown>;
}

interface OpenApiOperation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: OpenApiParameter[];
  requestBody?: OpenApiRequestBody;
  responses?: Record<string, OpenApiResponse>;
}

interface EndpointGroup {
  name: string;
  description?: string;
  endpoints: {
    method: string;
    path: string;
    summary: string;
    description?: string;
    operationId?: string;
    parameters: Array<{ name: string; in: string; type: string; required: boolean }>;
    requestBody?: { required: boolean; contentTypes: string[] };
    responses: Array<{ code: string; description: string; contentTypes: string[] }>;
  }[];
}

function buildEndpointGroups(spec: typeof openApiSpec): EndpointGroup[] {
  const tagDescriptions = new Map((spec.tags ?? []).map((tag) => [tag.name, tag.description]));
  const groups = new Map<string, EndpointGroup>();

  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const [rawMethod, rawOperation] of Object.entries(pathItem ?? {})) {
      if (!isHttpMethod(rawMethod) || !rawOperation) {
        continue;
      }

      const operation = rawOperation as OpenApiOperation;
      const tagName = operation.tags?.[0] ?? 'General';
      const group = groups.get(tagName) ?? {
        name: tagName,
        description: tagDescriptions.get(tagName),
        endpoints: [],
      };

      group.endpoints.push({
        method: rawMethod.toUpperCase(),
        path,
        summary: operation.summary ?? `${rawMethod.toUpperCase()} ${path}`,
        description: operation.description,
        operationId: operation.operationId,
        parameters: (operation.parameters ?? []).map((parameter) => ({
          name: parameter.name,
          in: parameter.in,
          type: [parameter.schema?.type, parameter.schema?.format].filter(Boolean).join(' · ') || 'unknown',
          required: Boolean(parameter.required),
        })),
        requestBody: operation.requestBody
          ? {
              required: Boolean(operation.requestBody.required),
              contentTypes: Object.keys(operation.requestBody.content ?? {}),
            }
          : undefined,
        responses: Object.entries(operation.responses ?? {}).map(([code, response]) => ({
          code,
          description: response.description ?? 'No description',
          contentTypes: Object.keys(response.content ?? {}),
        })),
      });

      groups.set(tagName, group);
    }
  }

  return Array.from(groups.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function isHttpMethod(value: string) {
  return ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(value);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[6px] border border-border bg-bg px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.08em] text-faint">{label}</div>
      <div className="mt-2 text-[15px] font-semibold text-text">{value}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{children}</h4>;
}

function MethodBadge({ method }: { method: string }) {
  const className =
    method === 'GET'
      ? 'border-[rgba(47,156,235,0.24)] bg-[rgba(47,156,235,0.16)] text-[#8dd0ff]'
      : method === 'POST'
        ? 'border-[rgba(61,214,140,0.24)] bg-[rgba(61,214,140,0.16)] text-[#8ff0ba]'
        : method === 'PUT' || method === 'PATCH'
          ? 'border-[rgba(240,164,41,0.24)] bg-[rgba(240,164,41,0.16)] text-[#ffd28b]'
          : 'border-[rgba(248,113,113,0.24)] bg-[rgba(248,113,113,0.16)] text-[#fecaca]';

  return <span className={`rounded-[3px] border px-2 py-1 text-[11px] font-medium tracking-[0.08em] ${className}`}>{method}</span>;
}
