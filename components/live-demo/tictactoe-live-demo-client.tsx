'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createRelayClient,
  queueOpenRelaySession,
  type TurnKitGameEndedMessage,
  type TurnKitMatchStartedMessage,
  type TurnKitMoveMadeMessage,
  type TurnKitRelayServerMessage,
  type TurnKitTurnChangedMessage,
  type TurnKitVoteFailedMessage,
} from '@/lib/turnkit-browser-sdk';

type DemoSeatKey = 'playerA' | 'playerB';

interface DemoSeatState {
  key: DemoSeatKey;
  title: string;
  slot: number | null;
  playerId: string;
  connected: boolean;
  matchStarted: boolean;
  yourTurn: boolean;
  status: string;
  lastPulseAt: number | null;
  lastPongAt: number | null;
  lastError: string | null;
}

interface DemoPanelProps {
  children: React.ReactNode;
}

interface DemoBoardProps {
  title: string;
  subtitle: string;
  cells: string[];
  allowOccupiedCellMove?: boolean;
  disabled?: boolean;
  statusTone?: 'neutral' | 'active' | 'success' | 'danger';
  onToggleAllowOccupiedCellMove?: (nextValue: boolean) => void;
  onCellClick?: (index: number) => void;
}

const boardSize = 9;
const seatOrder: DemoSeatKey[] = ['playerA', 'playerB'];
const statusToneClassName: Record<NonNullable<DemoBoardProps['statusTone']>, string> = {
  neutral: 'border-border2 bg-surface2 text-muted',
  active: 'border-[rgba(47,156,235,0.35)] bg-[rgba(47,156,235,0.1)] text-accent',
  success: 'border-[rgba(61,214,140,0.35)] bg-[rgba(61,214,140,0.1)] text-green',
  danger: 'border-[rgba(240,164,41,0.35)] bg-[rgba(240,164,41,0.1)] text-amber',
};
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createEmptyBoard() {
  return Array.from({ length: boardSize }, () => '');
}

function detectWinner(board: string[]) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return value;
    }
  }
  return null;
}

function isMoveValidForBoard(board: string[], winner: string | null, cellIndex: number | null) {
  return cellIndex !== null && cellIndex >= 0 && cellIndex < boardSize && board[cellIndex] === '' && winner === null;
}

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) {
    return 'Not yet';
  }
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp);
}

function formatLogEntry(scope: string, message: string) {
  const timestamp = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

  return `${timestamp}  [${scope}] ${message}`;
}

function readCellIndex(payload: unknown) {
  if (typeof payload === 'number' && Number.isInteger(payload)) {
    return payload;
  }
  if (typeof payload === 'string') {
    const parsed = Number.parseInt(payload, 10);
    return Number.isInteger(parsed) ? parsed : null;
  }
  if (payload && typeof payload === 'object') {
    const candidate = (payload as { cellIndex?: unknown; index?: unknown }).cellIndex ?? (payload as { index?: unknown }).index;
    if (typeof candidate === 'number' && Number.isInteger(candidate)) {
      return candidate;
    }
    if (typeof candidate === 'string') {
      const parsed = Number.parseInt(candidate, 10);
      return Number.isInteger(parsed) ? parsed : null;
    }
  }
  return null;
}

function readMovePayload(message: TurnKitMoveMadeMessage) {
  return message.json ?? message.payload ?? message.data ?? null;
}

function readActivePlayerId(message: TurnKitMatchStartedMessage | TurnKitTurnChangedMessage) {
  return message.activePlayerId ?? message.activePlayer ?? null;
}

function readServerMoveNumber(message: TurnKitMatchStartedMessage | TurnKitTurnChangedMessage) {
  const moveNumber = 'serverMoveNumber' in message ? message.serverMoveNumber : undefined;
  return moveNumber ?? message.move ?? null;
}

function readActingPlayerId(message: TurnKitMoveMadeMessage) {
  return message.actingPlayerId ?? message.playerId ?? null;
}

function readCommittedMoveNumber(message: TurnKitMoveMadeMessage) {
  return message.moveNumber ?? message.move ?? null;
}

function readErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected demo failure.';
}

