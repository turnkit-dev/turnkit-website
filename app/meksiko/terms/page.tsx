import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const termsDescription =
  'Meksiko terms: license, lawful use, online matches, leaderboard services, purchases, disclaimers, and liability limits.';

export const metadata: Metadata = {
  title: 'Meksiko Terms of Service',
  description: termsDescription,
  alternates: {
    canonical: absoluteUrl('/meksiko/terms'),
  },
  openGraph: {
    title: 'Meksiko Terms of Service',
    description: termsDescription,
    url: absoluteUrl('/meksiko/terms'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meksiko Terms of Service',
    description: termsDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function MeksikoTermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Meksiko Terms of Service" updatedLabel="Last updated: July 3, 2026">
      <p>These Terms govern your use of Meksiko.</p>

      <h2>1. Acceptance</h2>
      <p>By using the app, you agree to these Terms and the Privacy Policy.</p>

      <h2>2. License</h2>
      <p>NN Game Studio grants you a limited, non-exclusive, revocable license to use the app for personal and lawful use.</p>

      <h2>3. Online Matches and Gameplay</h2>
      <p>
        You are responsible for how you use the app, including your conduct in multiplayer matches, chat or profile features if introduced,
        and any account or device you use to access the service.
      </p>
      <p>You are responsible for maintaining access to a compatible device and internet connection for online play.</p>

      <h2>4. Prohibited Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>violate laws or regulations</li>
        <li>misuse, exploit, cheat, or attempt to disrupt the app or online matches</li>
        <li>reverse engineer the app except where permitted by law</li>
        <li>use the app for fraud, abuse, harassment, or other harmful activity</li>
      </ul>

      <h2>5. Premium Features and Purchases</h2>
      <p>The app may offer premium features or purchases through Google Play Billing.</p>
      <p>Purchases, refunds, and payment processing are handled by Google Play and subject to Google&apos;s policies.</p>

      <h2>6. Availability</h2>
      <p>The app is provided &quot;as is&quot; and &quot;as available.&quot;</p>
      <p>We do not guarantee uninterrupted operation, error-free functionality, successful matchmaking, or compatibility with all devices.</p>
      <p>Features may change, be added, or removed over time.</p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, NN Game Studio is not liable for indirect, incidental, or consequential damages arising
        from use of the app.
      </p>
      <p>You are responsible for your own device security, account access, and internet connectivity.</p>

      <h2>8. Termination</h2>
      <p>You may stop using the app at any time.</p>
      <p>We may suspend or terminate access to online or premium functionality if required by law or in cases of abuse, cheating, or fraud.</p>

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

      <h2>Related Legal Page</h2>
      <p>
        Read the{' '}
        <Link href="/meksiko/privacy" className={linkClassName}>
          Meksiko Privacy Policy
        </Link>
        .
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/meksiko/privacy" className={linkClassName}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/other-projects" className={linkClassName}>
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
