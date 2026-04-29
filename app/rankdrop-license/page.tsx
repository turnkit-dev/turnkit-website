import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { absoluteUrl } from '@/lib/seo';

const rankdropLicenseDescription =
  'Read the RankDrop license agreement before using, modifying, or distributing the asset in personal or commercial projects.';

export const metadata: Metadata = {
  title: 'RankDrop License Agreement - TurnKit',
  description: rankdropLicenseDescription,
  alternates: {
    canonical: absoluteUrl('/rankdrop-license'),
  },
  openGraph: {
    title: 'RankDrop License Agreement - TurnKit',
    description: rankdropLicenseDescription,
    url: absoluteUrl('/rankdrop-license'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'RankDrop License Agreement - TurnKit',
    description: rankdropLicenseDescription,
  },
};

export default function RankDropLicensePage() {
  return (
    <LegalPage eyebrow="Legal" title="RankDrop License Agreement" updatedLabel="Copyright (c) 2026 Nenad Nikolic">
      <p>
        By purchasing RankDrop, you are granted a non-exclusive, non-transferable license to use this asset under the following
        conditions:
      </p>

      <h2>Permitted Use</h2>
      <p>
        You may use RankDrop in any number of personal or commercial projects. You may distribute RankDrop as part of a compiled
        game or application, provided that the source code and original files are not exposed or accessible to end users.
      </p>

      <h2>Modifications</h2>
      <p>You may modify the source code to suit the needs of your specific projects.</p>

      <h2>Restrictions</h2>
      <p>
        You may not redistribute, resell, sublicense, or share RankDrop, in whole or in part, as a standalone asset, plugin,
        template, library, or as part of any competing product, whether modified or not.
      </p>

      <h2>No Warranty</h2>
      <p>
        The asset is provided &quot;as is&quot;, without warranty of any kind. The author shall not be liable for any claims or damages
        arising from the use of this software.
      </p>
    </LegalPage>
  );
}
