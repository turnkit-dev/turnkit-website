'use client';

import Link from 'next/link';
import { useActionState, useMemo, useState } from 'react';
import {
  createLeaderboardAction,
  createRelayConfigAction,
  deleteLeaderboardAction,
  deleteRelayConfigAction,
  resetLeaderboardAction,
  rotateSignedSecretAction,
  updateAuthSettingsAction,
  updateBillingAutoUpgradeAction,
  updateRelayConfigAction,
} from '@/app/actions/dashboard';
import { CopyButton, Field, Modal, PendingButton, SectionButton, TextArea, useDashboardActionFeedback } from '@/components/dashboard-ui';
import { initialDashboardActionState } from '@/lib/dashboard-action-state';
import type { AuthMode, FailAction, LeaderboardRecord, RelayConfigInput, RelayConfigRecord, RelayListConfigRecord, SmtpSettings, TurnEnforcement, VotingMode } from '@/lib/dashboard';

export function AuthSecurityForm({
  gameId,
  mode,
  hasSecret,
  signedSecret,
  smtp,
}: {
  gameId: string;
  mode: AuthMode;
  hasSecret: boolean;
  signedSecret: string;
  smtp: SmtpSettings;
}) {
  const [selectedMode, setSelectedMode] = useState<AuthMode>(mode);
  const [showSecret, setShowSecret] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);
  const [revealedSecret, setRevealedSecret] = useState('');
  const [settingsState, settingsAction] = useActionState(updateAuthSettingsAction, initialDashboardActionState);
  const [secretState, secretAction] = useActionState(rotateSignedSecretAction, initialDashboardActionState);
  const maskedSecret = useMemo(() => (hasSecret ? 'stored on server' : 'not generated yet'), [hasSecret]);

  useDashboardActionFeedback(settingsState);
  useDashboardActionFeedback(secretState, {
    onSuccess(result) {
      setRevealedSecret(result.signedSecret ?? '');
      setRevealOpen(Boolean(result.signedSecret));
    },
  });

  return (
    <div className="space-y-5">
      <form action={settingsAction} className="space-y-5">
        <input type="hidden" name="gameId" value={gameId} />
        <div className="space-y-3">
          <label className="flex gap-3 rounded border border-border2 bg-bg px-4 py-3">
            <input type="radio" name="mode" value="OPEN" checked={selectedMode === 'OPEN'} onChange={() => setSelectedMode('OPEN')} className="mt-0.5" />
            <div>
              <div className="text-[13px] text-text">OPEN</div>
              <div className="mt-1 text-[12px] text-muted">No authentication required. Anyone can join using only the client key. It is default starting mode for faster prototyping.</div>
              <div className="mt-1 text-[12px] text-amber">Not recommended for production.</div>
            </div>
          </label>
          <label className="flex gap-3 rounded border border-border2 bg-bg px-4 py-3">
            <input type="radio" name="mode" value="SIGNED" checked={selectedMode === 'SIGNED'} onChange={() => setSelectedMode('SIGNED')} className="mt-0.5" />
            <div>
              <div className="text-[13px] text-text">SIGNED</div>
              <div className="mt-1 text-[12px] text-muted">Your backend signs the player ID using a secret key. TurnKit only verifies the signature. Best if you already have your own auth system.</div>
            </div>
          </label>
          <label className="flex gap-3 rounded border border-border2 bg-bg px-4 py-3">
            <input
              type="radio"
              name="mode"
              value="TURNKIT_AUTH"
              checked={selectedMode === 'TURNKIT_AUTH'}
              onChange={() => setSelectedMode('TURNKIT_AUTH')}
              className="mt-0.5"
            />
            <div>
              <div className="text-[13px] text-text">TURNKIT_AUTH</div>
              <div className="mt-1 text-[12px] text-muted">TurnKit handles login via email + OTP using your SMTP settings. Best if you want TurnKit to manage player authentication.</div>
            </div>
          </label>
        </div>

        {selectedMode === 'SIGNED' ? (
          <div className="rounded border border-border2 bg-bg p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Secret</div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-[3px] border border-border2 px-3 py-2 font-mono text-[13px] text-text">
                {showSecret ? (signedSecret || 'Returned only when generated or rotated') : maskedSecret}
              </div>
              <SectionButton onClick={() => setShowSecret((value) => !value)}>{showSecret ? 'Hide' : 'Show'}</SectionButton>
              <button
                type="submit"
                formAction={secretAction}
                className="rounded-[3px] border border-border2 px-3 py-2 text-xs text-text transition hover:bg-surface2"
              >
                {hasSecret ? 'Rotate' : 'Generate'}
              </button>
            </div>
          </div>
        ) : null}

        {selectedMode === 'TURNKIT_AUTH' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="SMTP Host" name="host" defaultValue={smtp.host} />
            <Field label="Port" name="port" defaultValue={smtp.port} />
            <Field label="Username" name="username" defaultValue={smtp.username} autoComplete="username" />
            <Field label="Password" name="password" type="password" defaultValue={smtp.password} autoComplete="current-password" />
            <Field label="From" name="fromEmail" defaultValue={smtp.fromEmail} />
            <Field label="Name" name="fromName" defaultValue={smtp.fromName} />
          </div>
        ) : (
          <>
            <input type="hidden" name="host" value={smtp.host} />
            <input type="hidden" name="port" value={smtp.port} />
            <input type="hidden" name="username" value={smtp.username} />
            <input type="hidden" name="password" value={smtp.password} />
            <input type="hidden" name="fromEmail" value={smtp.fromEmail} />
            <input type="hidden" name="fromName" value={smtp.fromName} />
          </>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">
            More details in{' '}
            <Link href="/docs/player-authentication-modes" className="text-accent transition hover:text-text">
              Player Authentication Modes Docs
            </Link>
          </p>
          <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Saving...">
            Save Changes
          </PendingButton>
        </div>
      </form>
      <Modal
        open={revealOpen}
        onClose={() => setRevealOpen(false)}
        title="Signed Secret Ready"
        description="This signed secret is shown only once. Copy it now before closing this dialog."
      >
        <div className="space-y-5">
          <div className="rounded border border-border2 bg-bg px-4 py-3 font-mono text-[13px] text-text break-all">{revealedSecret}</div>
          <div className="flex justify-end gap-3">
            <CopyButton value={revealedSecret} />
            <SectionButton onClick={() => setRevealOpen(false)}>Close</SectionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function NewLeaderboardModal({ gameId }: { gameId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(createLeaderboardAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>+ New Leaderboard</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title="New Leaderboard">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <Field label="Slug" name="slug" required placeholder="weekly" />
          <TextArea label="Description" name="description" placeholder="Optional details" />
          <div className="flex justify-end">
            <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Creating...">
              Create Leaderboard
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function ViewLeaderboardButton({ leaderboard }: { leaderboard: LeaderboardRecord }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>View</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title={`Leaderboard: ${leaderboard.slug}`}>
        {leaderboard.topScores.length === 0 ? (
          <div className="rounded border border-border2 bg-bg px-4 py-6 text-[14px] text-muted">No scores yet.</div>
        ) : (
          <div className="overflow-x-auto rounded border border-border">
            <table className="min-w-full border-collapse">
              <thead className="bg-surface text-[11px] uppercase tracking-[0.08em] text-faint">
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left font-medium">Player</th>
                  <th className="border-b border-border px-4 py-3 text-left font-medium">Score</th>
                  <th className="border-b border-border px-4 py-3 text-left font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.topScores.map((score) => (
                  <tr key={`${score.playerName}-${score.submittedAt}`} className="bg-surface text-[13px]">
                    <td className="border-b border-border px-4 py-3 text-text">{score.playerName}</td>
                    <td className="border-b border-border px-4 py-3 text-text">{score.score}</td>
                    <td className="border-b border-border px-4 py-3 text-muted">{score.submittedAt ? new Date(score.submittedAt).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}

export function ResetLeaderboardButton({ gameId, leaderboardId }: { gameId: string; leaderboardId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(resetLeaderboardAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>Reset</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title="Reset Leaderboard" description="All existing scores on this leaderboard will be removed.">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="leaderboardSlug" value={leaderboardId} />
          <div className="flex justify-end gap-3">
            <SectionButton onClick={() => setOpen(false)}>Cancel</SectionButton>
            <PendingButton
              className="rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-2.5 text-[13px] font-medium text-danger transition hover:bg-[rgba(248,113,113,0.14)]"
              pendingLabel="Resetting..."
            >
              Reset Leaderboard
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeleteLeaderboardButton({ gameId, leaderboardId }: { gameId: string; leaderboardId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deleteLeaderboardAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-sm text-danger transition hover:text-[#fca5a5]">
        Delete
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Leaderboard">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="leaderboardSlug" value={leaderboardId} />
          <div className="flex justify-end gap-3">
            <SectionButton onClick={() => setOpen(false)}>Cancel</SectionButton>
            <PendingButton
              className="rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-2.5 text-[13px] font-medium text-danger transition hover:bg-[rgba(248,113,113,0.14)]"
              pendingLabel="Deleting..."
            >
              Delete Leaderboard
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

const turnEnforcementOptions: TurnEnforcement[] = ['ROUND_ROBIN', 'FREE'];
const votingModeOptions: VotingMode[] = ['SYNC', 'ASYNC'];
const failActionOptions: FailAction[] = ['SKIP_TURN', 'END_GAME'];

function createDefaultRelayForm(): RelayConfigInput {
  return {
    slug: '',
    maxPlayers: 2,
    turnEnforcement: 'ROUND_ROBIN',
    ignoreAllOwnership: false,
    votingEnabled: false,
    votingMode: 'SYNC',
    votesRequired: 2,
    votesToFail: 1,
    failAction: 'SKIP_TURN',
    matchTimeoutMinutes: 10,
    turnTimeoutSeconds: 60,
    waitReconnectSeconds: 45,
    lists: [],
  };
}

function buildRelayForm(relayConfig?: RelayConfigRecord): RelayConfigInput {
  if (!relayConfig) {
    return createDefaultRelayForm();
  }
  return {
    slug: relayConfig.slug,
    maxPlayers: relayConfig.maxPlayers,
    turnEnforcement: relayConfig.turnEnforcement,
    ignoreAllOwnership: relayConfig.ignoreAllOwnership,
    votingEnabled: relayConfig.votingEnabled,
    votingMode: relayConfig.votingMode,
    votesRequired: relayConfig.votesRequired,
    votesToFail: relayConfig.votesToFail,
    failAction: relayConfig.failAction,
    matchTimeoutMinutes: relayConfig.matchTimeoutMinutes,
    turnTimeoutSeconds: relayConfig.turnTimeoutSeconds,
    waitReconnectSeconds: relayConfig.waitReconnectSeconds,
    lists: relayConfig.lists.map((list) => ({
      id: list.id,
      name: list.name,
      tag: list.tag,
      ownerSlots: [...list.ownerSlots],
      visibleToSlots: [...list.visibleToSlots],
    })),
  };
}

function trimSlots(slots: number[], maxPlayers: number) {
  return [...new Set(slots.filter((slot) => slot >= 1 && slot <= maxPlayers))].sort((a, b) => a - b);
}

function mirrorSlotList(original: number[], maxPlayers: number, targetPlayer: number) {
  if (original.length === 1 && original[0] === 1) {
    return [targetPlayer];
  }
  if (original.length >= maxPlayers || original.length === 0) {
    return [...original];
  }
  return [...original];
}

function createDefaultRelayList(): RelayListConfigRecord {
  return {
    name: 'p1_list',
    tag: 'tag',
    ownerSlots: [1],
    visibleToSlots: [1, 2],
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{children}</div>;
}

function NumberField({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
      />
    </label>
  );
}

function RelaySlotToggles({
  maxPlayers,
  slots,
  disabled,
  onToggle,
}: {
  maxPlayers: number;
  slots: number[];
  disabled?: boolean;
  onToggle: (slot: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: maxPlayers }, (_, index) => index + 1).map((slot) => {
        const selected = slots.includes(slot);
        return (
          <button
            key={slot}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(slot)}
            className={
              selected
                ? 'rounded-[3px] border border-accent bg-[rgba(58,173,245,0.14)] px-3 py-1.5 text-xs text-text'
                : 'rounded-[3px] border border-border2 bg-bg px-3 py-1.5 text-xs text-muted transition hover:bg-surface2 disabled:cursor-not-allowed disabled:hover:bg-bg'
            }
          >
            {`P${slot}`}
          </button>
        );
      })}
    </div>
  );
}

export function RelayConfigModal({ gameId, relayConfig }: { gameId: string; relayConfig?: RelayConfigRecord }) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(relayConfig);
  const [state, formAction] = useActionState(isEdit ? updateRelayConfigAction : createRelayConfigAction, initialDashboardActionState);
  const [form, setForm] = useState<RelayConfigInput>(() => buildRelayForm(relayConfig));
  const [openLists, setOpenLists] = useState<Record<number, boolean>>({});

  function resetForm() {
    setForm(buildRelayForm(relayConfig));
    setOpenLists({});
  }

  function handleOpen() {
    resetForm();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    resetForm();
  }

  function updateForm(patch: Partial<RelayConfigInput>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function updateMaxPlayers(nextValue: number) {
    const maxPlayers = Math.max(2, Math.min(8, Math.trunc(nextValue || 2)));
    setForm((current) => ({
      ...current,
      maxPlayers,
      votesRequired: Math.min(Math.max(1, current.votesRequired), Math.min(3, maxPlayers)),
      votesToFail: Math.min(Math.max(1, current.votesToFail), Math.min(3, maxPlayers)),
      lists: current.lists.map((list) => ({
        ...list,
        ownerSlots: trimSlots(list.ownerSlots, maxPlayers),
        visibleToSlots: trimSlots(list.visibleToSlots, maxPlayers),
      })),
    }));
  }

  function updateList(index: number, patch: Partial<RelayListConfigRecord>) {
    setForm((current) => ({
      ...current,
      lists: current.lists.map((list, listIndex) => (listIndex === index ? { ...list, ...patch } : list)),
    }));
  }

  function toggleListSlot(index: number, key: 'ownerSlots' | 'visibleToSlots', slot: number) {
    setForm((current) => ({
      ...current,
      lists: current.lists.map((list, listIndex) => {
        if (listIndex !== index) {
          return list;
        }
        const nextSlots = list[key].includes(slot) ? list[key].filter((value) => value !== slot) : [...list[key], slot];
        return { ...list, [key]: trimSlots(nextSlots, current.maxPlayers) };
      }),
    }));
  }

  function setAllListSlots(index: number, key: 'ownerSlots' | 'visibleToSlots') {
    setForm((current) => ({
      ...current,
      lists: current.lists.map((list, listIndex) =>
        listIndex === index ? { ...list, [key]: Array.from({ length: current.maxPlayers }, (_, slotIndex) => slotIndex + 1) } : list,
      ),
    }));
  }

  function clearListSlots(index: number, key: 'ownerSlots' | 'visibleToSlots') {
    updateList(index, { [key]: [] } as Partial<RelayListConfigRecord>);
  }

  function addList() {
    setForm((current) => ({
      ...current,
      lists: [...current.lists, createDefaultRelayList()],
    }));
    setOpenLists((current) => ({ ...current, [form.lists.length]: true }));
  }

  function removeList(index: number) {
    setForm((current) => ({
      ...current,
      lists: current.lists.filter((_, listIndex) => listIndex !== index),
    }));
    setOpenLists((current) => {
      const next: Record<number, boolean> = {};
      Object.entries(current).forEach(([key, value]) => {
        const numericKey = Number(key);
        if (numericKey < index) {
          next[numericKey] = value;
        } else if (numericKey > index) {
          next[numericKey - 1] = value;
        }
      });
      return next;
    });
  }

  function mirrorLists() {
    setForm((current) => {
      const additions: RelayListConfigRecord[] = [];
      const existingNames = new Set(current.lists.map((list) => list.name));

      current.lists.forEach((list) => {
        const match = list.name.match(/(\d+)/);
        if (!match || Number(match[0]) !== 1) {
          return;
        }

        for (let targetPlayer = 2; targetPlayer <= current.maxPlayers; targetPlayer += 1) {
          const nextName = list.name.replace(/\d+/g, String(targetPlayer));
          if (existingNames.has(nextName)) {
            continue;
          }
          existingNames.add(nextName);
          additions.push({
            name: nextName,
            tag: list.tag,
            ownerSlots: mirrorSlotList(list.ownerSlots, current.maxPlayers, targetPlayer),
            visibleToSlots: mirrorSlotList(list.visibleToSlots, current.maxPlayers, targetPlayer),
          });
        }
      });

      if (additions.length === 0) {
        return current;
      }

      return {
        ...current,
        lists: [...current.lists, ...additions],
      };
    });
  }

  useDashboardActionFeedback(state, {
    onSuccess() {
      handleClose();
    },
  });

  const maxVotes = Math.min(3, form.maxPlayers);

  return (
    <>
      <SectionButton onClick={handleOpen}>{isEdit ? 'Edit' : '+ New Relay Config'}</SectionButton>
      <Modal
        open={open}
        onClose={handleClose}
        title={isEdit ? 'Edit Relay Config' : 'New Relay Config'}
        panelClassName="max-h-[90vh] max-w-[980px] overflow-y-auto"
      >
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="gameId" value={gameId} />
          {relayConfig ? <input type="hidden" name="relayConfigSlug" value={relayConfig.slug} /> : null}
          <input type="hidden" name="slug" value={form.slug} />
          <input type="hidden" name="maxPlayers" value={form.maxPlayers} />
          <input type="hidden" name="turnEnforcement" value={form.turnEnforcement} />
          <input type="hidden" name="ignoreAllOwnership" value={String(form.ignoreAllOwnership)} />
          <input type="hidden" name="votingEnabled" value={String(form.votingEnabled)} />
          <input type="hidden" name="votingMode" value={form.votingMode} />
          <input type="hidden" name="votesRequired" value={form.votesRequired} />
          <input type="hidden" name="votesToFail" value={form.votesToFail} />
          <input type="hidden" name="failAction" value={form.failAction} />
          <input type="hidden" name="matchTimeoutMinutes" value={form.matchTimeoutMinutes} />
          <input type="hidden" name="turnTimeoutSeconds" value={form.turnTimeoutSeconds} />
          <input type="hidden" name="waitReconnectSeconds" value={form.waitReconnectSeconds} />
          <input type="hidden" name="lists" value={JSON.stringify(form.lists)} />

          <div className="rounded border border-border2 bg-bg p-4">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Basic Settings</div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <FieldLabel>Slug</FieldLabel>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => updateForm({ slug: event.target.value })}
                  placeholder="main-relay"
                  className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition placeholder:text-faint focus:border-accent"
                />
              </label>
              <NumberField label="Max Players" min={2} max={8} value={form.maxPlayers} onChange={updateMaxPlayers} />
              <label className="block">
                <FieldLabel>Turn Enforcement</FieldLabel>
                <select
                  value={form.turnEnforcement}
                  onChange={(event) => updateForm({ turnEnforcement: event.target.value as TurnEnforcement })}
                  className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                >
                  {turnEnforcementOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 rounded border border-border2 bg-surface px-4 py-3 text-[13px] text-text">
                <input
                  type="checkbox"
                  checked={form.ignoreAllOwnership}
                  onChange={(event) => updateForm({ ignoreAllOwnership: event.target.checked })}
                />
                Ignore all ownership
              </label>
              <NumberField label="Match Timeout (Minutes)" min={1} value={form.matchTimeoutMinutes} onChange={(value) => updateForm({ matchTimeoutMinutes: Math.max(1, Math.trunc(value || 1)) })} />
              <NumberField label="Turn Timeout (Seconds)" min={1} value={form.turnTimeoutSeconds} onChange={(value) => updateForm({ turnTimeoutSeconds: Math.max(1, Math.trunc(value || 1)) })} />
              <NumberField
                label="Wait Reconnect (Seconds)"
                min={1}
                value={form.waitReconnectSeconds}
                onChange={(value) => updateForm({ waitReconnectSeconds: Math.max(1, Math.trunc(value || 1)) })}
              />
            </div>
          </div>

          <div className="rounded border border-border2 bg-bg p-4">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Voting</div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 rounded border border-border2 bg-surface px-4 py-3 text-[13px] text-text">
                <input
                  type="checkbox"
                  checked={form.votingEnabled}
                  onChange={(event) => updateForm({ votingEnabled: event.target.checked })}
                />
                Voting enabled
              </label>
              {form.votingEnabled ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <FieldLabel>Voting Mode</FieldLabel>
                    <select
                      value={form.votingMode}
                      onChange={(event) => updateForm({ votingMode: event.target.value as VotingMode })}
                      className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                    >
                      {votingModeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <FieldLabel>Fail Action</FieldLabel>
                    <select
                      value={form.failAction}
                      onChange={(event) => updateForm({ failAction: event.target.value as FailAction })}
                      className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                    >
                      {failActionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <NumberField
                    label="Votes Required"
                    min={1}
                    max={maxVotes}
                    value={form.votesRequired}
                    onChange={(value) => updateForm({ votesRequired: Math.max(1, Math.min(maxVotes, Math.trunc(value || 1))) })}
                  />
                  <NumberField
                    label="Votes To Fail"
                    min={1}
                    max={maxVotes}
                    value={form.votesToFail}
                    onChange={(value) => updateForm({ votesToFail: Math.max(1, Math.min(maxVotes, Math.trunc(value || 1))) })}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded border border-border2 bg-bg p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Lists</div>
                <div className="mt-1 text-[13px] text-muted">Create relay lists, configure ownership, and control who can see each list.</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <SectionButton onClick={mirrorLists}>Mirror</SectionButton>
                <SectionButton onClick={addList}>+ Add</SectionButton>
              </div>
            </div>
            {form.lists.length === 0 ? <div className="rounded border border-border2 bg-surface px-4 py-6 text-[14px] text-muted">No lists yet.</div> : null}
            <div className="space-y-4">
              {form.lists.map((list, index) => {
                const expanded = openLists[index] ?? true;
                return (
                  <div key={`${list.name}-${index}`} className="rounded border border-border2 bg-surface">
                    <div className="flex flex-wrap items-center gap-3 border-b border-border2 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setOpenLists((current) => ({ ...current, [index]: !expanded }))}
                        className="text-left text-[13px] text-text"
                      >
                        {expanded ? '▾' : '▸'} {list.name || `List ${index + 1}`}
                      </button>
                      <div className="ml-auto">
                        <SectionButton destructive onClick={() => removeList(index)}>
                          Delete
                        </SectionButton>
                      </div>
                    </div>
                    {expanded ? (
                      <div className="space-y-4 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block">
                            <FieldLabel>Name</FieldLabel>
                            <input
                              type="text"
                              value={list.name}
                              onChange={(event) => updateList(index, { name: event.target.value })}
                              className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                            />
                          </label>
                          <label className="block">
                            <FieldLabel>Tag</FieldLabel>
                            <input
                              type="text"
                              value={list.tag}
                              onChange={(event) => updateList(index, { tag: event.target.value })}
                              className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                            />
                          </label>
                        </div>
                        {form.ignoreAllOwnership ? (
                          <div className="rounded border border-border2 bg-bg px-4 py-3 text-[13px] text-muted">Ownership is ignored for this relay config.</div>
                        ) : (
                          <div>
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                              <FieldLabel>Owner Slots</FieldLabel>
                              <div className="flex gap-2">
                                <SectionButton onClick={() => setAllListSlots(index, 'ownerSlots')}>All</SectionButton>
                                <SectionButton onClick={() => clearListSlots(index, 'ownerSlots')}>Clear</SectionButton>
                              </div>
                            </div>
                            <RelaySlotToggles maxPlayers={form.maxPlayers} slots={list.ownerSlots} onToggle={(slot) => toggleListSlot(index, 'ownerSlots', slot)} />
                          </div>
                        )}
                        <div>
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <FieldLabel>Visible Slots</FieldLabel>
                            <div className="flex gap-2">
                              <SectionButton onClick={() => setAllListSlots(index, 'visibleToSlots')}>All</SectionButton>
                              <SectionButton onClick={() => clearListSlots(index, 'visibleToSlots')}>Clear</SectionButton>
                            </div>
                          </div>
                          <RelaySlotToggles maxPlayers={form.maxPlayers} slots={list.visibleToSlots} onToggle={(slot) => toggleListSlot(index, 'visibleToSlots', slot)} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel={isEdit ? 'Saving...' : 'Creating...'}>
              {isEdit ? 'Save Relay Config' : 'Create Relay Config'}
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeleteRelayConfigButton({ gameId, relayConfigId }: { gameId: string; relayConfigId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deleteRelayConfigAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-sm text-danger transition hover:text-[#fca5a5]">
        Delete
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Relay Config">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="relayConfigSlug" value={relayConfigId} />
          <div className="flex justify-end gap-3">
            <SectionButton onClick={() => setOpen(false)}>Cancel</SectionButton>
            <PendingButton
              className="rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-2.5 text-[13px] font-medium text-danger transition hover:bg-[rgba(248,113,113,0.14)]"
              pendingLabel="Deleting..."
            >
              Delete Relay Config
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function BillingAutoUpgradeForm({ gameId, autoUpgrade, upgradeHref }: { gameId: string; autoUpgrade: boolean; upgradeHref: string }) {
  const [state, formAction] = useActionState(updateBillingAutoUpgradeAction, initialDashboardActionState);

  useDashboardActionFeedback(state);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="gameId" value={gameId} />
      <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-4 py-3 text-[13px] text-text">
        <input type="checkbox" name="autoUpgrade" defaultChecked={autoUpgrade} />
        Auto-upgrade when limits reached
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Saving...">
          Save Billing
        </PendingButton>
        <a href={upgradeHref} className="inline-flex items-center rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2">
          Upgrade Plan
        </a>
      </div>
    </form>
  );
}
