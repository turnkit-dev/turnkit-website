import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

const privacyDescription = 'Review how TurnKit handles developer and player data before you ship, integrate, or create an account.';

export const metadata: Metadata = {
  title: 'Privacy Policy - TurnKit',
  description: privacyDescription,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - TurnKit',
    description: privacyDescription,
    url: 'https://turnkit.dev/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - TurnKit',
    description: privacyDescription,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updatedLabel="Last Updated: April 2026">
      <h2>1. Data We Collect</h2>
      <ul>
        <li>
          <strong>Developer Data:</strong> We collect your name, email address, and profile information through third-party
          authentication providers such as Google or GitHub.
        </li>
        <li>
          <strong>Service Data:</strong> We collect account-related data such as subscription status, Concurrent Users (CCU)
          usage, configuration, and enabled modules for billing, analytics, and service performance.
        </li>
        <li>
          <strong>End-User Data:</strong> You control the data collected from your end users. If you use the Leaderboard module,
          we store identifiers (such as playerId) and associated scores. The Relay module is designed not to persist end-user
          data.
        </li>
        <li>
          <strong>Technical Data:</strong> We may collect logs, IP addresses, and usage metadata for security, debugging, and
          abuse prevention.
        </li>
      </ul>

      <h2>2. How We Use Data</h2>
      <p>We use collected data to:</p>
      <ul>
        <li>Provide, operate, and maintain the Service</li>
        <li>Process billing and manage subscriptions</li>
        <li>Monitor performance, reliability, and security</li>
        <li>Communicate important updates and service-related notices</li>
      </ul>
      <p>We do not sell your personal data to third parties.</p>

      <h2>3. Legal Basis for Processing</h2>
      <p>If you are located in the European Economic Area (EEA), we process your data based on:</p>
      <ul>
        <li>Performance of a contract (providing the Service)</li>
        <li>Legitimate interests (security, fraud prevention, and product improvement)</li>
        <li>Compliance with legal obligations</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as necessary to provide the Service. We may retain limited
        information for legal, security, or fraud prevention purposes.
      </p>
      <p>You may request deletion of your data at any time by contacting support@turnkit.dev.</p>

      <h2>5. Data Sharing and Processors</h2>
      <p>We do not sell your data. We only share data with trusted third-party service providers where necessary, including:</p>
      <ul>
        <li>Payment processors (e.g., Merchant of Record providers such as Polar.sh or Paddle)</li>
        <li>Infrastructure and hosting providers</li>
        <li>Authentication providers (e.g., Google, GitHub)</li>
      </ul>
      <p>These providers process data in accordance with their own privacy policies.</p>

      <h2>6. International Data Transfers</h2>
      <p>
        Your data may be processed and stored on servers located outside your country of residence. Where required, we take
        appropriate safeguards to ensure your data is protected in accordance with applicable laws.
      </p>

      <h2>7. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Object to or restrict certain processing</li>
      </ul>
      <p>To exercise these rights, contact support@turnkit.dev.</p>

      <h2>8. Security</h2>
      <p>
        We implement reasonable technical and organizational measures to protect your data. However, no system is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>9. Children’s Privacy</h2>
      <p>
        The Service is not intended for use by individuals under the age of 13 (or the minimum legal age in your jurisdiction).
        We do not knowingly collect personal data from children.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Continued use of the Service after changes become effective
        constitutes acceptance of the updated policy.
      </p>

      <h2>11. Contact</h2>
      <p>If you have any questions about this Privacy Policy, you can contact us at support@turnkit.dev.</p>
    </LegalPage>
  );
}
