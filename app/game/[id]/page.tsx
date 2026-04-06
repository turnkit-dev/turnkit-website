import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  AuthSecurityForm,
  BillingAutoUpgradeForm,
  DeleteLeaderboardButton,
  DeleteRelayConfigButton,
  NewLeaderboardModal,
  RelayConfigModal,
  ResetLeaderboardButton,
  ViewLeaderboardButton,
} from '@/components/dashboard-config-controls';
import { DeleteClientKeyButton, DeleteGameButton, NewClientKeyModal } from '@/components/dashboard-game-controls';
import { GameDashboardShell } from '@/components/dashboard-shell';
import { CopyButton } from '@/components/dashboard-ui';
import { BackendAuthError, buildSignInPath } from '@/lib/backend-auth';
import { formatRelativeTime, getGameDashboard, listGames, MissingGameKeyError } from '@/lib/dashboard';

const sections = [
  { href: '#client-keys', label: 'Client Keys' },
  { href: '#auth-security', label: 'Player Authentication Mode' },
  { href: '#leaderboards', label: 'Leaderboards' },
  { href: '#relay-configs', label: 'Relay Configs' },
  { href: '#usage-billing', label: 'Usage & Billing' },
];

const hiddenBillingModules = new Set(['PLAYER_STORE', 'MATCHMAKING']);

