import Link from 'next/link';
import { docsNavSections, type DocsPageMeta } from '@/content/docs-content';

export interface DocsShellProps {
  meta: DocsPageMeta;
  children: React.ReactNode;
}

export function DocsShell({ meta, children }: DocsShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] px-0">
      <aside className="hidden w-[260px] shrink-0 md:block">
        <div
          className="fixed top-[60px] h-[calc(100vh-60px)] w-[260px] overflow-y-auto border-r border-border bg-bg px-6 py-8"
          style={{ left: 'max(0px, calc((100vw - 1400px) / 2))' }}
        >
          <DocsSidebar currentPath={meta.path} />
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 md:max-w-[900px] md:px-[clamp(24px,5vw,64px)] md:py-12">
        <div className="mb-8 flex items-center gap-2 text-[13px] text-muted">
          <Link href="/docs" className="transition hover:text-text">
            Docs
          </Link>
          <span className="text-faint">/</span>
          <span>{meta.breadcrumbLabel}</span>
        </div>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">{meta.eyebrow}</div>
        <h1 className="mb-4 font-display text-[clamp(28px,4vw,38px)] font-bold leading-[1.2] tracking-[-0.02em] text-text">
          {meta.title}
        </h1>
        {children}
      </main>
      <aside className="hidden w-[220px] shrink-0 xl:block">
        <div
          className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
          style={{ right: 'max(0px, calc((100vw - 1400px) / 2))' }}
        >
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
          <div className="flex flex-col gap-2">
            {meta.toc.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-l-2 border-transparent pl-3 text-xs text-muted transition hover:text-text"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

interface DocsSidebarProps {
  currentPath: string;
  mobile?: boolean;
}

export function DocsSidebar({ currentPath, mobile = false }: DocsSidebarProps) {
  return (
    <div>
      {docsNavSections.map((section) => (
        <div key={section.title} className="mb-8">
          <div className={`mb-3 text-[11px] font-medium uppercase tracking-[0.1em] ${mobile ? 'text-[#8B949E]' : 'text-faint'}`}>
            {section.title}
          </div>
          <div className="flex flex-col gap-1">
            {section.links.map((link) => {
              const active = link.href === currentPath;
              const className = mobile
                ? active
                  ? 'block rounded-[3px] border border-[rgba(88,166,255,0.4)] bg-[rgba(88,166,255,0.15)] px-3 py-1.5 text-[13px] text-[#58A6FF]'
                  : 'block rounded-[3px] px-3 py-1.5 text-[13px] text-[#C9D1D9] transition hover:bg-[#21262D] hover:text-white'
                : active
                  ? 'block rounded-[3px] bg-[rgba(47,156,235,0.15)] px-3 py-1.5 text-[13px] text-accent'
                  : 'block rounded-[3px] px-3 py-1.5 text-[13px] text-muted transition hover:bg-surface hover:text-text';

              return link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
