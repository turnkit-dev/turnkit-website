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
    title: 'Modules',
    links: [
      { href: '/docs/relay', label: 'Turn Relay' },
      { href: '/docs/leaderboards', label: 'Leaderboards' },
    ],
  },
  {
    title: 'Features',
    links: [
      { href: '/docs/player-authentication-modes', label: 'Player Authentication Modes' },
    ],
  },
  {
    title: 'Guides',
    links: [{ href: '/docs/guides/turnkit-auth-brevo', label: 'TurnKit Auth with Brevo' }],
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
      { href: '/turn-based-game-server-comparison-2026', label: 'Turn-Based Server Comparison' },
      { href: '/pricing', label: 'Pricing' },
      { href: 'https://discord.gg/SqMVU5xex3', label: 'Discord Community', external: true },
    ],
  },
];

export const docsIndexPageMeta: DocsPageMeta = {
  title: 'Documentation',
  description: 'Open the TurnKit docs to launch faster with Unity quickstarts, Relay guides, leaderboards, and API references.',
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
    'Implement TurnKit Relay faster with the full WebSocket protocol for turns, hidden data, reconnects, and sync.',
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
    'See how TurnKit Relay enforces fair turns, hides private state, and signs results so you can ship with less backend.',
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
    'Launch validated leaderboards with seasons, metadata, and rank queries so players have a reason to come back.',
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
    'Pick the right TurnKit auth mode fast, from open setup to signed backend control, and launch player login cleanly.',
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
  description: 'Explore every TurnKit REST endpoint in one place so you can wire dashboards, clients, and backend flows faster.',
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
    'Install the TurnKit Unity package, generate keys, and run the example scene to get multiplayer working today.',
  path: '/docs/quickstart/unity',
  eyebrow: 'Getting Started',
  breadcrumbLabel: 'Unity Quickstart',
  toc: [
    { href: '#get-started-window', label: 'Get Started Window' },
    { href: '#generated-resources', label: 'Generated Resources' },
  ],
};

export const restQuickstartPageMeta: DocsPageMeta = {
  title: 'REST API Quickstart',
  description: 'Generate a client key and use TurnKit REST and WebSocket APIs to launch your first multiplayer flow in minutes.',
  path: '/docs/quickstart/rest-api',
  eyebrow: 'Getting Started',
  breadcrumbLabel: 'REST API Quickstart',
  toc: [
    { href: '#next-steps', label: 'Next Steps' },
  ],
};

export const turnkitAuthBrevoPageMeta: DocsPageMeta = {
  title: 'TurnKit Auth with Brevo',
  description:
    'Set up email OTP with Brevo and TurnKit Auth so players can sign in quickly without building auth infrastructure.',
  path: '/docs/guides/turnkit-auth-brevo',
  eyebrow: 'Guides',
  breadcrumbLabel: 'TurnKit Auth with Brevo',
  toc: [
    { href: '#create-brevo-account', label: 'Create Brevo Account' },
    { href: '#copy-smtp-credentials', label: 'Copy SMTP Credentials' },
    { href: '#configure-turnkit-auth', label: 'Configure TurnKit Auth' },
    { href: '#sender-note', label: 'Sender Note' },
  ],
};
