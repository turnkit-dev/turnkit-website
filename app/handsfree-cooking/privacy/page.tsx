import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const privacyDescription =
  'com.handsfree.cooking privacy policy: local recipe storage, offline voice features, recipe URL import, and crash diagnostics.';

export const metadata: Metadata = {
  title: 'com.handsfree.cooking Privacy Policy',
  description: privacyDescription,
  alternates: {
    canonical: absoluteUrl('/handsfree-cooking/privacy'),
  },
  openGraph: {
    title: 'com.handsfree.cooking Privacy Policy',
    description: privacyDescription,
    url: absoluteUrl('/handsfree-cooking/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'com.handsfree.cooking Privacy Policy',
    description: privacyDescription,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function HandsFreeCookingPrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="com.handsfree.cooking Privacy Policy" updatedLabel="Last updated: June 22, 2026">
      <p>
        com.handsfree.cooking (&quot;the app&quot;) is provided by NN Game Studio. This Privacy Policy explains how the app
        handles information and data.
      </p>

      <h2>1. Data Storage and Processing</h2>
      <p>Hands Free Cooking is designed as an offline application.</p>
      <p>
        Recipes, ingredients, instructions, cooking preferences, and related content created or saved in the app are stored
        locally on your device. The app does not upload your recipes or cooking data to our servers.
      </p>
      <p>Voice-control features are processed locally on-device using offline speech recognition technology.</p>
      <p>
        If you choose to import a recipe from a URL, the app connects to the webpage you provide to retrieve recipe content for
        local use inside the app.
      </p>

      <h2>2. Permissions</h2>
      <p>The app may request the following permissions:</p>
      <ul>
        <li>Microphone access: used for hands-free voice commands while cooking.</li>
        <li>Internet access: used only when you choose to import recipes from a web URL.</li>
        <li>Notification permission: used for timers and app functionality.</li>
      </ul>
      <p>Permissions are optional and can be controlled through your device settings.</p>

      <h2>3. Data Collection</h2>
      <p>We do not create user accounts and do not directly collect personal information such as:</p>
      <ul>
        <li>names</li>
        <li>email addresses</li>
        <li>cloud-synced recipe libraries</li>
        <li>remote backups</li>
      </ul>
      <p>
        The app uses Firebase Crashlytics for crash diagnostics. Crashlytics may collect technical crash data, such as device
        model, OS version, app version, timestamps, and stack traces, to help identify and fix stability issues.
      </p>
      <p>At this time, the app does not use cloud accounts, analytics tracking, or external account systems.</p>

      <h2>4. Data Security</h2>
      <p>
        Because your recipes and app data remain on your device, you are responsible for securing access to your device and
        backups.
      </p>
      <p>While reasonable care is taken during development, no software can guarantee complete security.</p>

      <h2>5. Children&apos;s Privacy</h2>
      <p>The app is not directed toward children under 13.</p>

      <h2>6. Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Updated versions will be posted with a revised &quot;Last
        updated&quot; date.
      </p>

      <h2>7. Contact</h2>
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
        <Link href="/handsfree-cooking/terms" className={linkClassName}>
          com.handsfree.cooking Terms of Service
        </Link>
        .
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/handsfree-cooking" className={linkClassName}>
            Hands Free Cooking Offline
          </Link>
        </li>
        <li>
          <Link href="/handsfree-cooking/terms" className={linkClassName}>
            Terms of Service
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
