export interface DocsNavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface DocsNavSection {
  title: string;
  links: DocsNavLink[];
}

export interface DocsPageMeta {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  breadcrumbLabel: string;
  toc: Array<{
    href: string;
    label: string;
  }>;
}

export const docsNavSections: DocsNavSection[] = [
  {
    title: 'Getting Started',
    links: [
      { href: '/docs/quickstart/unity', label: 'Unity Quickstart' },
      { href: '/docs/quickstart/rest-api', label: 'REST API Quickstart' },
    ],
  },
  {
    title: 'Features',
    links: [
      { href: '/docs/relay', label: 'Turn Relay' },
      { href: '/docs/leaderboards', label: 'Leaderboards' },
    ],
  },
  {
    title: 'API Reference',
    links: [
      { href: '/docs/api', label: 'REST API' },
      { href: '/docs/websocket', label: 'WebSocket Protocol' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/examples', label: 'Code Examples' },
      { href: '/pricing', label: 'Pricing' },
      { href: 'https://discord.gg/SqMVU5xex3', label: 'Discord Community', external: true },
    ],
  },
];

export const websocketPageMeta: DocsPageMeta = {
  title: 'WebSocket Protocol',
  description:
    'Complete WebSocket protocol reference for TurnKit Relay. Real-time turn enforcement, hand hiding, and match state synchronization.',
  path: '/docs/websocket',
  eyebrow: 'TurnKit Relay',
  breadcrumbLabel: 'WebSocket Protocol',
  toc: [
    { href: '#handshake', label: 'Handshake' },
    { href: '#lifecycle', label: 'Session Lifecycle' },
    { href: '#client-to-server', label: 'Client to Server' },
    { href: '#move-shape', label: 'MOVE Shape' },
    { href: '#action-variants', label: 'Action Variants' },
    { href: '#selector-variants', label: 'Selector Variants' },
    { href: '#server-to-client', label: 'Server to Client' },
    { href: '#match-started', label: 'MATCH_STARTED' },
    { href: '#move-made', label: 'MOVE_MADE' },
    { href: '#reconnect', label: 'Reconnect Behavior' },
    { href: '#error-codes', label: 'Error Codes' },
    { href: '#terminal-reasons', label: 'Terminal Reasons' },
    { href: '#client-guidance', label: 'Client Guidance' },
  ],
};

export const unityQuickstartPageMeta: DocsPageMeta = {
  title: 'Unity Quickstart',
  description:
    'Install the TurnKit Unity package, sign in, generate keys, and open the multiplayer example scene.',
  path: '/docs/quickstart/unity',
  eyebrow: 'Getting Started',
  breadcrumbLabel: 'Unity Quickstart',
  toc: [
    { href: '#get-started-window', label: 'Get Started Window' },
    { href: '#generated-resources', label: 'Generated Resources' },
  ],
};
