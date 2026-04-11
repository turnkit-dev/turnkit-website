import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

const refundsDescription = 'Check TurnKit refund rules before you subscribe so guarantees, downtime credits, and usage charges are clear.';

export const metadata: Metadata = {
  title: 'Refund Policy - TurnKit',
  description: refundsDescription,
  alternates: {
    canonical: '/refunds',
  },
  openGraph: {
    title: 'Refund Policy - TurnKit',
    description: refundsDescription,
    url: 'https://turnkit.dev/refunds',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy - TurnKit',
    description: refundsDescription,
  },
};

export default function RefundsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund Policy" updatedLabel="Last Updated: April 2026">
      <h2>1. 14-Day Guarantee</h2>
      <p>
        We offer a full refund for any initial subscription purchase made within the last 14 days, provided you have not exceeded the
        CCU limits of your chosen tier during that period.
      </p>

      <h2>2. Usage-Based Charges</h2>
      <p>
        Refunds are generally not provided for mid-month cancellations or for charges resulting from auto-upgrade features if they
        were explicitly enabled by the user.
      </p>

      <h2>3. Service Downtime</h2>
      <p>
        In the event of a significant, verified service interruption exceeding 12 consecutive hours, users may be eligible for a
        pro-rated credit or refund at our discretion.
      </p>

      <h2>4. How to Request a Refund</h2>
      <p>To request a refund, please contact support@turnkit.dev from the email address associated with your account.</p>
    </LegalPage>
  );
}
