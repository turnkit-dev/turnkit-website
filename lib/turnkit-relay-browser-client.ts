'use client';

import type {
  TurnKitErrorMessage,
  TurnKitRelayClientCommand,
  TurnKitRelayServerMessage,
} from '@/types/turnkit-relay-demo';

interface TurnKitRelayBrowserClientOptions {
  apiBaseUrl: string;
  relayToken: string;
  heartbeatIntervalMs?: number;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: string) => void;
  onMessage?: (message: TurnKitRelayServerMessage) => void;
  onPulse?: (timestamp: number) => void;
  onPong?: (timestamp: number) => void;
}

function toWebSocketUrl(apiBaseUrl: string, relayToken: string) {
  const normalized = apiBaseUrl.replace(/\/+$/, '');
  const url = new URL(`${normalized}/v1/client/relay/ws`);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.searchParams.set('token', relayToken);
  return url.toString();
}

export class TurnKitRelayBrowserClient {
  private readonly options: TurnKitRelayBrowserClientOptions;
  private socket: WebSocket | null = null;
  private heartbeatTimer: number | null = null;

  constructor(options: TurnKitRelayBrowserClientOptions) {
    this.options = {
      heartbeatIntervalMs: 10_000,
      ...options,
    };
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

    socket.addEventListener('close', (event) => {
      this.stopHeartbeat();
      if (this.socket === socket) {
        this.socket = null;
      }
      this.options.onClose?.(event);
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
      shouldEndMyTurn,
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

  ping() {
    this.send({ type: 'PING' });
    this.options.onPulse?.(Date.now());
  }

  reconnect(lastMoveNumber: number) {
    this.send({
      type: 'RECONNECT',
      lastMoveNumber,
    });
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
    }, this.options.heartbeatIntervalMs);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer !== null) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