function formatModuleName(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

function formatBurstExpiresAt(value: string) {
  if (!value) {
    return 'Not active';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not active';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function SectionCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-8 scroll-mt-24 rounded border border-border bg-surface">
      <div className="border-b border-border px-6 py-4">
        <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-text">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function DashboardTable({
  headers,
  children,
  emptyMessage,
}: {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}) {
  const rows = Array.isArray(children) ? children : children ? [children] : [];

  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="min-w-full border-collapse bg-surface">
        <thead className="bg-surface2 text-[11px] uppercase tracking-[0.08em] text-faint">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border px-4 py-3 text-left font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-[14px] text-muted">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function DashboardCell({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <td className={`border-b border-border px-4 py-3 text-[13px] ${align === 'right' ? 'text-right' : 'text-left'}`}>{children}</td>;
}

export default async function GameDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  noStore();
  const { id } = await params;
  const [game, games] = await Promise.all([getGameDashboard(id), listGames()]).catch((error) => {
    if (error instanceof BackendAuthError) {
      redirect(buildSignInPath(`/game/${id}`));
    }
    if (error instanceof MissingGameKeyError) {
      redirect('/games');
    }
    throw error;
  });

  if (!game) {
    notFound();
  }

  const visibleModules = game.activeModules.filter((module) => !hiddenBillingModules.has(module));

  return (
    <GameDashboardShell games={games.map((item) => ({ id: item.id, name: item.name }))} currentGameId={game.id} sections={sections}>
      <div className="mb-8">
        <Link href="/games" className="inline-flex items-center text-[13px] text-muted transition hover:text-text">
          {'<-'} All Games
        </Link>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Game Dashboard</div>
            <h1 className="font-display text-[clamp(30px,5vw,42px)] font-bold tracking-[-0.03em] text-text">{game.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-border2 bg-bg px-4 py-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Game ID</div>
                <div className="mt-1 font-mono text-[13px] text-text">{game.id}</div>
              </div>
              <CopyButton value={game.id} />
            </div>
            <p className="mt-3 text-[13px] text-muted">Created {formatRelativeTime(game.createdAt)}</p>
          </div>
          <DeleteGameButton gameId={game.id} />
        </div>
      </div>

      <SectionCard id="client-keys" title="Client Keys">
        <DashboardTable headers={['Display Name', 'Prefix', 'Actions']} emptyMessage="No client keys yet.">
          {game.clientKeys.map((record) => (
            <tr key={record.id}>
              <DashboardCell>
                <span className="text-text">{record.displayName}</span>
              </DashboardCell>
              <DashboardCell>
                <span className="font-mono text-text">{record.keyPrefix}</span>
              </DashboardCell>
              <DashboardCell>
                <DeleteClientKeyButton gameId={game.id} clientKeyId={record.id} />
              </DashboardCell>
            </tr>
          ))}
        </DashboardTable>
        <div className="mt-5">
          <NewClientKeyModal gameId={game.id} />
        </div>
      </SectionCard>

      <SectionCard id="auth-security" title="Player Authentication Mode">
        <AuthSecurityForm
          gameId={game.id}
          mode={game.auth.mode}
          hasSecret={game.auth.hasSecret}
          signedSecret={game.auth.signedSecret}
          smtp={game.auth.smtp}
        />
      </SectionCard>

      <SectionCard id="leaderboards" title="Leaderboards">
        <DashboardTable headers={['Slug', 'Reset Frequency', 'Actions']} emptyMessage="No leaderboards yet.">
          {game.leaderboards.map((leaderboard) => (
            <tr key={leaderboard.id}>
              <DashboardCell>
                <span className="text-text">{leaderboard.slug}</span>
              </DashboardCell>
              <DashboardCell>
                <span className="text-muted">{leaderboard.resetFrequency}</span>
              </DashboardCell>
              <DashboardCell>
                <div className="flex flex-wrap items-center gap-2">
                  <ViewLeaderboardButton leaderboard={leaderboard} />
                  <ResetLeaderboardButton gameId={game.id} leaderboardId={leaderboard.slug} />
                  <DeleteLeaderboardButton gameId={game.id} leaderboardId={leaderboard.slug} />
                </div>
              </DashboardCell>
            </tr>
          ))}
        </DashboardTable>
        <div className="mt-5">
          <NewLeaderboardModal gameId={game.id} />
        </div>
      </SectionCard>

      <SectionCard id="relay-configs" title="Relay Configs">
        <DashboardTable headers={['Slug', 'Max Players', 'Turn Enforcement', 'Lists', 'Actions']} emptyMessage="No relay configs yet.">
          {game.relayConfigs.map((relayConfig) => (
            <tr key={relayConfig.id}>
              <DashboardCell>
                <span className="text-text">{relayConfig.slug}</span>
              </DashboardCell>
              <DashboardCell>
                <span className="text-text">{relayConfig.maxPlayers}</span>
              </DashboardCell>
              <DashboardCell>
                <span className="text-muted">{relayConfig.turnEnforcement}</span>
              </DashboardCell>
              <DashboardCell>
                <span className="text-muted">{relayConfig.lists.length}</span>
              </DashboardCell>
              <DashboardCell>
                <div className="flex flex-wrap items-center gap-2">
                  <RelayConfigModal gameId={game.id} relayConfig={relayConfig} />
                  <DeleteRelayConfigButton gameId={game.id} relayConfigId={relayConfig.slug} />
                </div>
              </DashboardCell>
            </tr>
          ))}
        </DashboardTable>
        <div className="mt-5">
          <RelayConfigModal gameId={game.id} />
        </div>
      </SectionCard>

      <SectionCard id="usage-billing" title="Usage & Billing">
        <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded border border-border2 bg-bg px-4 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Current Plan</div>
            <div className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] text-text">{game.usageBilling.currentPlanCcu} CCU</div>
          </div>
          <div className="rounded border border-border2 bg-bg px-4 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">This Month Peak</div>
            <div className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] text-text">{game.usageBilling.thisMonthPeakCcu}</div>
          </div>
          <div className="rounded border border-border2 bg-bg px-4 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Today Peak</div>
            <div className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] text-text">{game.usageBilling.todaysPeakCcu}</div>
          </div>
          <div className="rounded border border-border2 bg-bg px-4 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Current Amount</div>
            <div className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] text-text">{game.usageBilling.currentCcu}</div>
          </div>
          <div className="rounded border border-border2 bg-bg px-4 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
              {game.usageBilling.burstActive ? 'Burst Expires At' : 'Burst Status'}
            </div>
            <div className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] text-text">
              {game.usageBilling.burstActive ? formatBurstExpiresAt(game.usageBilling.burstExpiresAt) : 'Inactive'}
            </div>
            <div className="mt-2 text-[12px] text-muted">Used this month: {game.usageBilling.burstUsedThisMonth ? 'Yes' : 'No'}</div>
          </div>
          <div className="rounded border border-border2 bg-bg px-4 py-4 md:col-span-2 xl:col-span-1">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Active Modules</div>
            {visibleModules.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {visibleModules.map((module) => (
                  <span key={module} className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-text">
                    {formatModuleName(module)}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-[14px] text-muted">No active modules.</div>
            )}
          </div>
        </div>
        <BillingAutoUpgradeForm gameId={game.id} autoUpgrade={game.usageBilling.autoUpgrade} upgradeHref={game.usageBilling.upgradeHref} />
      </SectionCard>
    </GameDashboardShell>
  );
}
