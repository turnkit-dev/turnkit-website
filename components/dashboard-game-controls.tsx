'use client';

import { useActionState, useEffect, useState } from 'react';
import { createClientKeyAction, createGameAction, deleteClientKeyAction, deleteGameAction } from '@/app/actions/dashboard';
import { CopyButton, Field, Modal, PendingButton, SectionButton, useDashboardActionFeedback } from '@/components/dashboard-ui';
import { initialDashboardActionState } from '@/lib/dashboard-action-state';

export function NewGameModal() {
  const [open, setOpen] = useState(false);
  const [setupMode, setSetupMode] = useState<'quick' | 'manual'>('quick');

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
      >
        + New Game
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Create Game" description="Start with quick defaults or create an empty game shell.">
        <form action={createGameAction} className="space-y-5">
          <Field label="Name" name="name" required placeholder="My Turn Game" />
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Setup</div>
            <div className="space-y-2">
              <label className="flex items-start gap-3 rounded border border-border2 bg-bg px-3 py-3">
                <input type="radio" name="setupMode" value="quick" checked={setupMode === 'quick'} onChange={() => setSetupMode('quick')} className="mt-0.5" />
                <div>
                  <div className="text-[13px] text-text">Quick Setup</div>
                  <div className="mt-1 text-[12px] text-muted">Creates a default key, OPEN auth, a main leaderboard, and one active relay config.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded border border-border2 bg-bg px-3 py-3">
                <input type="radio" name="setupMode" value="manual" checked={setupMode === 'manual'} onChange={() => setSetupMode('manual')} className="mt-0.5" />
                <div>
                  <div className="text-[13px] text-text">Manual Setup</div>
                  <div className="mt-1 text-[12px] text-muted">Creates the game only. Add keys, auth, leaderboards, and relays later.</div>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Creating...">
              Create Game
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeleteGameButton({ gameId, label = 'Delete Game' }: { gameId: string; label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionButton onClick={() => setOpen(true)} destructive>
        {label}
      </SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Game" description="This removes the game and all dashboard data stored for it.">
        <form action={deleteGameAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <div className="text-[14px] text-muted">This action cannot be undone.</div>
          <div className="flex justify-end gap-3">
            <SectionButton onClick={() => setOpen(false)}>Cancel</SectionButton>
            <PendingButton
              className="rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-2.5 text-[13px] font-medium text-danger transition hover:bg-[rgba(248,113,113,0.14)]"
              pendingLabel="Deleting..."
            >
              Delete Game
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function NewClientKeyModal({ gameId }: { gameId: string }) {
  const [open, setOpen] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState('');
  const [state, formAction] = useActionState(createClientKeyAction, initialDashboardActionState);

  useDashboardActionFeedback(state, {
    onSuccess(result) {
      setOpen(false);
      setCreatedKey(result.fullKey ?? '');
      setRevealOpen(Boolean(result.fullKey));
    },
  });

  useEffect(() => {
    if (!open || state.status !== 'success') {
      return;
    }
    const form = document.getElementById(`new-client-key-form-${gameId}`) as HTMLFormElement | null;
    form?.reset();
  }, [gameId, open, state.status, state.timestamp]);

  return (
    <>
      <SectionButton onClick={() => setOpen(true)}>+ New Client Key</SectionButton>
      <Modal open={open} onClose={() => setOpen(false)} title="New Client Key">
        <form id={`new-client-key-form-${gameId}`} action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <Field label="Display Name" name="displayName" required placeholder="Production" />
          <div className="flex justify-end">
            <PendingButton className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]" pendingLabel="Creating...">
              Create Key
            </PendingButton>
          </div>
        </form>
      </Modal>
      <Modal
        open={revealOpen}
        onClose={() => setRevealOpen(false)}
        title="Client Key Created"
        description="This full client key is shown only once. Copy it now before closing this dialog."
      >
        <div className="space-y-5">
          <div className="rounded border border-border2 bg-bg px-4 py-3 font-mono text-[13px] text-text break-all">{createdKey}</div>
          <div className="flex justify-end gap-3">
            <CopyButton value={createdKey} />
            <SectionButton onClick={() => setRevealOpen(false)}>Close</SectionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function DeleteClientKeyButton({ gameId, clientKeyId }: { gameId: string; clientKeyId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deleteClientKeyAction, initialDashboardActionState);

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
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Client Key" description="Existing clients using this key will stop authenticating.">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="clientKeyId" value={clientKeyId} />
          <div className="flex justify-end gap-3">
            <SectionButton onClick={() => setOpen(false)}>Cancel</SectionButton>
            <PendingButton
              className="rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-4 py-2.5 text-[13px] font-medium text-danger transition hover:bg-[rgba(248,113,113,0.14)]"
              pendingLabel="Deleting..."
            >
              Delete Key
            </PendingButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
