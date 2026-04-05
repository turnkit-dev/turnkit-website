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
import type { AuthMode, LeaderboardRecord, RelayConfigRecord, SmtpSettings } from '@/lib/dashboard';

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
            <Field label="Username" name="username" defaultValue={smtp.username} />
            <Field label="Password" name="password" type="password" defaultValue={smtp.password} />
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

export function RelayConfigModal({ gameId, relayConfig }: { gameId: string; relayConfig?: RelayConfigRecord }) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(relayConfig);
  const [state, formAction] = useActionState(isEdit ? updateRelayConfigAction : createRelayConfigAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess() {
      setOpen(false);
    },
  });

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>{isEdit ? 'Edit' : '+ New Relay Config'}</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title={isEdit ? 'Edit Relay Config' : 'New Relay Config'}>
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          {relayConfig ? <input type="hidden" name="relayConfigSlug" value={relayConfig.slug} /> : null}
          <Field label="Slug" name="name" defaultValue={relayConfig?.slug} required placeholder="main-relay" />
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Status</div>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-3 py-3 text-[13px] text-text">
                <input type="radio" name="status" value="active" defaultChecked={!relayConfig || relayConfig.status === 'active'} />
                Active
              </label>
              <label className="flex items-center gap-3 rounded border border-border2 bg-bg px-3 py-3 text-[13px] text-text">
                <input type="radio" name="status" value="inactive" defaultChecked={relayConfig?.status === 'inactive'} />
                Inactive
              </label>
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
