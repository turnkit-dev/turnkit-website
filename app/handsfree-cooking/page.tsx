import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const description =
  'Hands Free Cooking is an offline recipe app that lets you cook hands-free with voice commands, starter recipes, URL import, and immersive cooking mode.';

export const metadata: Metadata = {
  title: 'Hands Free Cooking Offline',
  description,
  alternates: {
    canonical: absoluteUrl('/handsfree-cooking'),
  },
  openGraph: {
    title: 'Hands Free Cooking Offline',
    description,
    url: absoluteUrl('/handsfree-cooking'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hands Free Cooking Offline',
    description,
  },
};

const linkClassName =
  'text-[#7fc4ff] underline decoration-[rgba(127,196,255,0.45)] underline-offset-[0.18em] transition hover:text-[#b2ddff]';

export default function HandsFreeCookingPage() {
  return (
    <LegalPage eyebrow="App" title="Hands Free Cooking Offline" updatedLabel="Last updated: June 22, 2026">
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.handsfree.cooking"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Download on Google Play
        </a>
      </p>

      <p>
        Hands Free Cooking is the essential offline app for anyone who cooks with messy or dirty hands. No more stopping to
        wash hands just to tap your phone screen. Follow recipes hands-free using simple voice commands while keeping your
        device clean and safe.
      </p>

      <h2>Why You Need This App</h2>
      <ul>
        <li>Tired of greasy fingerprints on your phone?</li>
        <li>Frustrated switching between recipe steps with wet or sticky hands?</li>
        <li>Want to cook more confidently without interruptions?</li>
      </ul>

      <h2>Key Features</h2>
      <ul>
        <li>15 ready-to-use starter recipes.</li>
        <li>Create new recipes and edit existing ones.</li>
        <li>Import any recipe URL instantly.</li>
        <li>Sort recipes by update date, cooking time, or name.</li>
        <li>Immersive Cooking Mode with easy next/previous navigation.</li>
        <li>Start from ingredients list or instructions, with a customizable preference.</li>
        <li>
          Powerful voice commands including &quot;next&quot;, &quot;back&quot;, &quot;repeat&quot;, &quot;timer&quot;,
          &quot;ingredients&quot;, &quot;instructions&quot;, &quot;step 3&quot;, and &quot;amount of flour&quot;.
        </li>
      </ul>

      <p>
        Completely offline once recipes are saved. Perfect for busy parents preparing family meals, home cooks experimenting
        with new dishes, beginners learning step-by-step, or anyone who values a practical, uninterrupted cooking experience.
      </p>
      <p>Stop fighting with your phone in the kitchen. Hands Free Cooking makes every session smoother and more enjoyable.</p>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href="/handsfree-cooking/privacy" className={linkClassName}>
            Privacy Policy
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
