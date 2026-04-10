import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { InlineCode } from '@/components/code-block';
import { DocsShell } from '@/components/docs-shell';
import { unityQuickstartPageMeta } from '@/content/docs-content';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Unity Quickstart - TurnKit Docs',
  description: unityQuickstartPageMeta.description,
  path: unityQuickstartPageMeta.path,
  type: 'article',
  keywords: ['Unity multiplayer quickstart', 'TurnKit Unity package', 'turn-based Unity backend'],
});

export default function UnityQuickstartPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'TurnKit Unity quickstart',
    description: unityQuickstartPageMeta.description,
    path: unityQuickstartPageMeta.path,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Unity Quickstart', path: unityQuickstartPageMeta.path },
  ]);

  return (
    <DocsShell meta={unityQuickstartPageMeta}>
      <Script
        id="unity-quickstart-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="unity-quickstart-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <p className="mb-5 text-text">
        1. Download{' '}
        <a
          href="https://github.com/Brainzy/TurnKit-Client/releases/latest/download/TurnKit.unitypackage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
        >
          TurnKit.unitypackage
        </a>{' '}
        and import it into your Unity project.
      </p>
      <p className="mb-10 text-text">2. In the editor pop up fill project name and continue to login. After login everything is generated and linked.</p>

      <h2 id="get-started-window" className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
        Get Started Window
      </h2>
      <p className="mb-5 text-text">
        3. Use <InlineCode code="Clone Project & Open New Editor" />, or
        for more control use the Unity menu at <InlineCode code="TurnKit/ParrelSync" />.
      </p>
      <p className="mb-5 text-text">4. Run the sample scene in two Unity editors.</p>

      <div className="mb-6 rounded-[6px] border border-[rgba(240,164,41,0.3)] bg-[rgba(240,164,41,0.08)] px-5 py-4 text-[14px] leading-[1.6]">
        <strong className="text-amber">Note:</strong> The client key is only shown on first creation. If you need a new one later,
        create it in the{' '}
        <Link href="/" className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]">
          Dashboard
        </Link>
        .
      </div>

      <h2 id="generated-resources" className="mb-5 mt-12 scroll-mt-20 font-display text-2xl font-semibold tracking-[-0.01em] text-text">
        Generated Resources
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['Developer Account', 'Your TurnKit account is created or linked during the browser auth step.'],
          ['Game Key', 'A server-side game key is created for the project backend configuration.'],
          ['Client Key', 'A client-safe key is generated for the Unity runtime.'],
          ['Relay Example', 'Default relay settings are created so the sample scene can connect immediately.'],
          ['Leaderboard', 'A default leaderboard is created on the server and linked into the sample config.'],
          ['Addressable Asset', 'Unity stores the runtime config in TurnKitConfig.asset.'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-[6px] border border-border bg-surface p-5">
            <h3 className="mb-2 text-sm font-semibold text-text">{title}</h3>
            <p className="text-[13px] text-muted">
              {description.includes('TurnKitConfig.asset') ? (
                <>
                  Unity stores the runtime config in{' '}
                  <InlineCode code="TurnKitConfig.asset" language="csharp" />.
                </>
              ) : (
                description
              )}
            </p>
          </div>
        ))}
      </div>
    </DocsShell>
  );
}
