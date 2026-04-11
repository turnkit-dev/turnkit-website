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
        bound by these Terms of Service. If you are using the Service on behalf of a company or other legal entity, you represent
        and warrant that you have the authority to bind that entity to these Terms.
      </p>
      <p>If you do not agree to these Terms, you may not use the Service.</p>

      <h2>2. Description of Service</h2>
      <p>
        TurnKit provides backend infrastructure services for game developers, including but not limited to game relays, state
        synchronization, and leaderboard management.
      </p>
      <p>We may modify, suspend, or discontinue any part of the Service at any time, with or without notice.</p>

      <h2>3. User Responsibilities and Content</h2>
      <p>You are solely responsible for the applications, games, and content you build using TurnKit. You agree that:</p>
      <ul>
        <li>You will comply with all applicable laws and regulations.</li>
        <li>You will not use the Service for any illegal activities, including the distribution of malware or abusive conduct.</li>
        <li>You are responsible for any end-user data collected, processed, or transmitted by your application.</li>
      </ul>
      <p>
        TurnKit acts as a neutral data transport and processing layer. We do not control or endorse user content and are not
        responsible for content transmitted through the Service.
      </p>
      <p>We reserve the right (but not the obligation) to investigate violations of these Terms.</p>

      <h2>4. Prohibited Uses</h2>
      <p>
        You may not use TurnKit to develop, operate, or support any application that involves real-money transactions, wagering,
        or gambling activities, whether legal or illegal in any jurisdiction.
      </p>
      <p>This includes, but is not limited to:</p>
      <ul>
        <li>Games involving bets, stakes, or prizes of monetary value</li>
        <li>Real-money casinos, betting platforms, or prediction markets</li>
        <li>Systems that facilitate the exchange of real-world currency or equivalents based on game outcomes</li>
      </ul>
      <p>
        TurnKit is not designed, licensed, or intended for gambling-related use. We do not provide regulatory compliance, fraud
        prevention, or financial safeguards required for such systems.
      </p>
      <p>Violation of this section may result in immediate suspension or termination of access to the Service without notice.</p>

      <h2>5. Billing and Tiers</h2>
      <p>
        Services are billed based on Concurrent Users (CCU) and active modules. CCU is defined as any player activity within the
        last 30 minutes.
      </p>
      <ul>
        <li>Burst Protection: A 24-hour burst window is provided once per calendar month for temporary usage spikes.</li>
        <li>Upgrades: Users may manually upgrade their tiers at any time.</li>
        <li>
          Auto-Upgrade: If enabled, you consent to automatic billing adjustments when usage exceeds your current limits.
        </li>
      </ul>
      <p>Failure to pay applicable fees may result in suspension or termination of the Service.</p>

      <h2>6. Suspension and Termination</h2>
      <p>We may suspend or terminate your access to the Service at any time, with or without notice, if:</p>
      <ul>
        <li>You violate these Terms</li>
        <li>Your usage poses a security or legal risk</li>
        <li>Required payments are not made</li>
      </ul>
      <p>Upon termination, your right to use the Service will immediately cease.</p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by the laws of the Republic of Serbia, Nenad Nikolic shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business
        opportunities, arising out of or related to your use of or inability to use the Service.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Nenad Nikolic from and against any claims, liabilities, damages, losses,
        and expenses arising out of or related to:
      </p>
      <ul>
        <li>Your use of the Service</li>
        <li>Your applications or games</li>
        <li>Your violation of these Terms</li>
      </ul>

      <h2>9. Disclaimer of Warranties</h2>
      <p>The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
      <p>
        We make no warranties, express or implied, regarding reliability, availability, or fitness for a particular purpose. We do
        not guarantee that the Service will be uninterrupted, secure, or error-free.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Republic of Serbia. Any disputes arising out of or in connection with these
        Terms shall be subject to the exclusive jurisdiction of the competent courts of Kikinda, Serbia.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Service after changes become effective constitutes
        acceptance of the revised Terms.
      </p>
    </LegalPage>
  );
}
