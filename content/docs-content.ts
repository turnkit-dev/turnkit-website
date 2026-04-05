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
      { href: '/docs/player-authentication-modes', label: 'Player Authentication Modes' },
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

export const docsIndexPageMeta: DocsPageMeta = {
  title: 'Documentation',
  description: 'TurnKit docs for quickstarts, Relay, leaderboards, and API reference.',
  path: '/docs',
  eyebrow: 'Docs',
  breadcrumbLabel: 'Overview',
  toc: [
    { href: '#start-here', label: 'Start Here' },
    { href: '#guides', label: 'Guides' },
  ],
};

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

export const relayPageMeta: DocsPageMeta = {
  title: 'TurnKit Relay',
  description:
    'Overview of TurnKit Relay, the authoritative multiplayer server for fair turn validation, filtered private state, and signed match results.',
  path: '/docs/relay',
  eyebrow: 'TurnKit Relay',
  breadcrumbLabel: 'Relay',
  toc: [
    { href: '#intro', label: 'Intro' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#key-features', label: 'Key Features' },
    { href: '#private-data', label: 'Hand Hiding' },
    { href: '#flexibility', label: 'Flexibility' },
  ],
};

export const leaderboardsPageMeta: DocsPageMeta = {
  title: 'Leaderboards',
  description:
    'Submit scores, query ranks, and configure seasonal or all-time leaderboards with validation, metadata, and authoritative integrations.',
  path: '/docs/leaderboards',
  eyebrow: 'Features',
  breadcrumbLabel: 'Leaderboards',
  toc: [
    { href: '#create-leaderboard', label: 'Create Leaderboard Type You Need' },
    { href: '#score-submission', label: 'Score Submission' },
    { href: '#queries', label: 'Queries' },
    { href: '#extras', label: 'Extras' },
    { href: '#quick-usage', label: 'Quick Usage' },
    { href: '#full-api', label: 'Full API' },
  ],
};

export const playerAuthenticationModesPageMeta: DocsPageMeta = {
  title: 'Player Authentication Modes',
  description:
    'Choose between OPEN, TURNKIT_AUTH, and SIGNED player authentication for TurnKit based on speed, simplicity, or backend control.',
  path: '/docs/player-authentication-modes',
  eyebrow: 'Features',
  breadcrumbLabel: 'Player Authentication Modes',
  toc: [
    { href: '#quick-comparison', label: 'Quick Comparison' },
    { href: '#open-mode', label: 'OPEN Mode' },
    { href: '#turnkit-auth-mode', label: 'TURNKIT_AUTH Mode' },
    { href: '#signed-mode', label: 'SIGNED Mode' },
  ],
};

export const apiPageMeta: DocsPageMeta = {
  title: 'REST API',
  description: 'REST API reference for TurnKit server endpoints generated from the OpenAPI specification.',
  path: '/docs/api',
  eyebrow: 'API Reference',
  breadcrumbLabel: 'REST API',
  toc: [
    { href: '#overview', label: 'Overview' },
    { href: '#reference', label: 'Reference' },
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
