const defaultPublicApiBaseUrl = 'https://api.turnkit.dev';
const defaultServerApiBaseUrl = 'http://localhost:8080';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getTurnKitPublicApiBaseUrl() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_TURNKIT_API_BASE_URL || defaultPublicApiBaseUrl);
}

export function getTurnKitServerApiBaseUrl() {
  return trimTrailingSlash(process.env.TURNKIT_API_BASE_URL || process.env.NEXT_PUBLIC_TURNKIT_API_BASE_URL || defaultServerApiBaseUrl);
}

export function getTurnKitDemoBrowserApiBaseUrl() {
  return trimTrailingSlash(process.env.TURNKIT_DEMO_BROWSER_API_BASE_URL || process.env.TURNKIT_API_BASE_URL || process.env.NEXT_PUBLIC_TURNKIT_API_BASE_URL || defaultServerApiBaseUrl);
}

export function getTicTacToeDemoServerConfig() {
  const clientKey = process.env.TURNKIT_DEMO_TICTACTOE_CLIENT_KEY?.trim() || '';
  const relaySlug = process.env.TURNKIT_DEMO_TICTACTOE_RELAY_SLUG?.trim() || '';

  return {
    apiBaseUrl: getTurnKitServerApiBaseUrl(),
    clientKey,
    relaySlug,
    isReady: clientKey.length > 0 && relaySlug.length > 0,
  };
}

export function getTicTacToeDemoPublicConfig() {
  const relaySlug = process.env.TURNKIT_DEMO_TICTACTOE_RELAY_SLUG?.trim() || '';

  return {
    apiBaseUrl: getTurnKitDemoBrowserApiBaseUrl(),
    relaySlug,
    isReady: relaySlug.length > 0,
  };
}
