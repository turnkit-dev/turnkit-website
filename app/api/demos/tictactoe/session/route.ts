import { NextResponse } from 'next/server';
import { getTicTacToeDemoPublicConfig, getTicTacToeDemoServerConfig } from '@/lib/turnkit-demo-config';
import type { TurnKitRelayDemoSessionResponse, TurnKitRelayQueueResponse } from '@/types/turnkit-relay-demo';

const demoDebugVersion = '2026-06-05-live-demo-queue-debug';

function createDemoPlayerId() {
  return `web-demo-${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
}

async function readBackendError(response: Response) {
  const text = await response.text();
  if (!text) {
    return `Backend queue request failed with ${response.status}.`;
  }

  try {
    const json = JSON.parse(text) as { message?: string; error?: string };
    return json.message || json.error || text;
  } catch {
    return text;
  }
}

export async function POST() {
  const config = getTicTacToeDemoServerConfig();
  const publicConfig = getTicTacToeDemoPublicConfig();
  const playerId = createDemoPlayerId();
  const queueBody = {
    slug: config.relaySlug,
    fillPolicy: 'REQUIRE_ALL_PLAYERS',
  } as const;

  if (!config.isReady) {
    const response = NextResponse.json(
      {
        ok: false,
        error: 'Live demo is not configured yet. Set TURNKIT_DEMO_TICTACTOE_CLIENT_KEY and TURNKIT_DEMO_TICTACTOE_RELAY_SLUG.',
        debug: {
          version: demoDebugVersion,
          apiBaseUrl: config.apiBaseUrl,
          relaySlug: config.relaySlug,
          forwardedBody: queueBody,
        },
      },
      { status: 503 },
    );
    response.headers.set('X-TurnKit-Demo-Debug-Version', demoDebugVersion);
    return response;
  }

  const response = await fetch(`${config.apiBaseUrl}/v1/client/relay/queue`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.clientKey}`,
      'Content-Type': 'application/json',
      'X-Player-Id': playerId,
    },
    body: JSON.stringify(queueBody),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await readBackendError(response);
    const errorResponse = NextResponse.json(
      {
        ok: false,
        error,
        debug: {
          version: demoDebugVersion,
          apiBaseUrl: config.apiBaseUrl,
          relaySlug: config.relaySlug,
          playerId,
          forwardedBody: queueBody,
          upstreamStatus: response.status,
        },
      },
      { status: response.status },
    );
    errorResponse.headers.set('X-TurnKit-Demo-Debug-Version', demoDebugVersion);
    return errorResponse;
  }

  const payload = (await response.json()) as TurnKitRelayQueueResponse;
  const session: TurnKitRelayDemoSessionResponse = {
    ...payload,
    apiBaseUrl: publicConfig.apiBaseUrl,
    playerId,
  };

  const successResponse = NextResponse.json({
    ok: true,
    session,
    debug: {
      version: demoDebugVersion,
      apiBaseUrl: config.apiBaseUrl,
      relaySlug: config.relaySlug,
      playerId,
      forwardedBody: queueBody,
      upstream: {
        sessionId: payload.sessionId,
        slot: payload.slot,
        status: payload.status,
      },
    },
  });
  successResponse.headers.set('X-TurnKit-Demo-Debug-Version', demoDebugVersion);
  return successResponse;
}
