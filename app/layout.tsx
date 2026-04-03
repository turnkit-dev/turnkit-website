import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { DM_Mono, Syne } from 'next/font/google';

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
  metadataBase: new URL('https://turnkit.dev'),
  title: 'TurnKit - Turn-Based Multiplayer Backend for Unity & Godot',
  description:
    'TurnKit handles turn enforcement, matchmaking, and leaderboards so you can ship your turn-based game faster. Authoritative relay for Unity, Godot, and custom engines. Free to start.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TurnKit - Turn-Based Multiplayer Backend for Unity & Godot',
    description:
      'TurnKit handles turn enforcement, matchmaking, and leaderboards so you can ship your turn-based game faster. Authoritative relay for Unity, Godot, and custom engines. Free to start.',
    url: 'https://turnkit.dev',
    images: ['/assets/og-card.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TurnKit - Turn-Based Multiplayer Backend for Unity & Godot',
    description:
      'TurnKit handles turn enforcement, matchmaking, and leaderboards so you can ship your turn-based game faster. Authoritative relay for Unity, Godot, and custom engines. Free to start.',
    images: ['/assets/og-card.png'],
  },
  icons: {
    icon: '/assets/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} bg-bg font-mono text-[15px] leading-relaxed text-text antialiased`}>
        <div className="pointer-events-none fixed inset-0 z-0 bg-grid48 bg-[length:48px_48px] opacity-30" />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Script
          id="turnkit-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'TurnKit',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cloud',
              description:
                'Backend infrastructure for turn-based multiplayer games. Authoritative relay that enforces turns, hides player data, and prevents cheating. Works with Unity, Godot, or any engine.',
              url: 'https://turnkit.dev',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '0',
                highPrice: '79.99',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="91a29c3a-7aea-44d4-a0f2-d2d6060821b7" />
      </body>
    </html>
  );
}
