'use client';

import dynamic from 'next/dynamic';

const TicTacToeLiveDemoClient = dynamic(
  () => import('@/components/live-demo/tictactoe-live-demo-client').then((module) => module.TicTacToeLiveDemoClient),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[8px] border border-border bg-surface p-5 shadow-[0_18px_80px_rgba(0,0,0,0.18)]">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-[220px] rounded-[6px] bg-surface2" />
          <div className="h-24 rounded-[8px] bg-surface2" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-[360px] rounded-[8px] bg-surface2" />
            <div className="h-[360px] rounded-[8px] bg-surface2" />
          </div>
        </div>
      </div>
    ),
  },
);

interface TicTacToeLiveDemoProps {
  apiBaseUrl: string;
  isConfigured: boolean;
}

export function TicTacToeLiveDemo({ apiBaseUrl, isConfigured }: TicTacToeLiveDemoProps) {
  return <TicTacToeLiveDemoClient apiBaseUrl={apiBaseUrl} isConfigured={isConfigured} />;
}
