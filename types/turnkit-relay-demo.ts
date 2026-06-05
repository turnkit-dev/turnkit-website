export interface TurnKitRelayQueueResponse {
  sessionId: string;
  slot: number;
  relayToken: string;
  status: string;
}

export interface TurnKitRelayDemoSessionResponse {
  sessionId: string;
  slot: number;
  relayToken: string;
  status: string;
  playerId: string;
  apiBaseUrl: string;
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
  serverMoveNumber?: number;
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
  yourTurn?: boolean;
  moveNumber?: number;
}

export interface TurnKitVoteFailedMessage {
  type: 'VOTE_FAILED';
  moveNumber?: number;
  reason?: string;
  failAction?: string;
}

export interface TurnKitGameEndedMessage {
  type: 'GAME_ENDED';
  reason?: string;
  winnerPlayerId?: string;
}

export interface TurnKitPongMessage {
  type: 'PONG';
}

export interface TurnKitSyncCompleteMessage {
  type: 'SYNC_COMPLETE';
  serverMoveNumber?: number;
}

export interface TurnKitErrorMessage {
  type: 'ERROR';
  code?: string;
  message?: string;
  serverMoveNumber?: number;
}

export type TurnKitRelayServerMessage =
  | TurnKitMatchStartedMessage
  | TurnKitMoveMadeMessage
  | TurnKitTurnChangedMessage
  | TurnKitVoteFailedMessage
  | TurnKitGameEndedMessage
  | TurnKitPongMessage
  | TurnKitSyncCompleteMessage
  | TurnKitErrorMessage
  | ({ type: string } & Record<string, unknown>);

export interface TurnKitRelayMoveCommand {
  type: 'MOVE';
  json?: unknown;
  payload?: unknown;
  data?: unknown;
  shouldEndMyTurn?: boolean;
  endTurn?: boolean;
  actions?: unknown[];
}

export interface TurnKitRelayVoteCommand {
  type: 'VOTE';
  moveNumber: number;
  isValid: boolean;
}

export interface TurnKitRelayPingCommand {
  type: 'PING';
}

export interface TurnKitRelayReconnectCommand {
  type: 'RECONNECT';
  lastMoveNumber: number;
}

export interface TurnKitRelayEndGameCommand {
  type: 'END_GAME';
}

export type TurnKitRelayClientCommand =
  | TurnKitRelayMoveCommand
  | TurnKitRelayVoteCommand
  | TurnKitRelayPingCommand
  | TurnKitRelayReconnectCommand
  | TurnKitRelayEndGameCommand;

