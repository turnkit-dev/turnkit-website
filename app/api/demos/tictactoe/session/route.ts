import { NextResponse } from 'next/server';
import { getTicTacToeDemoServerConfig } from '@/lib/turnkit-demo-config';
import type { TurnKitRelayDemoSessionResponse, TurnKitRelayQueueResponse } from '@/types/turnkit-relay-demo';

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
  const playerId = createDemoPlayerId();

  if (!config.isReady) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Live demo is not configured yet. Set TURNKIT_DEMO_TICTACTOE_CLIENT_KEY and TURNKIT_DEMO_TICTACTOE_RELAY_SLUG.',
      },
      { status: 503 },
    );
  }

  const response = await fetch(`${config.apiBaseUrl}/v1/client/relay/queue`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.clientKey}`,
      'Content-Type': 'application/json',
      'X-Player-Id': playerId,
    },
    body: JSON.stringify({
      slug: config.relaySlug,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: await readBackendError(response),
      },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as TurnKitRelayQueueResponse;
  const session: TurnKitRelayDemoSessionResponse = {
    ...payload,
    playerId,
  };

  return NextResponse.json({
    ok: true,
    session,
  });
}
