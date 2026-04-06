import { backendFetch } from '@/lib/backend-auth';

export type SetupMode = 'quick' | 'manual';
export type AuthMode = 'OPEN' | 'SIGNED' | 'TURNKIT_AUTH';
export type TurnEnforcement = 'ROUND_ROBIN' | 'FREE';
export type VotingMode = 'SYNC' | 'ASYNC';
export type FailAction = 'SKIP_TURN' | 'END_GAME';

export interface RelayListConfigRecord {
  id?: string;
  name: string;
  tag: string;
  ownerSlots: number[];
  visibleToSlots: number[];
}

export interface RelayConfigInput {
  slug: string;
  maxPlayers: number;
  turnEnforcement: TurnEnforcement;
  ignoreAllOwnership: boolean;
  votingEnabled: boolean;
  votingMode: VotingMode;
  votesRequired: number;
  votesToFail: number;
  failAction: FailAction;
  matchTimeoutMinutes: number;
  turnTimeoutSeconds: number;
  waitReconnectSeconds: number;
  lists: RelayListConfigRecord[];
}

export class MissingGameKeyError extends Error {
  constructor(message = 'Game key not found') {
    super(message);
    this.name = 'MissingGameKeyError';
  }
}

export interface GameListItem {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  autoUpgrade: boolean;
  generatedClientKey?: string;
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
  maxPlayers: number;
  turnEnforcement: TurnEnforcement;
  ignoreAllOwnership: boolean;
  votingEnabled: boolean;
  votingMode: VotingMode;
  votesRequired: number;
  votesToFail: number;
  failAction: FailAction;
  matchTimeoutMinutes: number;
  turnTimeoutSeconds: number;
  waitReconnectSeconds: number;
  lists: RelayListConfigRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface UsageBillingSnapshot {
  currentCcu: number;
  todaysPeakCcu: number;
  thisMonthPeakCcu: number;
  currentPlanCcu: number;
  tiers: Record<string, string>;
  tierLimits: Record<string, number>;
  burstActive: boolean;
  burstExpiresAt: string;
  burstUsedAt: string;
  burstUsedThisMonth: boolean;
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
  usage: {
    currentCcu: number;
    todaysPeakCcu: number;
    thisMonthPeakCcu?: number;
  };
  billing: {
    autoUpgrade: boolean;
    tiers?: Record<string, string>;
    tierLimits?: Record<string, number>;
    burstActive?: boolean;
    burstExpiresAt?: string;
    burstUsedAt?: string;
    burstUsedThisMonth?: boolean;
  };
  modules: {
    activeModules: string[];
  };
}

interface ApiRelayListResponse {
  id?: string;
  name: string;
  tag: string;
  ownerSlots: number[];
  visibleSlots?: number[];
  visibleToSlots: number[];
}

interface ApiRelayConfigResponse {
  id: string;
  slug: string;
  maxPlayers: number;
  turnEnforcement: TurnEnforcement;
  ignoreAllOwnership: boolean;
  votingEnabled: boolean;
  votingMode: VotingMode;
  votesRequired: number;
  votesToFail: number;
  failAction: FailAction;
  matchTimeoutMinutes: number;
  turnTimeoutSeconds: number;
  waitReconnectSeconds: number;
  lists: ApiRelayListResponse[];
  createdAt?: string;
  updatedAt?: string;
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

interface ApiProjectSetupResponse {
  gameKey: {
    id: string;
    name: string;
  };
  relayConfigs: ApiRelayConfigResponse[];
  wasCreated: boolean;
  generatedClientKey?: string;
}

async function apiFetch(path: string, init?: RequestInit) {
  return backendFetch(path, init);
}

function getCurrentPlanCcu(tierLimits: Record<string, number> | undefined) {
  return Math.max(0, ...Object.values(tierLimits ?? {}).filter((value) => Number.isFinite(value)));
}

function mapRelayConfig(item: ApiRelayConfigResponse): RelayConfigRecord {
  return {
    id: item.id,
    slug: item.slug,
    maxPlayers: item.maxPlayers,
    turnEnforcement: item.turnEnforcement,
    ignoreAllOwnership: item.ignoreAllOwnership,
    votingEnabled: item.votingEnabled,
    votingMode: item.votingMode,
    votesRequired: item.votesRequired,
    votesToFail: item.votesToFail,
    failAction: item.failAction,
    matchTimeoutMinutes: item.matchTimeoutMinutes,
    turnTimeoutSeconds: item.turnTimeoutSeconds,
    waitReconnectSeconds: item.waitReconnectSeconds,
    lists: item.lists.map((list) => ({
      id: list.id,
      name: list.name,
      tag: list.tag,
      ownerSlots: list.ownerSlots ?? [],
      visibleToSlots: list.visibleToSlots ?? list.visibleSlots ?? [],
    })),
    createdAt: item.createdAt ?? '',
    updatedAt: item.updatedAt ?? '',
  };
}

function mapDashboardResponse(response: ApiDashboardResponse, relayConfigs: ApiRelayConfigResponse[]): GameDashboard {
  const tierLimits = response.billing.tierLimits ?? {};

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
    relayConfigs: relayConfigs.map(mapRelayConfig),
    usageBilling: {
      currentCcu: response.usage.currentCcu,
      todaysPeakCcu: response.usage.todaysPeakCcu,
      thisMonthPeakCcu: response.usage.thisMonthPeakCcu ?? response.usage.todaysPeakCcu,
      currentPlanCcu: getCurrentPlanCcu(tierLimits),
      tiers: response.billing.tiers ?? {},
      tierLimits,
      burstActive: response.billing.burstActive ?? false,
      burstExpiresAt: response.billing.burstExpiresAt ?? '',
      burstUsedAt: response.billing.burstUsedAt ?? '',
      burstUsedThisMonth: response.billing.burstUsedThisMonth ?? false,
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

function parseApiErrorMessage(message: string) {
  try {
    const parsed = JSON.parse(message) as { detail?: string; message?: string; title?: string };
    return parsed.detail || parsed.message || parsed.title || message;
  } catch {
    return message;
  }
}

function isMissingGameKeyError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }
  const message = parseApiErrorMessage(error.message).toLowerCase();
  return message.includes('game key not found');
}

function sanitizeRelayLists(lists: RelayListConfigRecord[], maxPlayers: number) {
  return lists.map((list) => ({
    name: list.name.trim(),
    tag: list.tag.trim(),
    ownerSlots: [...new Set((list.ownerSlots ?? []).filter((slot) => Number.isInteger(slot) && slot >= 1 && slot <= maxPlayers))].sort((a, b) => a - b),
    visibleToSlots: [...new Set((list.visibleToSlots ?? []).filter((slot) => Number.isInteger(slot) && slot >= 1 && slot <= maxPlayers))].sort((a, b) => a - b),
  }));
}

function normalizeRelayConfigInput(input: RelayConfigInput) {
  const normalizedSlug = normalizeSlug(input.slug);
  if (!normalizedSlug) {
    throw new Error('Relay config slug is required');
  }

  const maxPlayers = Math.min(8, Math.max(2, Math.trunc(input.maxPlayers)));
  const votingCap = Math.min(3, maxPlayers);

  return {
    slug: normalizedSlug,
    maxPlayers,
    turnEnforcement: input.turnEnforcement,
    ignoreAllOwnership: input.ignoreAllOwnership,
    votingEnabled: input.votingEnabled,
    votingMode: input.votingMode,
    votesRequired: Math.min(votingCap, Math.max(1, Math.trunc(input.votesRequired))),
    votesToFail: Math.min(votingCap, Math.max(1, Math.trunc(input.votesToFail))),
    failAction: input.failAction,
    matchTimeoutMinutes: Math.max(1, Math.trunc(input.matchTimeoutMinutes)),
    turnTimeoutSeconds: Math.max(1, Math.trunc(input.turnTimeoutSeconds)),
    waitReconnectSeconds: Math.max(1, Math.trunc(input.waitReconnectSeconds)),
    lists: sanitizeRelayLists(input.lists ?? [], maxPlayers),
  } satisfies RelayConfigInput;
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
  try {
    const response = (await apiFetch(`/v1/dev/game-keys/${gameId}/dashboard`)) as ApiDashboardResponse | null;
    if (!response) {
      return null;
    }
    const relayConfigs = ((await apiFetch(`/v1/dev/relay-configs?gameKeyId=${encodeURIComponent(gameId)}`)) as ApiRelayConfigResponse[] | null) ?? [];
    return mapDashboardResponse(response, relayConfigs);
  } catch (error) {
    if (isMissingGameKeyError(error)) {
      throw new MissingGameKeyError(parseApiErrorMessage((error as Error).message));
    }
    throw error;
  }
}

export async function createGame(name: string, setupMode: SetupMode) {
  const normalizedName = normalizeName(name);
  if (!normalizedName) {
    throw new Error('Game name is required');
  }

  if (setupMode === 'quick') {
    const project = (await apiFetch('/v1/dev/project-setup', {
      method: 'POST',
      body: JSON.stringify({
        projectName: normalizedName,
      }),
    })) as ApiProjectSetupResponse;

    return {
      id: project.gameKey.id,
      name: project.gameKey.name,
      createdAt: '',
      status: project.wasCreated ? 'ACTIVE' : 'EXISTING',
      autoUpgrade: false,
      generatedClientKey: project.generatedClientKey ?? '',
    };
  }

  const game = (await apiFetch(`/v1/dev/game-keys?name=${encodeURIComponent(normalizedName)}`, {
    method: 'POST',
  })) as ApiGameKeyListItem;

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

export async function createRelayConfig(gameId: string, input: RelayConfigInput) {
  const payload = normalizeRelayConfigInput(input);
  await apiFetch(`/v1/dev/relay-configs?gameKeyId=${encodeURIComponent(gameId)}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateRelayConfig(gameId: string, relayConfigSlug: string, input: RelayConfigInput) {
  const current = (await apiFetch(`/v1/dev/relay-configs/${relayConfigSlug}?gameKeyId=${encodeURIComponent(gameId)}`)) as ApiRelayConfigResponse | null;
  if (!current) {
    throw new Error('Relay config not found');
  }

  const payload = normalizeRelayConfigInput(input);
  await apiFetch(`/v1/dev/relay-configs/${relayConfigSlug}?gameKeyId=${encodeURIComponent(gameId)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
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
