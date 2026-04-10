import type { Metadata } from 'next';

export const siteName = 'TurnKit';
export const siteUrl = 'https://turnkit.dev';
export const defaultOgImage = '/assets/og-card.png';
export const defaultOgImageAlt = 'TurnKit branding and multiplayer backend messaging';
export const siteLocale = 'en_US';
export const siteDescription =
  'TurnKit handles turn enforcement, matchmaking, and leaderboards so you can ship your turn-based game faster. Authoritative relay for Unity, Godot, and custom engines. Free to start.';
export const lastContentUpdate = '2026-04-10T00:00:00.000Z';

const baseKeywords = [
  'turn-based multiplayer backend',
  'Unity multiplayer backend',
  'Godot multiplayer backend',
  'authoritative game server',
  'turn-based game backend',
  'game leaderboards API',
  'matchmaking backend',
  'multiplayer relay server',
];

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  keywords = [],
  twitterCard = 'summary_large_image',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...new Set([...baseKeywords, ...keywords])],
    alternates: {
      canonical: path,
    },
    category: 'technology',
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: siteLocale,
      type,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: defaultOgImageAlt,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: siteName,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cloud',
    },
  };
}

export function buildTechArticleSchema({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    url: absoluteUrl(path),
    author: {
      '@type': 'Person',
      name: 'Nenad Nikolic',
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/assets/logo.png'),
      },
    },
    dateModified: lastContentUpdate,
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: 'Game developers',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '79.99',
      priceCurrency: 'USD',
    },
  };
}
