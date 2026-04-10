export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ConfigRow {
  key: string;
  values: Array<{
    label: string;
    active?: boolean;
  }>;
}

export interface PricingTier {
  tier: string;
  price: string;
  suffix?: string;
  ccu: string;
  featured?: boolean;
  free?: boolean;
}

export interface PricingCatalog {
  relay: PricingTier[];
  leaderboards: PricingTier[];
}

export interface ModuleRow {
  name: string;
  description: string;
  badge: string;
}

export interface LandingContent {
  navLinks: NavLink[];
  heroTag: string;
  heroTitle: string[];
  heroSubtitle: string;
  heroHighlight: string;
  engineTags: string[];
  features: Feature[];
  configRows: ConfigRow[];
  pricing: PricingCatalog;
  moduleRows: ModuleRow[];
  footerLinks: NavLink[];
}

export const landingContent: LandingContent = {
  navLinks: [
    { href: '/examples', label: 'Examples' },
    { href: '/turn-based-game-server-comparison-2026', label: 'Comparison' },
    { href: '/docs/quickstart/unity', label: 'Docs' },
    { href: 'https://discord.gg/SqMVU5xex3', label: 'Discord', external: true },
  ],
  heroTag: 'In Development',
  heroTitle: ['Backend infrastructure for', 'turn-based multiplayer games.'],
  heroSubtitle:
    'Your game logic stays on the client, works with Unity, Godot, or any engine.',
  heroHighlight:
    'TurnKit is an authoritative game server that enforces turns, hides player data, and prevents cheating.',
  engineTags: ['Works with Unity', 'Works with Godot', 'Works with any engine', 'REST + WebSocket API'],
  features: [
    {
      icon: '⟳',
      title: 'Turn Enforcement',
      description:
        'Prevent players from acting out of turn. Server-side turn validation means no client-side tricks can bypass it.',
    },
    {
      icon: '◐',
      title: 'Hand Hiding',
      description:
        'Each player only receives the data they are allowed to see. Hidden cards, stats, and moves stay filtered server-side.',
    },
    {
      icon: '✓',
      title: 'Player Voting',
      description:
        'Players vote automatically based on your game rules. Validate moves before continuing, or handle outcomes later.',
    },
    {
      icon: '⬡',
      title: 'Signed Match Results',
      description:
        'A cryptographically signed result is generated automatically at match end for rewards, leaderboards, or your own webhooks.',
    },
  ],
  configRows: [
    {
      key: 'Turn order',
      values: [
        { label: 'Round robin', active: true },
        { label: 'Free (no enforced order)' },
      ],
    },
    {
      key: 'Player voting',
      values: [
        { label: 'Validate move before continuing', active: true },
        { label: 'Game does not wait for votes, handle when they come' },
        { label: 'Off' },
      ],
    },
    {
      key: 'On vote fail',
      values: [
        { label: 'End match', active: true },
        { label: 'Reject move' },
        { label: 'Skip turn' },
      ],
    },
  ],
  pricing: {
    relay: [
      { tier: 'Dev', price: '$0', ccu: '20 concurrent players', free: true, featured: true },
      { tier: 'Indie', price: '$4.99', suffix: '/mo', ccu: '40 concurrent players' },
      { tier: 'Studio', price: '$9.99', suffix: '/mo', ccu: '80 concurrent players' },
      { tier: 'Pro', price: '$19.99', suffix: '/mo', ccu: '160 concurrent players' },
      { tier: 'Scale', price: '$39.99', suffix: '/mo', ccu: '320 concurrent players' },
      { tier: 'Enterprise', price: '$79.99', suffix: '/mo', ccu: '640 concurrent players' },
    ],
    leaderboards: [
      { tier: 'Dev', price: '$0', ccu: '20 concurrent players', free: true, featured: true },
      { tier: 'Indie', price: '$1.99', suffix: '/mo', ccu: '40 concurrent players' },
      { tier: 'Studio', price: '$3.99', suffix: '/mo', ccu: '80 concurrent players' },
      { tier: 'Pro', price: '$7.99', suffix: '/mo', ccu: '160 concurrent players' },
      { tier: 'Scale', price: '$15.99', suffix: '/mo', ccu: '320 concurrent players' },
      { tier: 'Enterprise', price: '$31.99', suffix: '/mo', ccu: '640 concurrent players' },
    ],
  },
  moduleRows: [
    {
      name: 'Relay',
      description: 'Turn enforcement, hand hiding, background player voting, signed results.',
      badge: 'Coming Soon',
    },
    {
      name: 'Leaderboards',
      description: 'Global and seasonal rankings.',
      badge: 'Coming Soon',
    },
    {
      name: 'Matchmaking',
      description: 'Queue players and validate inventory before a match starts.',
      badge: 'Coming Soon',
    },
    {
      name: 'PlayerStore',
      description: 'Inventory, currencies, stats, and in-game shop.',
      badge: 'Coming Soon',
    }
  ],
  footerLinks: [
    { href: 'https://discord.gg/SqMVU5xex3', label: 'Discord', external: true },
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/refunds', label: 'Refunds' },
  ],
};
