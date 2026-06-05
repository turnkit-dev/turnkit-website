'use client';

interface QueueOpenRelaySessionResponse {
  ok: boolean;
  session?: TurnKitRelayDemoSessionResponse;
  error?: string;
  debug?: {
    version?: string;
    apiBaseUrl?: string;
    relaySlug?: string;
    playerId?: string;
    forwardedBody?: {
      slug?: string;
      fillPolicy?: string;
    };
    upstream?: {
      sessionId?: string;
      slot?: number;
      status?: string;
    };
  };
}

interface CreateRelayClientOptions {
  apiBaseUrl: string;
  relayToken: string;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: string) => void;
  onMessage?: (message: TurnKitRelayServerMessage) => void;
  onPulse?: (timestamp: number) => void;
  onPong?: (timestamp: number) => void;
}

export interface TurnKitRelayDemoSessionResponse {
  sessionId: string;
  slot: number;
  relayToken: string;
  status: string;
  playerId: string;
  apiBaseUrl: string;
}

export interface TurnKitRelayDemoDebugInfo {
  version?: string;
  apiBaseUrl?: string;
  relaySlug?: string;
  playerId?: string;
  forwardedBody?: {
    slug?: string;
    fillPolicy?: string;
  };
  upstream?: {
    sessionId?: string;
    slot?: number;
    status?: string;
  };
}

export interface TurnKitRelayPlayer {
  playerId: string;
  slot: number;
}

export interface TurnKitMatchStartedMessage {
  type: 'MATCH_STARTED';
  sessionId: string;
  players: TurnKitRelayPlayer[];
  yourTurn?: boolean;
  activePlayerId?: string;
  activePlayer?: string;
  serverMoveNumber?: number;
  move?: number;
}

export interface TurnKitMoveMadeMessage {
  type: 'MOVE_MADE';
  actingPlayerId?: string;
  playerId?: string;
  moveNumber: number;
  json?: unknown;
  payload?: unknown;
  data?: unknown;
}

export interface TurnKitTurnChangedMessage {
  type: 'TURN_STARTED' | 'TURN_CHANGED';
  activePlayerId?: string;
  activePlayer?: string;
  yourTurn?: boolean;
  moveNumber?: number;
  move?: number;
}

export interface TurnKitVoteFailedMessage {
  type: 'VOTE_FAILED';
  moveNumber?: number;
  reason?: string;
  failAction?: string;
}

export interface TurnKitMoveRequestedForPlayerMessage {
  type: 'MOVE_REQUESTED_FOR_PLAYER';
  delegateFor?: string;
  delegateForSlot?: number;
}

export interface TurnKitPrivateListsRevealedMessage {
  type: 'PRIVATE_LISTS_REVEALED';
  playerSlot?: number;
}

export interface TurnKitGameEndedMessage {
  type: 'GAME_ENDED';
  reason?: string;
  winnerPlayerId?: string;
}

export interface TurnKitErrorMessage {
  type: 'ERROR';
  code?: string;
  message?: string;
  serverMoveNumber?: number;
  move?: number;
}

export type TurnKitRelayServerMessage =
  | TurnKitMatchStartedMessage
  | TurnKitMoveMadeMessage
  | TurnKitTurnChangedMessage
  | TurnKitMoveRequestedForPlayerMessage
  | TurnKitPrivateListsRevealedMessage
  | TurnKitVoteFailedMessage
  | TurnKitGameEndedMessage
  | ({ type: 'PONG' })
  | ({ type: 'SYNC_COMPLETE'; serverMoveNumber?: number })
  | TurnKitErrorMessage
  | ({ type: string } & Record<string, unknown>);

type TurnKitRelayClientCommand =
  | {
      type: 'MOVE';
      json?: unknown;
      payload?: unknown;
      data?: unknown;
      shouldEndMyTurn?: boolean;
      endTurn?: boolean;
      actions?: unknown[];
      delegated?: boolean;
      delegateFor?: string | number;
    }
  | { type: 'VOTE'; moveNumber: number; isValid: boolean }
  | { type: 'PING' }
  | { type: 'RECONNECT'; lastMoveNumber: number }
  | { type: 'END_GAME' };

function toWebSocketUrl(apiBaseUrl: string, relayToken: string) {
  const normalized = apiBaseUrl.replace(/\/+$/, '');
  const url = new URL(`${normalized}/v1/client/relay/ws`);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.searchParams.set('token', relayToken);
  return url.toString();
}

class TurnKitRelayBrowserClient {
  private readonly options: CreateRelayClientOptions;
  private socket: WebSocket | null = null;
  private heartbeatTimer: number | null = null;

  constructor(options: CreateRelayClientOptions) {
    this.options = options;
  }

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const socket = new WebSocket(toWebSocketUrl(this.options.apiBaseUrl, this.options.relayToken));
    this.socket = socket;

    socket.addEventListener('open', () => {
      this.options.onOpen?.();
      this.startHeartbeat();
    });

    socket.addEventListener('close', () => {
      this.stopHeartbeat();
      if (this.socket === socket) {
        this.socket = null;
      }
      this.options.onClose?.();
    });

    socket.addEventListener('error', () => {
      this.options.onError?.('WebSocket connection failed.');
    });

    socket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(String(event.data)) as TurnKitRelayServerMessage;
        if (message.type === 'PONG') {
          this.options.onPong?.(Date.now());
        }
        if (message.type === 'ERROR') {
          const error = message as TurnKitErrorMessage;
          this.options.onError?.(error.message || error.code || 'Relay error.');
        }
        this.options.onMessage?.(message);
      } catch {
        this.options.onError?.('Received malformed relay payload.');
      }
    });
  }

  disconnect() {
    this.stopHeartbeat();
    this.socket?.close();
    this.socket = null;
  }

  send(command: TurnKitRelayClientCommand) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('Relay socket is not connected.');
    }

    this.socket.send(JSON.stringify(command));
  }

  sendMove(json: unknown, shouldEndMyTurn = true) {
    this.send({
      type: 'MOVE',
      json,
      payload: json,
      data: json,
      shouldEndMyTurn,
      endTurn: shouldEndMyTurn,
    });
  }

  vote(moveNumber: number, isValid: boolean) {
    this.send({
      type: 'VOTE',
      moveNumber,
      isValid,
    });
  }

  endGame() {
    this.send({ type: 'END_GAME' });
  }

  private ping() {
    this.send({ type: 'PING' });
    this.options.onPulse?.(Date.now());
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.ping();
    this.heartbeatTimer = window.setInterval(() => {
      try {
        this.ping();
      } catch {
        this.stopHeartbeat();
      }
    }, 10_000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer !== null) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

export async function queueOpenRelaySession() {
  const response = await fetch('/api/demos/tictactoe/session', {
    method: 'POST',
  });

  const payload = (await response.json()) as QueueOpenRelaySessionResponse;

  if (!response.ok || !payload.ok || !payload.session) {
    throw new Error(payload.error || 'Queue request failed.');
  }

  return {
    session: payload.session,
    debug: payload.debug,
  };
}

export function createRelayClient(options: CreateRelayClientOptions) {
  return new TurnKitRelayBrowserClient({
    apiBaseUrl: options.apiBaseUrl,
    relayToken: options.relayToken,
    onOpen: options.onOpen,
    onClose: () => options.onClose?.(),
    onError: options.onError,
    onMessage: options.onMessage,
    onPulse: options.onPulse,
    onPong: options.onPong,
  });
}

