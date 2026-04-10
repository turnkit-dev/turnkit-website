import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy - TurnKit',
  description: 'TurnKit privacy policy covering developer data, service data, end-user data, and processors.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - TurnKit',
    description: 'TurnKit privacy policy covering developer data, service data, end-user data, and processors.',
    url: 'https://turnkit.dev/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - TurnKit',
    description: 'TurnKit privacy policy covering developer data, service data, end-user data, and processors.',
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updatedLabel="Last Updated: April 2026">
      <h2>1. Data We Collect</h2>
      <ul>
        <li>Developer Data: We collect your email address, name, and profile information via Google or GitHub OAuth for authentication.</li>
        <li>Service Data: We store your subscription status, CCU usage, and chosen modules for billing and performance monitoring.</li>
        <li>End-User Data: If using the Leaderboard module, we store playerId and associated scores. The Relay module does not store end-user data.</li>
      </ul>

      <h2>2. Use of Data</h2>
      <p>
        We use your data to provide the Service, process payments via our Merchant of Record partners, and communicate technical
        updates. We do not sell your personal data to third parties.
      </p>

      <h2>3. Data Retention</h2>
      <p>
        We retain your data as long as your account is active. You may request data deletion at any time by contacting
        support@turnkit.dev.
      </p>

      <h2>4. Third-Party Processors</h2>
      <p>
        We use Merchant of Record providers, such as Polar.sh or Paddle, to handle payments. Their use of your personal information is
        governed by their respective privacy policies.
      </p>

      <h2>5. International Transfers</h2>
      <p>
        Your data may be processed on servers located outside of Serbia. We ensure all transfers comply with applicable data
        protection laws.
      </p>
    </LegalPage>
  );
}
