import { backendFetch } from '@/lib/backend-auth';

export type SetupMode = 'quick' | 'manual';
export type AuthMode = 'OPEN' | 'SIGNED' | 'TURNKIT_AUTH';
export type RelayConfigStatus = 'active' | 'inactive';

export interface GameListItem {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  autoUpgrade: boolean;
}

export interface ClientKeyRecord {
  id: string;
  displayName: string;
  keyPrefix: string;
  createdAt: string;
}

export interface SmtpSettings {
  host: string;
  port: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface LeaderboardScore {
  playerName: string;
  score: number;
  submittedAt: string;
}

export interface LeaderboardRecord {
  id: string;
  slug: string;
  displayName: string;
  sortOrder: string;
  scoreStrategy: string;
  resetFrequency: string;
  topScores: LeaderboardScore[];
}

export interface RelayConfigRecord {
  id: string;
  slug: string;
  status: RelayConfigStatus;
  maxPlayers: number;
  turnEnforcement: string;
  votingEnabled: boolean;
  votingMode: string;
  matchTimeoutMinutes: number;
  turnTimeoutSeconds: number;
}

export interface UsageBillingSnapshot {
  currentCcu: number;
  todaysPeakCcu: number;
  autoUpgrade: boolean;
  upgradeHref: string;
}

export interface GameDashboard {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  autoUpgrade: boolean;
  playerIdMode: AuthMode;
  clientKeys: ClientKeyRecord[];
  auth: {
    mode: AuthMode;
    hasSecret: boolean;
    signedSecret: string;
    smtpConfigured: boolean;
    smtp: SmtpSettings;
  };
  leaderboards: LeaderboardRecord[];
  relayConfigs: RelayConfigRecord[];
  usageBilling: UsageBillingSnapshot;
  activeModules: string[];
}

interface ApiGameKeyListItem {
  id: string;
  name: string;
  status: string;
  autoUpgrade: boolean;
  playerIdMode: AuthMode;
  createdAt: string;
}

interface ApiDashboardResponse {
  game: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
    autoUpgrade: boolean;
    playerIdMode: AuthMode;
  };
  clientKeys: Array<{
    id: string;
    displayName: string;
    keyPrefix: string;
    createdAt: string;
  }>;
  auth: {
    mode: AuthMode;
    hasSecret: boolean;
    smtpConfigured: boolean;
    smtp: null | {
      host: string;
      port: number;
      username: string;
      fromAddress: string;
      fromName: string;
    };
  };
  leaderboards: Array<{
    id: string;
    slug: string;
    displayName: string;
    sortOrder: string;
    scoreStrategy: string;
    resetFrequency: string;
  }>;
  relayConfigs: Array<{
    id: string;
    slug: string;
    maxPlayers: number;
    turnEnforcement: string;
    votingEnabled: boolean;
    votingMode: string;
    matchTimeoutMinutes: number;
    turnTimeoutSeconds: number;
  }>;
  usage: {
    currentCcu: number;
    todaysPeakCcu: number;
  };
  billing: {
    autoUpgrade: boolean;
  };
  modules: {
    activeModules: string[];
  };
}

interface ApiClientKeyResponse {
  id: string;
  displayName: string;
  keyPrefix: string;
  fullKey?: string;
}

interface ApiSecretResponse {
  secret: string;
}

async function apiFetch(path: string, init?: RequestInit) {
  return backendFetch(path, init);
}

