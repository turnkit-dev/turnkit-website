'use client';

import Link from 'next/link';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createLeaderboardAction,
  createRelayConfigAction,
  deleteLeaderboardAction,
  deleteRelayConfigAction,
  resetLeaderboardAction,
  rotateSignedSecretAction,
  updateLeaderboardDisplayNameAction,
  updateAuthSettingsAction,
  updateBillingAutoUpgradeAction,
  updateRelayConfigAction,
} from '@/app/actions/dashboard';
import { CopyButton, Field, Modal, PendingButton, SectionButton, showDashboardToast, useDashboardActionFeedback } from '@/components/dashboard-ui';
import { UpgradeSubscriptionModal } from '@/components/upgrade-subscription-modal';
import { initialDashboardActionState } from '@/lib/dashboard-action-state';
import type {
  FailAction,
  LeaderboardRecord,
  LeaderboardResetFrequency,
  LeaderboardScoreStrategy,
  LeaderboardSortOrder,
  OnTurnTimeout,
  PlayerAuthMethod,
  PlayerAuthPolicy,
  RelayConfigInput,
  RelayConfigRecord,
  RelayListConfigRecord,
  SmtpSettings,
  TurnEnforcement,
  VotingMode,
} from '@/lib/dashboard';

export function AuthSecurityForm({
  gameId,
  policy,
  methods,
  hasSecret,
  signedSecret,
  smtp,
}: {
  gameId: string;
  policy: PlayerAuthPolicy;
  methods: PlayerAuthMethod[];
  hasSecret: boolean;
  signedSecret: string;
  smtp: SmtpSettings;
}) {
  const [selectedPolicy, setSelectedPolicy] = useState<PlayerAuthPolicy>(policy);
  const [selectedMethods, setSelectedMethods] = useState<PlayerAuthMethod[]>(methods);
  const [showSecret, setShowSecret] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);
  const [revealedSecret, setRevealedSecret] = useState('');
  const [settingsState, settingsAction] = useActionState(updateAuthSettingsAction, initialDashboardActionState);
  const [secretState, secretAction] = useActionState(rotateSignedSecretAction, initialDashboardActionState);
  const maskedSecret = useMemo(() => (hasSecret ? 'stored on server' : 'not generated yet'), [hasSecret]);
  const hasYourBackend = selectedMethods.includes('YOUR_BACKEND');
  const hasEmailOtp = selectedMethods.includes('EMAIL_OTP');
  const hasUgs = selectedMethods.includes('UGS');
  const authRequiredWithoutMethod = selectedPolicy === 'AUTH_REQUIRED' && selectedMethods.length === 0;

  function toggleMethod(method: PlayerAuthMethod) {
    setSelectedMethods((current) => (current.includes(method) ? current.filter((value) => value !== method) : [...current, method]));
  }

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
            <input
              type="radio"
              name="policy"
              value="NO_AUTH"
              checked={selectedPolicy === 'NO_AUTH'}
              onChange={() => setSelectedPolicy('NO_AUTH')}
              className="mt-0.5"
            />
            <div>
              <div className="text-[13px] text-text">NO_AUTH</div>
              <div className="mt-1 text-[12px] text-muted">No player JWT is required. Clients use <span className="font-mono">X-Player-Id</span> on runtime requests.</div>
              <div className="mt-1 text-[12px] text-amber">Not recommended for production.</div>
            </div>
          </label>
          <label className="flex gap-3 rounded border border-border2 bg-bg px-4 py-3">
            <input
              type="radio"
              name="policy"
              value="AUTH_REQUIRED"
              checked={selectedPolicy === 'AUTH_REQUIRED'}
              onChange={() => setSelectedPolicy('AUTH_REQUIRED')}
              className="mt-0.5"
            />
            <div>
              <div className="text-[13px] text-text">AUTH_REQUIRED</div>
              <div className="mt-1 text-[12px] text-muted">Protected client endpoints require a player JWT. Enable at least one auth method below.</div>
            </div>
          </label>
        </div>

        <div className="rounded border border-border2 bg-bg p-4">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Enabled Methods</div>
          <div className="space-y-3">
            <label className="flex gap-3 rounded border border-border2 bg-surface px-4 py-3">
              <input
                type="checkbox"
                name="methods"
                value="YOUR_BACKEND"
                checked={hasYourBackend}
                onChange={() => toggleMethod('YOUR_BACKEND')}
                className="mt-0.5"
              />
              <div>
                <div className="text-[13px] text-text">YOUR_BACKEND</div>
                <div className="mt-1 text-[12px] text-muted">Your backend signs player proof payloads, and TurnKit exchanges them for a player JWT.</div>
              </div>
            </label>
            <label className="flex gap-3 rounded border border-border2 bg-surface px-4 py-3">
              <input
                type="checkbox"
                name="methods"
                value="EMAIL_OTP"
                checked={hasEmailOtp}
                onChange={() => toggleMethod('EMAIL_OTP')}
                className="mt-0.5"
              />
              <div>
                <div className="text-[13px] text-text">EMAIL_OTP</div>
                <div className="mt-1 text-[12px] text-muted">TurnKit sends login codes over email using your per-game SMTP settings.</div>
              </div>
            </label>
            <label className="flex gap-3 rounded border border-border2 bg-surface px-4 py-3">
              <input
                type="checkbox"
                name="methods"
                value="UGS"
                checked={hasUgs}
                onChange={() => toggleMethod('UGS')}
                className="mt-0.5"
              />
              <div>
                <div className="text-[13px] text-text">UGS</div>
                <div className="mt-1 text-[12px] text-muted">Exchange a Unity Authentication JWT for a TurnKit player JWT using the client key.</div>
                <div className="mt-1 text-[12px] text-muted">Requires backend UGS verification to be configured before AUTH_REQUIRED can enable it.</div>
              </div>
            </label>
          </div>
          {authRequiredWithoutMethod ? <div className="mt-3 text-[12px] text-danger">AUTH_REQUIRED must enable at least one method.</div> : null}
          {selectedPolicy === 'NO_AUTH' && selectedMethods.length > 0 ? (
            <div className="mt-3 text-[12px] text-muted">Methods stay saved while NO_AUTH is active, so you can re-enable AUTH_REQUIRED later without losing config.</div>
          ) : null}
        </div>

        {hasYourBackend ? (
          <div className="rounded border border-border2 bg-bg p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">YOUR_BACKEND Secret</div>
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

        {hasEmailOtp ? (
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
              Player Authentication Docs
            </Link>
          </p>
          <PendingButton
            className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
            disabled={authRequiredWithoutMethod}
            pendingLabel="Saving..."
          >
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

const leaderboardSortOrderOptions: LeaderboardSortOrder[] = ['DESC', 'ASC'];
const leaderboardScoreStrategyOptions: LeaderboardScoreStrategy[] = ['BEST_ONLY', 'MULTIPLE_ENTRIES', 'CUMULATIVE'];
const leaderboardResetFrequencyOptions: LeaderboardResetFrequency[] = ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY'];

function formatDateTime(value: string) {
  if (!value) {
    return 'Not scheduled';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not scheduled';
  }
  return date.toLocaleString();
}

function formatLeaderboardMode(leaderboard: LeaderboardRecord) {
  return `${leaderboard.sortOrder} / ${leaderboard.scoreStrategy}`;
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
      <Modal open={open} onClose={() => setOpen(false)} title="New Leaderboard" panelClassName="max-w-[760px]">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug" name="slug" required placeholder="weekly" />
            <Field label="Display Name" name="displayName" required placeholder="Weekly Rankings" />
            <label className="block">
              <FieldLabel>Sort Order</FieldLabel>
              <select
                name="sortOrder"
                defaultValue="DESC"
                className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
              >
                {leaderboardSortOrderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <FieldLabel>Score Strategy</FieldLabel>
              <select
                name="scoreStrategy"
                defaultValue="BEST_ONLY"
                className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
              >
                {leaderboardScoreStrategyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Min Score" name="minScore" type="number" required defaultValue="0" />
            <Field label="Max Score" name="maxScore" type="number" required defaultValue="1000000" />
            <label className="block md:col-span-2">
              <FieldLabel>Reset Frequency</FieldLabel>
              <select
                name="resetFrequency"
                defaultValue="NONE"
                className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
              >
                {leaderboardResetFrequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-4 py-3 text-[13px] text-text">
            <input type="checkbox" name="clientSubmitEnabled" />
            Allow client score submission
          </label>
          <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-4 py-3 text-[13px] text-text">
            <input type="checkbox" name="archiveOnReset" />
            Archive scores on automatic reset
          </label>
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

function LeaderboardSetting({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-border2 bg-bg px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{label}</div>
      <div className="mt-1 text-[13px] text-text">{value}</div>
    </div>
  );
}

export function ViewLeaderboardButton({ gameId, leaderboard }: { gameId: string; leaderboard: LeaderboardRecord }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(updateLeaderboardDisplayNameAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>View/Edit</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title={`Leaderboard: ${leaderboard.slug}`} panelClassName="max-w-[760px]">
        <div className="space-y-5">
          <form action={formAction} className="space-y-3 rounded border border-border2 bg-bg p-4">
            <input type="hidden" name="gameId" value={gameId} />
            <input type="hidden" name="leaderboardSlug" value={leaderboard.slug} />
            <Field label="Display Name" name="displayName" defaultValue={leaderboard.displayName} required />
            <div className="flex justify-end">
              <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Saving...">
                Save Display Name
              </PendingButton>
            </div>
          </form>

          <div className="grid gap-3 md:grid-cols-2">
            <LeaderboardSetting label="Slug" value={leaderboard.slug} />
            <LeaderboardSetting label="Score Mode" value={formatLeaderboardMode(leaderboard)} />
            <LeaderboardSetting label="Min Score" value={String(leaderboard.minScore)} />
            <LeaderboardSetting label="Max Score" value={String(leaderboard.maxScore)} />
            <LeaderboardSetting label="Client Submit Enabled" value={leaderboard.clientSubmitEnabled ? 'Yes' : 'No'} />
            <LeaderboardSetting label="Reset Frequency" value={leaderboard.resetFrequency} />
            <LeaderboardSetting label="Archive On Reset" value={leaderboard.archiveOnReset ? 'Yes' : 'No'} />
            <LeaderboardSetting label="Next Reset" value={formatDateTime(leaderboard.nextResetAt)} />
          </div>
        </div>
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
          <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-4 py-3 text-[13px] text-text">
            <input type="checkbox" name="archive" />
            Archive current scores before reset
          </label>
          <Field label="Reset Label (Optional)" name="resetLabel" placeholder="Season 1 reset" />
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
const onTurnTimeoutOptions: OnTurnTimeout[] = ['CHANGE_TO_NEXT_PLAYER', 'DELEGATE_MOVE'];

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
    disconnectedTurnTimerSeconds: 0,
    afkTurnTimerSeconds: 0,
    reconnectMoveHistorySize: 0,
    onTurnTimeout: 'CHANGE_TO_NEXT_PLAYER',
    revealPrivateListsOnTimeout: false,
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
    disconnectedTurnTimerSeconds: relayConfig.disconnectedTurnTimerSeconds,
    afkTurnTimerSeconds: relayConfig.afkTurnTimerSeconds,
    reconnectMoveHistorySize: relayConfig.reconnectMoveHistorySize,
    onTurnTimeout: relayConfig.onTurnTimeout,
    revealPrivateListsOnTimeout: relayConfig.revealPrivateListsOnTimeout,
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
  const timeoutRevealInvalid = form.revealPrivateListsOnTimeout && form.onTurnTimeout !== 'DELEGATE_MOVE';

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
          <input type="hidden" name="disconnectedTurnTimerSeconds" value={form.disconnectedTurnTimerSeconds} />
          <input type="hidden" name="afkTurnTimerSeconds" value={form.afkTurnTimerSeconds} />
          <input type="hidden" name="reconnectMoveHistorySize" value={form.reconnectMoveHistorySize} />
          <input type="hidden" name="onTurnTimeout" value={form.onTurnTimeout} />
          <input type="hidden" name="revealPrivateListsOnTimeout" value={String(form.revealPrivateListsOnTimeout)} />
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
                min={0}
                value={form.waitReconnectSeconds}
                onChange={(value) => updateForm({ waitReconnectSeconds: Math.max(0, Math.trunc(value || 0)) })}
              />
              <NumberField
                label="Disconnected Turn Timer (Seconds)"
                min={0}
                value={form.disconnectedTurnTimerSeconds}
                onChange={(value) => updateForm({ disconnectedTurnTimerSeconds: Math.max(0, Math.trunc(value || 0)) })}
              />
              <NumberField
                label="AFK Turn Timer (Seconds)"
                min={0}
                value={form.afkTurnTimerSeconds}
                onChange={(value) => updateForm({ afkTurnTimerSeconds: Math.max(0, Math.trunc(value || 0)) })}
              />
              <NumberField
                label="Reconnect Move History Size"
                min={0}
                max={20}
                value={form.reconnectMoveHistorySize}
                onChange={(value) => updateForm({ reconnectMoveHistorySize: Math.max(0, Math.min(20, Math.trunc(value || 0))) })}
              />
              <label className="block">
                <FieldLabel>On Turn Timeout</FieldLabel>
                <select
                  value={form.onTurnTimeout}
                  onChange={(event) => updateForm({ onTurnTimeout: event.target.value as OnTurnTimeout })}
                  className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition focus:border-accent"
                >
                  {onTurnTimeoutOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 rounded border border-border2 bg-surface px-4 py-3 text-[13px] text-text">
                <input
                  type="checkbox"
                  checked={form.revealPrivateListsOnTimeout}
                  onChange={(event) => updateForm({ revealPrivateListsOnTimeout: event.target.checked })}
                />
                Reveal private lists on timeout
              </label>
            </div>
            {timeoutRevealInvalid ? (
              <div className="mt-4 rounded border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-3 text-[12px] text-danger">
                revealPrivateListsOnTimeout=true requires onTurnTimeout=DELEGATE_MOVE.
              </div>
            ) : null}
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
            <PendingButton
              className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
              pendingLabel={isEdit ? 'Saving...' : 'Creating...'}
              disabled={timeoutRevealInvalid}
            >
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

export function BillingAutoUpgradeForm({
  gameId,
  autoUpgrade,
  currentCcu,
  activeModules,
  supportContactName,
  supportContactEmail,
}: {
  gameId: string;
  autoUpgrade: boolean;
  currentCcu: number;
  activeModules: string[];
  supportContactName: string;
  supportContactEmail: string;
}) {
  type BillingChargeSummary = {
    orderId: string;
    subscriptionId: string;
    invoiceNumber: string | null;
    status: string;
    paid: boolean;
    totalAmount: number;
    subtotalAmount: number | null;
    taxAmount: number | null;
    currency: string;
    billingReason: string;
    createdAt: string | null;
    paidAt: string | null;
  };

  type BillingPollResponse = {
    tiers?: Record<string, string>;
    tierLimits?: Record<string, number>;
    latestSubscriptionUpdateCharge?: BillingChargeSummary | null;
  };

  function getCurrentPlanCcuFromTierLimits(tierLimits: Record<string, number> | undefined) {
    const numericValues = Object.values(tierLimits ?? {}).filter((value) => Number.isFinite(value));
    if (numericValues.length === 0) {
      return 0;
    }
    return Math.max(...numericValues);
  }

  const [state, formAction] = useActionState(updateBillingAutoUpgradeAction, initialDashboardActionState);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [pendingUpgrade, setPendingUpgrade] = useState<{
    targetPlanId: string;
    targetProductId: string;
    selectedCcu: number;
    selectedModules: string[];
    currency: string;
    billingStateSynchronized: boolean;
    latestSubscriptionUpdateCharge: BillingChargeSummary | null;
  } | null>(null);
  const router = useRouter();

  useDashboardActionFeedback(state);

  useEffect(() => {
    if (!pendingUpgrade) {
      return;
    }
    if (pendingUpgrade.latestSubscriptionUpdateCharge || pendingUpgrade.billingStateSynchronized) {
      return;
    }

    let cancelled = false;
    const pollIntervalMs = 5000;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/dev/dashboard/${gameId}/billing`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as BillingPollResponse;
        const currentPlanCcu = getCurrentPlanCcuFromTierLimits(data.tierLimits);
        const hasTargetPlanId = Object.values(data.tiers ?? {}).includes(pendingUpgrade.targetPlanId);
        const hasReachedTargetCcu = currentPlanCcu >= pendingUpgrade.selectedCcu;
        const billingStateSynchronized = hasTargetPlanId || hasReachedTargetCcu;

        if (data.latestSubscriptionUpdateCharge && !cancelled) {
          setPendingUpgrade((current) => (current ? { ...current, latestSubscriptionUpdateCharge: data.latestSubscriptionUpdateCharge ?? null } : current));
          router.refresh();
          showDashboardToast({
            tone: 'success',
            message: 'Subscription update completed.',
          });
          return;
        }

        if (billingStateSynchronized && !cancelled) {
          setPendingUpgrade((current) => (current ? { ...current, billingStateSynchronized: true } : current));
          router.refresh();
          showDashboardToast({
            tone: 'success',
            message: 'Subscription update completed.',
          });
        }
      } catch {
        return;
      }
    };

    void pollStatus();
    const timer = window.setInterval(() => {
      if (pendingUpgrade.latestSubscriptionUpdateCharge || pendingUpgrade.billingStateSynchronized) {
        return;
      }
      void pollStatus();
    }, pollIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [gameId, pendingUpgrade, router]);

  return (
    <>
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
          <button
            type="button"
            onClick={() => setUpgradeOpen(true)}
            className="inline-flex items-center rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2"
          >
            Upgrade Plan
          </button>
        </div>
        {pendingUpgrade ? (
          <div className="rounded border border-[rgba(58,173,245,0.32)] bg-[rgba(58,173,245,0.08)] px-4 py-3 text-[13px] text-text">
            <div>
              Subscription update requested for <span className="font-medium">{pendingUpgrade.targetPlanId}</span>.
            </div>
            {pendingUpgrade.latestSubscriptionUpdateCharge ? (
              <>
                <div className="mt-2 font-medium">
                  Charged today:{' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: pendingUpgrade.latestSubscriptionUpdateCharge.currency || pendingUpgrade.currency || 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(pendingUpgrade.latestSubscriptionUpdateCharge.totalAmount)}
                </div>
                <div className="mt-1 text-[12px] text-muted">
                  Invoice {pendingUpgrade.latestSubscriptionUpdateCharge.invoiceNumber ?? pendingUpgrade.latestSubscriptionUpdateCharge.orderId}
                </div>
                <div className="mt-1 text-[12px] text-muted">
                  {pendingUpgrade.latestSubscriptionUpdateCharge.paid ? 'Paid' : 'Unpaid'} / {pendingUpgrade.latestSubscriptionUpdateCharge.status}
                </div>
              </>
            ) : pendingUpgrade.billingStateSynchronized ? (
              <>
                <div className="mt-2 font-medium">Subscription update completed.</div>
              </>
            ) : (
              <>
                <div className="mt-2 font-medium">Subscription update is processing.</div>
              </>
            )}
          </div>
        ) : null}
      </form>
      {upgradeOpen ? (
        <UpgradeSubscriptionModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          gameId={gameId}
          currentCcu={currentCcu}
          activeModules={activeModules}
          supportContactName={supportContactName}
          supportContactEmail={supportContactEmail}
          onPendingUpgradeStart={(pending) => {
            setPendingUpgrade({
              targetPlanId: pending.targetPlanId,
              targetProductId: pending.targetProductId,
              selectedCcu: pending.selectedCcu,
              selectedModules: pending.selectedModules,
              currency: pending.currency,
              billingStateSynchronized: false,
              latestSubscriptionUpdateCharge: null,
            });
            showDashboardToast({
              tone: 'success',
              message: 'Subscription update requested.',
            });
          }}
        />
      ) : null}
    </>
  );
}
