'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createClientKey,
  createGame,
  createLeaderboard,
  createRelayConfig,
  deleteClientKey,
  deleteGame,
  deleteLeaderboard,
  deleteRelayConfig,
  resetLeaderboard,
  rotateSignedSecret,
  updateAuthSettings,
  updateBillingAutoUpgrade,
  updateRelayConfig,
  type AuthMode,
  type RelayConfigStatus,
  type SetupMode,
} from '@/lib/dashboard';
import { initialDashboardActionState, type DashboardActionState } from '@/lib/dashboard-action-state';
import { BackendAuthError, buildSignInPath } from '@/lib/backend-auth';

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '');
}

function readRequiredString(formData: FormData, key: string) {
  const value = readString(formData, key).trim();
  if (!value) {
    throw new Error(`${key} is required`);
  }
  return value;
}

function readGameId(formData: FormData) {
  return readRequiredString(formData, 'gameId');
}

function refreshGamePaths(gameId: string) {
  revalidatePath('/games');
  revalidatePath(`/game/${gameId}`);
}

function successState(message: string, extra?: Partial<DashboardActionState>): DashboardActionState {
  return {
    ...initialDashboardActionState,
    ...extra,
    status: 'success',
    message,
    timestamp: Date.now(),
  };
}

function errorState(error: unknown, fallback: string, callbackPath?: string): DashboardActionState {
  if (error instanceof BackendAuthError) {
    return {
      ...initialDashboardActionState,
      status: 'error',
      message: error.message,
      timestamp: Date.now(),
      reauthPath: callbackPath ? buildSignInPath(callbackPath) : undefined,
    };
  }

  if (error instanceof Error && error.message) {
    return {
      ...initialDashboardActionState,
      status: 'error',
      message: error.message,
      timestamp: Date.now(),
    };
  }

  return {
    ...initialDashboardActionState,
    status: 'error',
    message: fallback,
    timestamp: Date.now(),
  };
}

export async function createGameAction(formData: FormData) {
  const name = readRequiredString(formData, 'name');
  const setupMode = (readString(formData, 'setupMode') === 'manual' ? 'manual' : 'quick') as SetupMode;
  const game = await createGame(name, setupMode);
  refreshGamePaths(game.id);
  redirect(`/game/${game.id}`);
}

export async function deleteGameAction(formData: FormData) {
  const gameId = readGameId(formData);
  await deleteGame(gameId);
  revalidatePath('/games');
  redirect('/games');
}

export async function createClientKeyAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const displayName = readRequiredString(formData, 'displayName');
    const key = await createClientKey(gameId, displayName);
    refreshGamePaths(gameId);
    return successState('Client key created.', { fullKey: key.fullKey ?? '' });
  } catch (error) {
    return errorState(error, 'Failed to create client key.', `/game/${readGameId(formData)}`);
  }
}

export async function deleteClientKeyAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const clientKeyId = readRequiredString(formData, 'clientKeyId');
    await deleteClientKey(gameId, clientKeyId);
    refreshGamePaths(gameId);
    return successState('Client key deleted.');
  } catch (error) {
    return errorState(error, 'Failed to delete client key.', `/game/${readGameId(formData)}`);
  }
}

export async function updateAuthSettingsAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const mode = (readString(formData, 'mode') || 'OPEN') as AuthMode;
    await updateAuthSettings(gameId, mode, {
      host: readString(formData, 'host'),
      port: readString(formData, 'port'),
      username: readString(formData, 'username'),
      password: readString(formData, 'password'),
      fromEmail: readString(formData, 'fromEmail'),
      fromName: readString(formData, 'fromName'),
    });
    refreshGamePaths(gameId);
    return successState('Auth settings saved.');
  } catch (error) {
    return errorState(error, 'Failed to save auth settings.', `/game/${readGameId(formData)}`);
  }
}

export async function rotateSignedSecretAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const result = await rotateSignedSecret(gameId);
    refreshGamePaths(gameId);
    return successState('Signed secret updated.', { signedSecret: result.secret ?? '' });
  } catch (error) {
    return errorState(error, 'Failed to update signed secret.', `/game/${readGameId(formData)}`);
  }
}

export async function createLeaderboardAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const slug = readRequiredString(formData, 'slug');
    const description = readString(formData, 'description');
    await createLeaderboard(gameId, slug, description);
    refreshGamePaths(gameId);
    return successState('Leaderboard created.');
  } catch (error) {
    return errorState(error, 'Failed to create leaderboard.', `/game/${readGameId(formData)}`);
  }
}

export async function resetLeaderboardAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const leaderboardSlug = readRequiredString(formData, 'leaderboardSlug');
    await resetLeaderboard(gameId, leaderboardSlug);
    refreshGamePaths(gameId);
    return successState('Leaderboard reset.');
  } catch (error) {
    return errorState(error, 'Failed to reset leaderboard.', `/game/${readGameId(formData)}`);
  }
}

export async function deleteLeaderboardAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const leaderboardSlug = readRequiredString(formData, 'leaderboardSlug');
    await deleteLeaderboard(gameId, leaderboardSlug);
    refreshGamePaths(gameId);
    return successState('Leaderboard deleted.');
  } catch (error) {
    return errorState(error, 'Failed to delete leaderboard.', `/game/${readGameId(formData)}`);
  }
}

export async function createRelayConfigAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const name = readRequiredString(formData, 'name');
    const status = (readString(formData, 'status') === 'inactive' ? 'inactive' : 'active') as RelayConfigStatus;
    await createRelayConfig(gameId, name, status);
    refreshGamePaths(gameId);
    return successState('Relay config created.');
  } catch (error) {
    return errorState(error, 'Failed to create relay config.', `/game/${readGameId(formData)}`);
  }
}

export async function updateRelayConfigAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const relayConfigSlug = readRequiredString(formData, 'relayConfigSlug');
    const name = readRequiredString(formData, 'name');
    const status = (readString(formData, 'status') === 'inactive' ? 'inactive' : 'active') as RelayConfigStatus;
    await updateRelayConfig(gameId, relayConfigSlug, name, status);
    refreshGamePaths(gameId);
    return successState('Relay config saved.');
  } catch (error) {
    return errorState(error, 'Failed to save relay config.', `/game/${readGameId(formData)}`);
  }
}

export async function deleteRelayConfigAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const relayConfigSlug = readRequiredString(formData, 'relayConfigSlug');
    await deleteRelayConfig(gameId, relayConfigSlug);
    refreshGamePaths(gameId);
    return successState('Relay config deleted.');
  } catch (error) {
    return errorState(error, 'Failed to delete relay config.', `/game/${readGameId(formData)}`);
  }
}

export async function updateBillingAutoUpgradeAction(_previousState: DashboardActionState, formData: FormData) {
  try {
    const gameId = readGameId(formData);
    const autoUpgrade = formData.get('autoUpgrade') === 'on';
    await updateBillingAutoUpgrade(gameId, autoUpgrade);
    refreshGamePaths(gameId);
    return successState('Billing settings saved.');
  } catch (error) {
    return errorState(error, 'Failed to save billing settings.', `/game/${readGameId(formData)}`);
  }
}