function mapDashboardResponse(response: ApiDashboardResponse): GameDashboard {
  return {
    id: response.game.id,
    name: response.game.name,
    createdAt: response.game.createdAt,
    status: response.game.status,
    autoUpgrade: response.game.autoUpgrade,
    playerIdMode: response.game.playerIdMode,
    clientKeys: response.clientKeys.map((item) => ({
      id: item.id,
      displayName: item.displayName,
      keyPrefix: item.keyPrefix,
      createdAt: item.createdAt,
    })),
    auth: {
      mode: response.auth.mode,
      hasSecret: response.auth.hasSecret,
      signedSecret: '',
      smtpConfigured: response.auth.smtpConfigured,
      smtp: {
        host: response.auth.smtp?.host ?? '',
        port: String(response.auth.smtp?.port ?? ''),
        username: response.auth.smtp?.username ?? '',
        password: '',
        fromEmail: response.auth.smtp?.fromAddress ?? '',
        fromName: response.auth.smtp?.fromName ?? '',
      },
    },
    leaderboards: response.leaderboards.map((item) => ({
      id: item.id,
      slug: item.slug,
      displayName: item.displayName,
      sortOrder: item.sortOrder,
      scoreStrategy: item.scoreStrategy,
      resetFrequency: item.resetFrequency,
      topScores: [],
    })),
    relayConfigs: response.relayConfigs.map((item) => ({
      id: item.id,
      slug: item.slug,
      status: 'active',
      maxPlayers: item.maxPlayers,
      turnEnforcement: item.turnEnforcement,
      votingEnabled: item.votingEnabled,
      votingMode: item.votingMode,
      matchTimeoutMinutes: item.matchTimeoutMinutes,
      turnTimeoutSeconds: item.turnTimeoutSeconds,
    })),
    usageBilling: {
      currentCcu: response.usage.currentCcu,
      todaysPeakCcu: response.usage.todaysPeakCcu,
      autoUpgrade: response.billing.autoUpgrade,
      upgradeHref: '#',
    },
    activeModules: response.modules.activeModules,
  };
}

function titleizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatRelativeTime(value: string) {
  const elapsed = Date.now() - new Date(value).getTime();
  if (elapsed < 60_000) {
    return 'just now';
  }
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

export async function listGames(): Promise<GameListItem[]> {
  const games = (await apiFetch('/v1/dev/game-keys')) as ApiGameKeyListItem[];
  return games
    .map((game) => ({
      id: game.id,
      name: game.name,
      createdAt: game.createdAt,
      status: game.status,
      autoUpgrade: game.autoUpgrade,
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getGameDashboard(gameId: string): Promise<GameDashboard | null> {
  const response = (await apiFetch(`/v1/dev/game-keys/${gameId}/dashboard`)) as ApiDashboardResponse | null;
  if (!response) {
    return null;
  }
  return mapDashboardResponse(response);
}

export async function createGame(name: string, setupMode: SetupMode) {
  const normalizedName = normalizeName(name);
  if (!normalizedName) {
    throw new Error('Game name is required');
  }

  const game = (await apiFetch(`/v1/dev/game-keys?name=${encodeURIComponent(normalizedName)}`, {
    method: 'POST',
  })) as ApiGameKeyListItem;

  if (setupMode === 'quick') {
    await createClientKey(game.id, 'Default');
    await createLeaderboard(game.id, 'main', '');
    await createRelayConfig(game.id, 'main-relay', 'active');
  }

  return {
    id: game.id,
    name: game.name,
    createdAt: game.createdAt,
    status: game.status,
    autoUpgrade: game.autoUpgrade,
  };
}

export async function deleteGame(gameId: string) {
  await apiFetch(`/v1/dev/game-keys/${gameId}`, { method: 'DELETE' });
}

export async function createClientKey(gameId: string, displayName: string) {
  const normalizedName = normalizeName(displayName);
  if (!normalizedName) {
    throw new Error('Display name is required');
  }

  return (await apiFetch(
    `/v1/dev/game-keys/${gameId}/client-keys?displayName=${encodeURIComponent(normalizedName)}`,
    { method: 'POST' },
  )) as ApiClientKeyResponse;
}

export async function deleteClientKey(gameId: string, clientKeyId: string) {
  await apiFetch(`/v1/dev/game-keys/${gameId}/client-keys/${clientKeyId}`, { method: 'DELETE' });
}

export async function updateAuthSettings(gameId: string, mode: AuthMode, smtp: SmtpSettings) {
  await apiFetch(`/v1/dev/game-keys/${gameId}/player-id/mode`, {
    method: 'PUT',
    body: JSON.stringify({ mode }),
  });

  if (mode === 'TURNKIT_AUTH') {
    await apiFetch(`/v1/dev/game-keys/${gameId}/player-id/smtp`, {
      method: 'PUT',
      body: JSON.stringify({
        host: smtp.host.trim(),
        port: Number(smtp.port || 0),
        username: smtp.username.trim(),
        password: smtp.password.trim(),
        fromAddress: smtp.fromEmail.trim(),
        fromName: smtp.fromName.trim(),
      }),
    });
    return;
  }

  await apiFetch(`/v1/dev/game-keys/${gameId}/player-id/smtp`, { method: 'DELETE' }).catch(() => null);
}

export async function rotateSignedSecret(gameId: string) {
  return (await apiFetch(`/v1/dev/game-keys/${gameId}/player-id/secret/rotate`, {
    method: 'POST',
  })) as ApiSecretResponse;
}

export async function createLeaderboard(gameId: string, slug: string, description: string) {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) {
    throw new Error('Slug is required');
  }

  await apiFetch(`/v1/dev/game-keys/${gameId}/leaderboards`, {
    method: 'POST',
    body: JSON.stringify({
      slug: normalizedSlug,
      displayName: description.trim() || titleizeSlug(normalizedSlug),
      sortOrder: 'DESC',
      scoreStrategy: 'BEST_ONLY',
      minScore: 0,
      maxScore: 1000000,
      resetFrequency: 'NONE',
      archiveOnReset: false,
    }),
  });
}

export async function resetLeaderboard(gameId: string, leaderboardSlug: string) {
  await apiFetch(`/v1/dev/game-keys/${gameId}/leaderboards/${leaderboardSlug}/reset`, {
    method: 'POST',
  });
}

export async function deleteLeaderboard(gameId: string, leaderboardSlug: string) {
  await apiFetch(`/v1/dev/game-keys/${gameId}/leaderboards/${leaderboardSlug}`, {
    method: 'DELETE',
  });
}

export async function createRelayConfig(gameId: string, slug: string, _status: RelayConfigStatus) {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) {
    throw new Error('Relay config slug is required');
  }

  await apiFetch(`/v1/dev/relay-configs?gameKeyId=${encodeURIComponent(gameId)}`, {
    method: 'POST',
    body: JSON.stringify({
      slug: normalizedSlug,
      maxPlayers: 4,
      turnEnforcement: 'ROUND_ROBIN',
      ignoreAllOwnership: false,
      votingEnabled: true,
      votingMode: 'SYNC',
      votesRequired: 2,
      failAction: 'SKIP_TURN',
      matchTimeoutMinutes: 20,
      turnTimeoutSeconds: 60,
      disconnectGraceSeconds: 30,
      hiddenFields: [],
      privateStateKeys: [],
      perPlayerHiddenPaths: {},
    }),
  });
}

export async function updateRelayConfig(gameId: string, relayConfigSlug: string, nextSlug: string, _status: RelayConfigStatus) {
  const dashboard = await getGameDashboard(gameId);
  const current = dashboard?.relayConfigs.find((item) => item.slug === relayConfigSlug);
  if (!current) {
    throw new Error('Relay config not found');
  }

  const normalizedSlug = normalizeSlug(nextSlug);
  if (!normalizedSlug) {
    throw new Error('Relay config slug is required');
  }

  await apiFetch(`/v1/dev/relay-configs/${relayConfigSlug}?gameKeyId=${encodeURIComponent(gameId)}`, {
    method: 'PUT',
    body: JSON.stringify({
      slug: normalizedSlug,
      maxPlayers: current.maxPlayers,
      turnEnforcement: current.turnEnforcement,
      votingEnabled: current.votingEnabled,
      votingMode: current.votingMode,
      votesRequired: 2,
      failAction: 'SKIP_TURN',
      matchTimeoutMinutes: current.matchTimeoutMinutes,
      turnTimeoutSeconds: current.turnTimeoutSeconds,
      disconnectGraceSeconds: 30,
      hiddenFields: [],
      privateStateKeys: [],
      perPlayerHiddenPaths: {},
      ignoreAllOwnership: false,
    }),
  });
}

export async function deleteRelayConfig(gameId: string, relayConfigSlug: string) {
  await apiFetch(`/v1/dev/relay-configs/${relayConfigSlug}?gameKeyId=${encodeURIComponent(gameId)}`, {
    method: 'DELETE',
  });
}

export async function updateBillingAutoUpgrade(gameId: string, autoUpgrade: boolean) {
  await apiFetch(`/v1/dev/dashboard/${gameId}/auto-upgrade`, {
    method: 'POST',
    body: JSON.stringify({ enabled: autoUpgrade }),
  });
}
