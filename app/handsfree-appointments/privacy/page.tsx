import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'com.handsfree.appointments privacy policy: local appointment processing, Google Calendar sync, required permissions, and billing/ads disclosures.';

export const metadata: Metadata = {
  title: 'com.handsfree.appointments Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-appointments/privacy'),
  },
  openGraph: {
    title: 'com.handsfree.appointments Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/handsfree-appointments/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.appointments Privacy Policy',
    description: privacyDescription,
  },
};

export default function HandsFreeAppointmentsPrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="com.handsfree.appointments Privacy Policy"
      updatedLabel="Last updated: May 26, 2026"
    >
      <p>
        com.handsfree.appointments (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app
        handles information and data.
      </p>

      <h2>1. Data Storage and Processing</h2>
      <p>
        Appointment text you speak and app preferences are processed on your device for scheduling functionality.
      </p>
      <p>
        Calendar events are written to your connected Google Calendar account only when you explicitly use scheduling features.
      </p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Microphone access: used to capture spoken appointment input.</li>
        <li>Calendar access: used to create and manage events in your calendar.</li>
        <li>Notification permission: used for event reminders and app functionality.</li>
      </ul>
      <p>Permissions are optional and can be controlled through your device settings.</p>

      <h2>3. Google Services</h2>
      <p>
        If you connect Google Calendar, the app accesses calendar scopes required to create events and keep your schedule in sync.
      </p>
      <p>Your use of Google services is also subject to Google&apos;s terms and privacy policies.</p>

      <h2>4. In-App Purchases and Advertising</h2>
      <p>
        The app may include optional premium features through Google Play Billing and may display ads via Google AdMob.
      </p>
      <p>
        Google services may collect device and usage data under Google&apos;s policies. We do not receive or store your payment
        card details.
      </p>

      <h2>5. Data Collection</h2>
      <p>We do not require user account registration with NN Game Studio.</p>
      <p>
        The app may use Firebase Crashlytics for crash diagnostics, which can include technical information such as device model,
        OS version, app version, and stack traces.
      </p>

      <h2>6. Data Security</h2>
      <p>We apply reasonable safeguards, but no software can guarantee absolute security.</p>
      <p>You are responsible for securing access to your device and Google account.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>The app is not directed toward children under 13.</p>

      <h2>8. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be posted with a revised &quot;Last updated&quot;
        date.
      </p>

      <h2>9. Contact</h2>
      <p>
        Operator: NN Game Studio
        <br />
        Email: support@turnkit.dev
        <br />
        Country: Serbia
      </p>

      <h2>Related Legal Page</h2>
      <p>
        Read the <Link href="/handsfree-appointments/terms">com.handsfree.appointments Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
