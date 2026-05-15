import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const termsDescription =
  'Hands Free Notes - Offline terms: license, lawful use, purchases, rewarded ads, disclaimers, liability limits, and governing law.';

export const metadata: Metadata = {
  title: 'Hands Free Notes - Offline Terms of Service',
  description: termsDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-notes/terms'),
  },
  openGraph: {
    title: 'Hands Free Notes - Offline Terms of Service',
    description: termsDescription,
    url: absoluteUrl('/handsfree-notes/terms'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hands Free Notes - Offline Terms of Service',
    description: termsDescription,
  },
};

export default function HandsFreeNotesTermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Hands Free Notes - Offline Terms of Service"
      updatedLabel="Last updated: May 15, 2026"
    >
      <p>These Terms govern your use of Hands Free Notes - Offline.</p>

      <h2>1. Acceptance</h2>
      <p>By using the app, you agree to these Terms and the Privacy Policy.</p>

      <h2>2. License</h2>
      <p>NN Game Studio grants you a limited, non-exclusive, revocable license to use the app for personal and lawful use.</p>

      <h2>3. User Content</h2>
      <p>You retain ownership of your recordings, notes, and transcripts.</p>
      <p>You are responsible for:</p>
      <ul>
        <li>complying with applicable laws</li>
        <li>obtaining consent when recording others</li>
        <li>ensuring lawful use of the app</li>
      </ul>

      <h2>4. Prohibited Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>violate laws or regulations</li>
        <li>misuse or attempt to disrupt the app</li>
        <li>reverse engineer the app except where permitted by law</li>
        <li>use the app for unlawful surveillance or harmful activity</li>
      </ul>

      <h2>5. Premium Features and Purchases</h2>
      <p>The app may offer premium features through one-time purchases using Google Play Billing.</p>
      <p>Purchases, refunds, and payment processing are handled by Google Play and subject to Google&apos;s policies.</p>
      <p>Rewarded advertisements may temporarily unlock certain premium functionality.</p>

      <h2>6. Availability</h2>
      <p>The app is provided &quot;as is&quot; and &quot;as available.&quot;</p>
      <p>
        We do not guarantee uninterrupted operation, error-free functionality, or compatibility with all devices.
      </p>
      <p>Features may change, be added, or removed over time.</p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, NN Game Studio is not liable for indirect, incidental, or consequential damages
        arising from use of the app.
      </p>
      <p>You are responsible for maintaining backups of important recordings and notes.</p>

      <h2>8. Termination</h2>
      <p>You may stop using the app at any time.</p>
      <p>We may suspend or terminate access to premium functionality if required by law or in cases of abuse or fraud.</p>

      <h2>9. Governing Law</h2>
      <p>These Terms are governed by the laws of Serbia.</p>

      <h2>10. Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email: support@turnkit.dev
        <br />
        Country: Serbia
      </p>
    </LegalPage>
  );
}
