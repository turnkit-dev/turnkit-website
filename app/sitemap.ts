import type { MetadataRoute } from 'next';
import {
  apiPageMeta,
  docsIndexPageMeta,
  leaderboardsPageMeta,
  playerAuthenticationModesPageMeta,
  relayPageMeta,
  restQuickstartPageMeta,
  turnkitAuthBrevoPageMeta,
  unityQuickstartPageMeta,
  websocketPageMeta,
} from '@/content/docs-content';
import { lastContentUpdate, siteUrl } from '@/lib/seo';

const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/turn-based-game-server-comparison-2026', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: docsIndexPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: unityQuickstartPageMeta.path, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/examples', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: relayPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: leaderboardsPageMeta.path, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: restQuickstartPageMeta.path, priority: 0.6, changeFrequency: 'monthly' as const },
  { path: apiPageMeta.path, priority: 0.6, changeFrequency: 'weekly' as const },
  { path: playerAuthenticationModesPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: turnkitAuthBrevoPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: websocketPageMeta.path, priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.1, changeFrequency: 'yearly' as const },
  { path: '/refunds', priority: 0.1, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.1, changeFrequency: 'yearly' as const },
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
