import type { MetadataRoute } from 'next';
import {
  apiPageMeta,
  clientReconnectionPageMeta,
  docsIndexPageMeta,
  freeUnityLeaderboardsPageMeta,
  leaderboardsPageMeta,
  leaderboardOptionsPageMeta,
  liveDemoExamplePageMeta,
  playerAuthenticationModesPageMeta,
  relayPageMeta,
  relayIntegrationsPageMeta,
  restQuickstartPageMeta,
  turnkitAuthBrevoPageMeta,
  unityClientPageMeta,
  unityQuickstartPageMeta,
  websocketPageMeta,
} from '@/content/docs-content';
import { blogIndexPageMeta, hybridApproachPageMeta, selfHostedLeaderboardsPageMeta } from '@/content/blog-content';
import { lastContentUpdate, siteUrl } from '@/lib/seo';

const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/turn-based-game-server-comparison-2026', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: blogIndexPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: hybridApproachPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: selfHostedLeaderboardsPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: docsIndexPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: unityQuickstartPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/live-demo', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/examples', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: liveDemoExamplePageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: leaderboardOptionsPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: relayPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: leaderboardsPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: relayIntegrationsPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: restQuickstartPageMeta.path, priority: 0.6, changeFrequency: 'monthly' as const },
  { path: apiPageMeta.path, priority: 0.6, changeFrequency: 'weekly' as const },
  { path: unityClientPageMeta.path, priority: 0.6, changeFrequency: 'monthly' as const },
  { path: clientReconnectionPageMeta.path, priority: 0.6, changeFrequency: 'monthly' as const },
  { path: freeUnityLeaderboardsPageMeta.path, priority: 0.6, changeFrequency: 'monthly' as const },
  { path: playerAuthenticationModesPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: turnkitAuthBrevoPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: websocketPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/other-projects', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/rankdrop', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/handsfree-notes', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/handsfree-tube', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/handsfree-appointments', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/zumba-space-marble-blast', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/refunds', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/rankdrop-license', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-appointments/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-appointments/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-notes/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-notes/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-notes/delete-data', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-tube/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/handsfree-tube/terms', priority: 0.2, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(lastContentUpdate);

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
