import Image from 'next/image';
import Link from 'next/link';
import { DashboardToaster } from '@/components/dashboard-ui';
import { PublicAccountMenu } from '@/components/public-account-menu';
import { getAuthSession } from '@/lib/auth';
import { getUserInitials } from '@/lib/user-initials';

export interface DashboardShellSection {
  href: string;
  label: string;
}

export interface DashboardShellGameLink {
  id: string;
  name: string;
}

export async function DashboardTopNav() {
  const session = await getAuthSession();
  const user = session?.user;
  const initials = getUserInitials(user?.name, user?.email);

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-border bg-[rgba(8,12,16,0.85)] px-3 sm:px-[clamp(16px,4vw,32px)] backdrop-blur-xl">
      <Link href="/" className="flex min-w-0 items-center gap-2 font-display text-[16px] font-extrabold tracking-[-0.02em] text-text sm:text-[18px]">
        <Image
          src="/assets/logo.png"
          alt="TurnKit logo"
          width={32}
          height={32}
          className="h-8 w-8 drop-shadow-[0_0_6px_rgba(61,214,140,0.4)]"
        />
        <span className="hidden sm:inline">
          Turn<span className="text-accent">Kit</span>
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/games" className="text-[13px] text-text">
          Games
        </Link>
        <Link href="/docs" className="text-[13px] text-muted transition hover:text-text">
          Docs
        </Link>
        {session ? <PublicAccountMenu initials={initials} name={user?.name} email={user?.email} /> : null}
      </div>
    </nav>
  );
}

export function DashboardPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardTopNav />
      <DashboardToaster />
      <div className="pt-[60px]">{children}</div>
    </>
  );
}

interface GameDashboardShellProps {
  games: DashboardShellGameLink[];
  currentGameId: string;
  sections: DashboardShellSection[];
  children: React.ReactNode;
}

export function GameDashboardShell({ games, currentGameId, sections, children }: GameDashboardShellProps) {
  return (
    <>
      <DashboardTopNav />
      <DashboardToaster />
      <div className="mx-auto flex w-full max-w-[1400px] px-0 pt-[60px]">
        <aside className="hidden w-[260px] shrink-0 xl:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[260px] overflow-y-auto border-r border-border bg-bg px-6 py-8"
            style={{ left: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-faint">Games</div>
            <div className="flex flex-col gap-1">
              <Link href="/games" className="mb-2 rounded-[3px] px-3 py-2 text-[13px] text-muted transition hover:bg-surface hover:text-text">
                All Games
              </Link>
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={`/game/${game.id}`}
                  className={
                    game.id === currentGameId
                      ? 'rounded-[3px] bg-[rgba(47,156,235,0.15)] px-3 py-2 text-[13px] text-accent'
                      : 'rounded-[3px] px-3 py-2 text-[13px] text-muted transition hover:bg-surface hover:text-text'
                  }
                >
                  {game.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 md:px-[clamp(24px,5vw,64px)] md:py-10 xl:max-w-[900px]">{children}</main>
        <aside className="hidden w-[220px] shrink-0 xl:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
            style={{ right: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <a key={section.href} href={section.href} className="border-l-2 border-transparent pl-3 text-xs text-muted transition hover:text-text">
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
