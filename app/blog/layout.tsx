import { MarketingShell } from '@/components/marketing-shell';

export default async function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MarketingShell footerLayout="docs">
      <div className="pt-[60px]">{children}</div>
    </MarketingShell>
  );
}
