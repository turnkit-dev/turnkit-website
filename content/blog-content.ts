import type { DocsNavSection, DocsPageMeta } from '@/content/docs-content';

export const blogNavSections: DocsNavSection[] = [
  {
    title: 'Featured',
    links: [
      { href: '/blog/turn-based-multiplayer-hybrid-approach', label: 'Turn-Based Multiplayer Hybrid Approach' },
    ],
  },
  {
    title: 'More',
    links: [
      { href: '/blog', label: 'All Blog Posts' },
      { href: '/turn-based-game-server-comparison-2026', label: 'Server Comparison 2026' },
      { href: '/docs', label: 'Documentation' },
    ],
  },
];

export const blogIndexPageMeta: DocsPageMeta = {
  title: 'Blog',
  description: 'Read TurnKit blog posts about turn-based multiplayer architecture, server tradeoffs, and development workflow.',
  path: '/blog',
  eyebrow: 'Blog',
  breadcrumbLabel: 'Overview',
  toc: [
    { href: '#posts', label: 'Posts' },
  ],
};

export const hybridApproachPageMeta: DocsPageMeta = {
  title: 'Making a Multiplayer Turn Based Game with a Hybrid Approach',
  description:
    'A hybrid turn-based multiplayer architecture that handles generic server features centrally while leaving game-specific rules to the client.',
  path: '/blog/turn-based-multiplayer-hybrid-approach',
  eyebrow: 'Blog',
  breadcrumbLabel: 'Hybrid Approach',
  toc: [
    { href: '#top', label: 'Top' },
    { href: '#approach', label: 'Hybrid Approach' },
    { href: '#consensus', label: 'Client Voting Consensus' },
    { href: '#demo', label: 'Live Demo' },
    { href: '#tradeoffs', label: 'Tradeoffs' },
  ],
};