function createSeatState(key: DemoSeatKey, title: string): DemoSeatState {
  return {
    key,
    title,
    slot: null,
    playerId: '',
    connected: false,
    matchStarted: false,
    yourTurn: false,
    status: 'Waiting to queue',
    lastPulseAt: null,
    lastPongAt: null,
    lastError: null,
  };
}

function initialSeats() {
  return {
    playerA: createSeatState('playerA', 'Player One'),
    playerB: createSeatState('playerB', 'Player Two'),
  } satisfies Record<DemoSeatKey, DemoSeatState>;
}

function useEvent<TArgs extends unknown[], TResult>(handler: (...args: TArgs) => TResult) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: TArgs) => handlerRef.current(...args), []);
}

function DemoPanel({ children }: DemoPanelProps) {
  return <section className="rounded-[8px] border border-border bg-surface p-5 shadow-[0_18px_80px_rgba(0,0,0,0.18)]">{children}</section>;
}

function DemoBoard({
  title,
  subtitle,
  cells,
  allowOccupiedCellMove = false,
  disabled = false,
  statusTone = 'neutral',
  onToggleAllowOccupiedCellMove,
  onCellClick,
}: DemoBoardProps) {
  return (
    <div className="rounded-[8px] border border-border bg-[rgba(8,12,16,0.6)] p-3 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
        <div className="space-y-2">
          <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-text sm:text-[18px]">{title}</h3>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">{subtitle}</p>
          <label className="inline-flex items-center gap-2 text-[11px] text-muted sm:text-[12px]">
            <input
              type="checkbox"
              checked={allowOccupiedCellMove}
              onChange={(event) => onToggleAllowOccupiedCellMove?.(event.target.checked)}
              className="h-3.5 w-3.5 rounded border-border2 bg-surface2 accent-accent"
            />
            <span>Enable cheat mode (place on occupied cell)</span>
          </label>
        </div>
        <div className={`rounded-[999px] border px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-[11px] ${statusToneClassName[statusTone]}`}>
          {disabled ? 'Locked' : 'Live'}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {cells.map((value, index) => (
          <button
            key={`${title}-${index}`}
            type="button"
            disabled={disabled || !onCellClick}
            onClick={() => onCellClick?.(index)}
            className="aspect-square min-h-[72px] rounded-[6px] border border-border2 bg-surface2 font-display text-[clamp(26px,10vw,42px)] font-semibold tracking-[-0.04em] text-text transition hover:border-accent2 hover:bg-[rgba(47,156,235,0.08)] disabled:cursor-not-allowed disabled:hover:border-border2 disabled:hover:bg-surface2 sm:min-h-[88px]"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TicTacToeLiveDemoClient() {
  const [board, setBoard] = useState<string[]>(() => createEmptyBoard());
  const [phase, setPhase] = useState<'idle' | 'queueing' | 'live' | 'ended' | 'error'>('idle');
  const [status, setStatus] = useState('Queue two browser clients and let the relay drive the match.');
  const [winner, setWinner] = useState<string | null>(null);
  const [serverMoveNumber, setServerMoveNumber] = useState(0);
  const [cheatModes, setCheatModes] = useState<Record<DemoSeatKey, boolean>>({
    playerA: false,
    playerB: false,
  });
  const [seats, setSeats] = useState<Record<DemoSeatKey, DemoSeatState>>(() => initialSeats());
  const [logs, setLogs] = useState<string[]>([]);

  const clientsRef = useRef<Partial<Record<DemoSeatKey, ReturnType<typeof createRelayClient>>>>({});
  const boardRef = useRef<string[]>(createEmptyBoard());
  const winnerRef = useRef<string | null>(null);
  const processedMovesRef = useRef<Set<number>>(new Set());
  const moveValidityRef = useRef<Map<number, boolean>>(new Map());
  const votedMovesRef = useRef<Record<DemoSeatKey, Set<number>>>({
    playerA: new Set<number>(),
    playerB: new Set<number>(),
  });
  const endedMatchRef = useRef(false);

  const appendLog = useEvent((scope: string, message: string) => {
    setLogs((current) => [formatLogEntry(scope, message), ...current].slice(0, 12));
  });

  const replaceBoard = useEvent((nextBoard: string[]) => {
    boardRef.current = nextBoard;
    setBoard(nextBoard);
  });

  const updateSeat = useEvent((key: DemoSeatKey, updater: (seat: DemoSeatState) => DemoSeatState) => {
    setSeats((current) => ({
      ...current,
      [key]: updater(current[key]),
    }));
  });

  const disconnectAllClients = useEvent(() => {
    for (const key of seatOrder) {
      clientsRef.current[key]?.disconnect();
      delete clientsRef.current[key];
    }
  });

  const resetRuntimeState = useEvent(() => {
    processedMovesRef.current = new Set();
    moveValidityRef.current = new Map();
    votedMovesRef.current = {
      playerA: new Set<number>(),
      playerB: new Set<number>(),
    };
    endedMatchRef.current = false;
    winnerRef.current = null;
    boardRef.current = createEmptyBoard();
  });

  const closeMatchForEveryone = useEvent((reason: string) => {
    if (endedMatchRef.current) {
      return;
    }
    endedMatchRef.current = true;
    appendLog('Relay', `Match ended: ${reason}`);
    for (const key of seatOrder) {
      try {
        clientsRef.current[key]?.endGame();
      } catch {
      }
    }
  });

  const syncTurnFlags = useEvent((activeId: string) => {
    if (!activeId) {
      return;
    }
    setSeats((current) => ({
      playerA: {
        ...current.playerA,
        yourTurn: current.playerA.playerId !== '' && current.playerA.playerId === activeId,
      },
      playerB: {
        ...current.playerB,
        yourTurn: current.playerB.playerId !== '' && current.playerB.playerId === activeId,
      },
    }));
  });

  const handleMatchStarted = useEvent((key: DemoSeatKey, message: TurnKitMatchStartedMessage) => {
    const slot = seats[key].slot;
    const matchingPlayer = typeof slot === 'number' ? message.players.find((player) => player.slot === slot) : null;
    updateSeat(key, (seat) => ({
      ...seat,
      connected: true,
      matchStarted: true,
      playerId: matchingPlayer?.playerId || seat.playerId,
      status: message.yourTurn ? 'Your turn' : 'Waiting for opponent',
      yourTurn: Boolean(message.yourTurn),
      lastError: null,
    }));

    const moveNumber = readServerMoveNumber(message);
    if (typeof moveNumber === 'number') {
      setServerMoveNumber(moveNumber);
    }

    appendLog(seats[key].title, 'Match started.');
    if (processedMovesRef.current.size === 0) {
      replaceBoard(createEmptyBoard());
      setWinner(null);
      setStatus('Match started. Use either player board to make the next move.');
      setPhase('live');
      winnerRef.current = null;
    }

    const activePlayerId = readActivePlayerId(message);
    if (activePlayerId) {
      syncTurnFlags(activePlayerId);
    }
  });

  const handleMoveMade = useEvent((key: DemoSeatKey, message: TurnKitMoveMadeMessage) => {
    const moveNumber = readCommittedMoveNumber(message);
    const cellIndex = readCellIndex(readMovePayload(message));
    const cachedValidity = typeof moveNumber === 'number' ? moveValidityRef.current.get(moveNumber) : undefined;
    const isLegalMove = cachedValidity ?? isMoveValidForBoard(boardRef.current, winnerRef.current, cellIndex);

    if (typeof moveNumber === 'number') {
      moveValidityRef.current.set(moveNumber, isLegalMove);
    }

    if (typeof moveNumber === 'number' && !votedMovesRef.current[key].has(moveNumber)) {
      votedMovesRef.current[key].add(moveNumber);
      try {
        clientsRef.current[key]?.vote(moveNumber, isLegalMove);
      } catch {
        appendLog(seats[key].title, `failed to vote on move ${moveNumber}.`);
      }
    }

    if (typeof moveNumber !== 'number') {
      setStatus('Relay sent MOVE_MADE without a move number.');
      appendLog('Relay', 'MOVE_MADE missing move number.');
      return;
    }

    if (processedMovesRef.current.has(moveNumber)) {
      return;
    }
    processedMovesRef.current.add(moveNumber);
    setServerMoveNumber(moveNumber);

    if (!isLegalMove || cellIndex === null) {
      setStatus('An invalid move was detected. Waiting for relay vote resolution.');
      appendLog('Relay', `Move ${moveNumber} flagged invalid.`);
      return;
    }

    const symbol = moveNumber % 2 === 0 ? 'O' : 'X';
    const nextBoard = [...boardRef.current];
    nextBoard[cellIndex] = symbol;
    replaceBoard(nextBoard);

    const nextWinner = detectWinner(nextBoard);
    if (nextWinner) {
      winnerRef.current = nextWinner;
      setWinner(nextWinner);
      setStatus(`${nextWinner} wins. Finalizing the match on both relay clients.`);
      setPhase('ended');
      closeMatchForEveryone(`${nextWinner} completed a line.`);
      return;
    }

    if (moveNumber >= boardSize) {
      setStatus('Draw. Finalizing the match on both relay clients.');
      setPhase('ended');
      closeMatchForEveryone('Board filled with no winner.');
      return;
    }

    const actingSeat = seatOrder
      .map((seatKey) => seats[seatKey])
      .find((seat) => seat.playerId !== '' && seat.playerId === readActingPlayerId(message));
    appendLog(actingSeat?.title || 'Relay', `claimed cell ${cellIndex + 1}`);
  });

  const handleTurnChanged = useEvent((key: DemoSeatKey, message: TurnKitTurnChangedMessage) => {
    const activePlayerId = readActivePlayerId(message);
    if (activePlayerId) {
      syncTurnFlags(activePlayerId);
    }
    const moveNumber = readServerMoveNumber(message);
    if (typeof moveNumber === 'number') {
      setServerMoveNumber(moveNumber);
    }
    updateSeat(key, (seat) => ({
      ...seat,
      yourTurn: typeof message.yourTurn === 'boolean' ? message.yourTurn : seat.playerId !== '' && seat.playerId === activePlayerId,
      status:
        typeof message.yourTurn === 'boolean'
          ? message.yourTurn
            ? 'Your turn'
            : 'Waiting for opponent'
          : seat.playerId !== '' && seat.playerId === activePlayerId
            ? 'Your turn'
            : 'Waiting for opponent',
    }));
  });

  const handleVoteFailed = useEvent((message: TurnKitVoteFailedMessage) => {
    setStatus(`Move ${message.moveNumber ?? '?'} failed relay validation.`);
    setPhase('ended');
    appendLog('Relay', `Vote failed for move ${message.moveNumber ?? '?'}${message.reason ? `: ${message.reason}` : ''}.`);
  });

  const handleGameEnded = useEvent((message: TurnKitGameEndedMessage) => {
    setPhase('ended');
    setStatus(message.reason ? `Game ended: ${message.reason}` : 'Game ended.');
    appendLog('Relay', message.reason ? `Match ended: ${message.reason}.` : 'Match ended.');
  });

  const handleRelayMessage = useEvent((key: DemoSeatKey, message: TurnKitRelayServerMessage) => {
    switch (message.type) {
      case 'MATCH_STARTED':
        handleMatchStarted(key, message as TurnKitMatchStartedMessage);
        return;
      case 'MOVE_MADE':
        handleMoveMade(key, message as TurnKitMoveMadeMessage);
        return;
      case 'TURN_STARTED':
        handleTurnChanged(key, message as TurnKitTurnChangedMessage);
        return;
      case 'MOVE_REQUESTED_FOR_PLAYER':
        appendLog(seats[key].title, 'delegated move requested by relay timeout flow.');
        setStatus('Relay requested delegated move for timed-out player.');
        return;
      case 'PRIVATE_LISTS_REVEALED':
        appendLog(seats[key].title, 'private lists revealed for timed-out slot.');
        return;
      case 'VOTE_FAILED':
        handleVoteFailed(message as TurnKitVoteFailedMessage);
        return;
      case 'GAME_ENDED':
        handleGameEnded(message as TurnKitGameEndedMessage);
        return;
      case 'PONG':
        updateSeat(key, (seat) => ({
          ...seat,
          status: seat.matchStarted ? (seat.yourTurn ? 'Your turn' : 'Waiting for opponent') : 'Socket ready',
        }));
        return;
      case 'SYNC_COMPLETE':
        appendLog(seats[key].title, 'sync complete.');
        return;
      case 'ERROR':
        appendLog(seats[key].title, `relay error: ${message.message || message.code || 'Unknown error'}.`);
        return;
      default:
        appendLog(seats[key].title, `received ${message.type}.`);
    }
  });

  const handleRelayClose = useEvent((key: DemoSeatKey) => {
    updateSeat(key, (seat) => ({
      ...seat,
      connected: false,
      status: seat.matchStarted ? 'Socket closed' : 'Disconnected',
    }));
  });

  const handleRelayError = useEvent((key: DemoSeatKey, error: string) => {
    updateSeat(key, (seat) => ({
      ...seat,
      lastError: error,
      status: 'Relay error',
    }));
    appendLog(seats[key].title, error);
  });

  const handlePulse = useEvent((key: DemoSeatKey, timestamp: number) => {
    updateSeat(key, (seat) => ({
      ...seat,
      lastPulseAt: timestamp,
    }));
  });

  const handlePong = useEvent((key: DemoSeatKey, timestamp: number) => {
    updateSeat(key, (seat) => ({
      ...seat,
      lastPongAt: timestamp,
      status: seat.matchStarted ? (seat.yourTurn ? 'Your turn' : 'Waiting for opponent') : 'Socket ready',
    }));
  });

  const startDemo = useEvent(async () => {
    disconnectAllClients();
    resetRuntimeState();
    replaceBoard(createEmptyBoard());
    setSeats(initialSeats());
    setCheatModes({
      playerA: false,
      playerB: false,
    });
    setWinner(null);
    setServerMoveNumber(0);
    setLogs([]);
    setPhase('queueing');
    setStatus('Queueing two clients into the relay config.');

    try {
      const queueResponses = await Promise.all(
        seatOrder.map(async (key) => ({
          key,
          session: await queueOpenRelaySession(),
        })),
      );

      setSeats((current) => {
        const next = { ...current };
        for (const { key, session } of queueResponses) {
          next[key] = {
            ...next[key],
            connected: false,
            matchStarted: false,
            slot: session.slot,
            playerId: session.playerId,
            status: `Queued in slot ${session.slot}`,
            lastError: null,
          };
        }
        return next;
      });

      appendLog('Relay', 'Queued both browser clients.');
      setStatus('Queued. Opening both WebSocket clients and starting pulse loop.');

      for (const { key, session } of queueResponses) {
        const client = createRelayClient({
          apiBaseUrl: session.apiBaseUrl,
          relayToken: session.relayToken,
          onOpen: () => {
            updateSeat(key, (seat) => ({
              ...seat,
              connected: true,
              status: 'Socket ready',
            }));
            appendLog(seatOrder.indexOf(key) === 0 ? 'Player One' : 'Player Two', 'socket connected.');
          },
          onClose: () => handleRelayClose(key),
          onError: (error) => handleRelayError(key, error),
          onMessage: (message) => handleRelayMessage(key, message),
          onPulse: (timestamp) => handlePulse(key, timestamp),
          onPong: (timestamp) => handlePong(key, timestamp),
        });
        clientsRef.current[key] = client;
        client.connect();
      }
    } catch (error) {
      disconnectAllClients();
      setPhase('error');
      setStatus(readErrorMessage(error));
    }
  });

  const resetDemo = useEvent(() => {
    disconnectAllClients();
    resetRuntimeState();
    replaceBoard(createEmptyBoard());
    setSeats(initialSeats());
    setCheatModes({
      playerA: false,
      playerB: false,
    });
    setWinner(null);
    setServerMoveNumber(0);
    setLogs([]);
    setPhase('idle');
    setStatus('Queue two browser clients and let the relay drive the match.');
  });

  const makeMove = useEvent((key: DemoSeatKey, index: number) => {
    const seat = seats[key];
    const allowOccupiedCellMove = cheatModes[key];
    if (!seat.connected || !seat.matchStarted || !seat.yourTurn || winnerRef.current || (!allowOccupiedCellMove && boardRef.current[index] !== '')) {
      return;
    }

    try {
      clientsRef.current[key]?.sendMove({ cellIndex: index }, true);
      appendLog(seat.title, `sent move request for cell ${index + 1}`);
    } catch (error) {
      handleRelayError(key, readErrorMessage(error));
    }
  });

  useEffect(() => () => disconnectAllClients(), [disconnectAllClients]);

  const seatArray = seatOrder.map((key) => seats[key]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <DemoPanel>
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void startDemo()}
                disabled={phase === 'queueing'}
                className="inline-flex items-center rounded-[4px] bg-accent px-3.5 py-2 text-[12px] font-medium text-white transition hover:bg-[#3AADF5] disabled:cursor-not-allowed disabled:bg-[rgba(47,156,235,0.35)] sm:px-4 sm:text-[13px]"
              >
                {phase === 'queueing' ? 'Starting match...' : 'Start live match'}
              </button>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex items-center rounded-[4px] border border-border2 px-3.5 py-2 text-[12px] text-muted transition hover:border-faint hover:text-text sm:px-4 sm:text-[13px]"
              >
                Reset
              </button>
            </div>

            <div className="rounded-[8px] border border-border2 bg-[rgba(8,12,16,0.55)] p-3 sm:p-4">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">Match Status</div>
              <div className="text-[14px] text-text sm:text-[15px]">{status}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted sm:text-[12px]">
                <span className="rounded-[999px] border border-border2 bg-surface2 px-2.5 py-1">Phase: {phase}</span>
                <span className="rounded-[999px] border border-border2 bg-surface2 px-2.5 py-1">Server move: {serverMoveNumber}</span>
                <span className="rounded-[999px] border border-border2 bg-surface2 px-2.5 py-1">Winner: {winner ?? 'None'}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {seatArray.map((seat) => (
                <div key={seat.key} className="space-y-3">
                  <DemoBoard
                    title={seat.title}
                    subtitle={
                      seat.matchStarted
                        ? seat.yourTurn
                          ? 'Your move'
                          : 'Waiting for opponent'
                        : seat.connected
                          ? 'Socket ready'
                          : seat.slot !== null
                            ? `Queued slot ${seat.slot}`
                            : 'No session yet'
                    }
                    cells={board}
                    allowOccupiedCellMove={cheatModes[seat.key]}
                    disabled={!seat.connected || !seat.matchStarted || !seat.yourTurn || winner !== null}
                    statusTone={
                      seat.lastError ? 'danger' : seat.yourTurn && phase === 'live' ? 'active' : winner !== null ? 'success' : 'neutral'
                    }
                    onToggleAllowOccupiedCellMove={(nextValue) =>
                      setCheatModes((current) => ({
                        ...current,
                        [seat.key]: nextValue,
                      }))
                    }
                    onCellClick={(index) => makeMove(seat.key, index)}
                  />

                  <div className="rounded-[8px] border border-border2 bg-[rgba(8,12,16,0.55)] p-3 text-[11px] text-muted sm:p-4 sm:text-[12px]">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="flex items-center justify-between gap-3 rounded-[6px] bg-[rgba(255,255,255,0.02)] px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0">
                        <span>Socket</span>
                        <span className={seat.connected ? 'text-green' : 'text-[#d85d66]'}>{seat.connected ? 'Connected' : 'Offline'}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[6px] bg-[rgba(255,255,255,0.02)] px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0">
                        <span>Status</span>
                        <span className="text-text">{seat.status}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[6px] bg-[rgba(255,255,255,0.02)] px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0">
                        <span>Pulse sent</span>
                        <span>{formatTimestamp(seat.lastPulseAt)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[6px] bg-[rgba(255,255,255,0.02)] px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0">
                        <span>Pong received</span>
                        <span>{formatTimestamp(seat.lastPongAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[8px] border border-border2 bg-[rgba(8,12,16,0.55)] p-3 sm:p-4">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">Relay Event Log</div>
              <div className="space-y-2 text-[11px] leading-[1.6] text-muted sm:text-[12px]">
                {logs.length === 0 ? <p>No relay events yet.</p> : logs.map((entry) => <p key={entry}>{entry}</p>)}
              </div>
            </div>
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}

