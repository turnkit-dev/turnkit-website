import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service - TurnKit',
  description: 'TurnKit terms of service covering usage, billing, liability, and governing law.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service - TurnKit',
    description: 'TurnKit terms of service covering usage, billing, liability, and governing law.',
    url: 'https://turnkit.dev/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - TurnKit',
    description: 'TurnKit terms of service covering usage, billing, liability, and governing law.',
  },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updatedLabel="Last Updated: April 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using TurnKit (&quot;the Service&quot;), provided by Nenad Nikolic (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be
        bound by these Terms of Service. If you are using the Service on behalf of a company, you represent that you have the
        authority to bind that entity.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        TurnKit provides backend infrastructure services for game developers, including but not limited to game relays and
        leaderboard management.
      </p>

      <h2>3. User Responsibilities and Content</h2>
      <p>You are solely responsible for the applications and games you build using TurnKit. You agree that:</p>
      <ul>
        <li>You will not use TurnKit for any illegal activities, including unauthorized gambling or the distribution of malware.</li>
        <li>You are responsible for the end-user data collected by your application.</li>
        <li>TurnKit acts as a neutral pipe for data. We do not monitor and are not responsible for content transmitted through our relay servers.</li>
      </ul>

      <h2>4. Billing and Tiers</h2>
      <p>Services are billed based on Concurrent Users (CCU) and active modules. CCU is defined as any player action within the last 30 minutes.</p>
      <ul>
        <li>Burst Protection: We provide a 24-hour burst window once per month for usage spikes.</li>
        <li>Upgrades: Users may manually upgrade their tiers.</li>
        <li>
          If an optional auto-upgrade feature is enabled, you consent to being billed for the new tier upon exceeding your current
          limits.
        </li>
      </ul>

      <h2>5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by the laws of Serbia, Nenad Nikolic shall not be liable for any indirect, incidental, or
        consequential damages resulting from the use or inability to use the Service.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Republic of Serbia. Any disputes shall be resolved in the competent courts of
        Kikinda, Serbia.
      </p>
    </LegalPage>
  );
}
