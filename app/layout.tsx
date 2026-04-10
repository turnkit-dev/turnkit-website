import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { DM_Mono, Syne } from 'next/font/google';
import { absoluteUrl, buildMetadata, siteDescription, siteName, siteUrl } from '@/lib/seo';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: 'Nenad Nikolic', url: siteUrl }],
  creator: 'Nenad Nikolic',
  publisher: siteName,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  ...buildMetadata({
    title: 'TurnKit - Turn-Based Multiplayer Backend for Unity & Godot',
    description: siteDescription,
    path: '/',
    keywords: ['Unity turn-based multiplayer', 'Godot turn-based multiplayer', 'multiplayer backend for indie games'],
  }),
  icons: {
    icon: '/assets/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl('/assets/logo.png'),
    sameAs: ['https://discord.gg/SqMVU5xex3'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@turnkit.dev',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cloud',
    description:
      'Backend infrastructure for turn-based multiplayer games. Authoritative relay that enforces turns, hides player data, and prevents cheating. Works with Unity, Godot, or any engine.',
    url: siteUrl,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '79.99',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} bg-bg font-mono text-[15px] leading-relaxed text-text antialiased`}>
        <div className="pointer-events-none fixed inset-0 z-0 bg-grid48 bg-[length:48px_48px] opacity-30" />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Script
          id="turnkit-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="turnkit-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="turnkit-software-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="91a29c3a-7aea-44d4-a0f2-d2d6060821b7" />
      </body>
    </html>
  );
}
