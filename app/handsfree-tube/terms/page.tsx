import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const termsDescription =
  'com.handsfree.tube terms: license, lawful use, playback controls, purchases, disclaimers, liability limits, and governing law.';

export const metadata: Metadata = {
  title: 'com.handsfree.tube Terms of Service',
  description: termsDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-tube/terms'),
  },
  openGraph: {
    title: 'com.handsfree.tube Terms of Service',
    description: termsDescription,
    url: absoluteUrl('/handsfree-tube/terms'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.tube Terms of Service',
    description: termsDescription,
  },
};

export default function HandsFreeTubeTermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="com.handsfree.tube Terms of Service"
      updatedLabel="Last updated: June 11, 2026"
    >
      <p>These Terms govern your use of com.handsfree.tube.</p>

      <h2>1. Acceptance</h2>
      <p>By using the app, you agree to these Terms and the Privacy Policy.</p>

      <h2>2. License</h2>
      <p>NN Game Studio grants you a limited, non-exclusive, revocable license to use the app for personal and lawful use.</p>

      <h2>3. Playback and User Content</h2>
      <p>
        You are responsible for the YouTube content you choose to play and for complying with YouTube&apos;s terms and applicable
        laws.
      </p>
      <p>
        You are responsible for reviewing playback actions and for ensuring that any voice commands or favorites you create are
        appropriate for your use.
      </p>

      <h2>4. Prohibited Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>violate laws or regulations</li>
        <li>misuse or attempt to disrupt the app</li>
        <li>reverse engineer the app except where permitted by law</li>
        <li>use the app for unlawful surveillance or harmful activity</li>
      </ul>

      <h2>5. Premium Features and Purchases</h2>
      <p>The app may offer premium access through rewarded advertisements and one-time Google Play Billing purchases.</p>
      <p>Purchases, refunds, and payment processing are handled by Google Play and subject to Google&apos;s policies.</p>

      <h2>6. Availability</h2>
      <p>The app is provided &quot;as is&quot; and &quot;as available.&quot;</p>
      <p>We do not guarantee uninterrupted operation, error-free functionality, or compatibility with all devices.</p>
      <p>Features may change, be added, or removed over time.</p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, NN Game Studio is not liable for indirect, incidental, or consequential damages
        arising from use of the app.
      </p>
      <p>You are responsible for maintaining backups of important playback settings and favorites.</p>

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

      <h2>Related Legal Page</h2>
      <p>
        Read the <Link href="/handsfree-tube/privacy">com.handsfree.tube Privacy Policy</Link>.
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.handsfree.tube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Download on Google Play
          </a>
        </li>
        <li>
          <Link
            href="/handsfree-tube"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Hands Free Voice Tube
          </Link>
        </li>
        <li>
          <Link
            href="/handsfree-tube/privacy"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/other-projects"
            className="text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]"
          >
            Other Projects
          </Link>
        </li>
      </ul>
    </LegalPage>
  );
}
