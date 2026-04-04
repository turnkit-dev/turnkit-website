import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewGameModal, DeleteGameButton } from '@/components/dashboard-game-controls';
import { CopyButton } from '@/components/dashboard-ui';
import { DashboardPageFrame } from '@/components/dashboard-shell';
import { BackendAuthError } from '@/lib/backend-auth';
import { formatRelativeTime, listGames } from '@/lib/dashboard';

export default async function GamesPage() {
  noStore();
  const games = await listGames().catch((error) => {
    if (error instanceof BackendAuthError) {
      redirect('/signin?callbackUrl=%2Fgames');
    }
    throw error;
  });

  if (games.length === 1) {
    redirect(`/game/${games[0].id}`);
  }

  return (
    <DashboardPageFrame>
      <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Dashboard</div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] font-bold tracking-[-0.03em] text-text">Games</h1>
            <p className="mt-3 max-w-[560px] text-[14px] leading-[1.7] text-muted">
              Create a game, copy ids, and open the full dashboard for auth, leaderboards, relay configs, and billing.
            </p>
          </div>
          <NewGameModal />
        </div>

        {games.length === 0 ? (
          <div className="rounded border border-dashed border-border2 bg-surface px-8 py-16 text-center">
            <div className="font-display text-[26px] font-semibold tracking-[-0.02em] text-text">Create your first game</div>
            <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-[1.7] text-muted">
              There are no games yet. Start with a quick setup or create an empty game and configure it manually.
            </p>
            <div className="mt-6 flex justify-center">
              <NewGameModal />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {games.map((game) => (
              <article key={game.id} className="rounded border border-border bg-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-text">{game.name}</h2>
                    <p className="mt-2 text-[12px] text-muted">
                      {game.status} · Created {formatRelativeTime(game.createdAt)}
                    </p>
                  </div>
                  <DeleteGameButton gameId={game.id} label="Delete" />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3 rounded border border-border2 bg-bg px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Game ID</div>
                    <div className="mt-1 truncate font-mono text-[13px] text-text">{game.id}</div>
                  </div>
                  <CopyButton value={game.id} />
                </div>
                <div className="mt-6">
                  <Link href={`/game/${game.id}`} className="inline-flex items-center rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2">
                    Open Dashboard
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardPageFrame>
  );
}
