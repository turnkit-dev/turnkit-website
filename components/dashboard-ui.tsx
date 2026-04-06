'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { type DashboardActionState } from '@/lib/dashboard-action-state';

type DashboardToast = {
  id: number;
  message: string;
  tone: 'success' | 'error';
};

type DashboardToastEventDetail = Omit<DashboardToast, 'id'>;

const dashboardToastEventName = 'turnkit:dashboard-toast';

export function showDashboardToast(detail: DashboardToastEventDetail) {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent<DashboardToastEventDetail>(dashboardToastEventName, { detail }));
}

export function useDashboardActionFeedback(
  state: DashboardActionState,
  options?: {
    refreshOnSuccess?: boolean;
    onSuccess?: (state: DashboardActionState) => void;
    onError?: (state: DashboardActionState) => void;
  },
) {
  const router = useRouter();
  const handledTimestamp = useRef(0);

  useEffect(() => {
    if (state.status === 'idle' || !state.timestamp || handledTimestamp.current === state.timestamp) {
      return;
    }

    handledTimestamp.current = state.timestamp;
    showDashboardToast({
      message: state.message,
      tone: state.status === 'error' ? 'error' : 'success',
    });

    if (state.status === 'success') {
      if (options?.refreshOnSuccess !== false) {
        router.refresh();
      }
      options?.onSuccess?.(state);
      return;
    }

    if (state.reauthPath) {
      router.push(state.reauthPath);
      return;
    }

    options?.onError?.(state);
  }, [options, router, state]);
}

export function PendingButton({
  children,
  className,
  pendingLabel,
  type = 'submit',
}: {
  children: ReactNode;
  className: string;
  pendingLabel: string;
  type?: 'button' | 'submit';
}) {
  const { pending } = useFormStatus();
  return (
    <button type={type} disabled={pending} className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export function Modal({
  open,
  title,
  description,
  onClose,
  panelClassName,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  panelClassName?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,12,0.82)] px-4 py-6">
      <div className="absolute inset-0" onClick={onClose} />
      <div className={`relative z-10 w-full rounded border border-border2 bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${panelClassName ?? 'max-w-[520px]'}`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="font-display text-[24px] font-bold tracking-[-0.02em] text-text">{title}</div>
            {description ? <p className="mt-2 text-[13px] leading-[1.6] text-muted">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-[3px] border border-border2 px-3 py-2 text-xs text-muted transition hover:text-text">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DashboardToaster() {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<DashboardToast[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleToast(event: Event) {
      const customEvent = event as CustomEvent<DashboardToastEventDetail>;
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, ...customEvent.detail }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4000);
    }

    window.addEventListener(dashboardToastEventName, handleToast as EventListener);
    return () => {
      window.removeEventListener(dashboardToastEventName, handleToast as EventListener);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-[76px] z-[110] flex flex-col items-center gap-3 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={
            toast.tone === 'error'
              ? 'w-full max-w-[520px] rounded border border-[rgba(248,113,113,0.32)] bg-[rgba(44,14,18,0.96)] px-4 py-3 text-[13px] text-[#fecaca] shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
              : 'w-full max-w-[520px] rounded border border-[rgba(61,214,140,0.28)] bg-[rgba(8,28,18,0.96)] px-4 py-3 text-[13px] text-[#bbf7d0] shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
          }
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body,
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{label}</div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition placeholder:text-faint focus:border-accent"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{label}</div>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-[3px] border border-border2 bg-bg px-3 py-2.5 text-[14px] text-text outline-none transition placeholder:text-faint focus:border-accent"
      />
    </label>
  );
}

export function SectionButton({
  children,
  onClick,
  destructive = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        destructive
          ? 'inline-flex items-center rounded-[3px] border border-[rgba(248,113,113,0.32)] bg-[rgba(248,113,113,0.08)] px-3 py-2 text-xs text-danger transition hover:bg-[rgba(248,113,113,0.14)]'
          : 'inline-flex items-center rounded-[3px] border border-border2 px-3 py-2 text-xs text-text transition hover:bg-surface2'
      }
    >
      {children}
    </button>
  );
}

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center rounded-[3px] border border-border2 px-2.5 py-1.5 text-[11px] text-muted transition hover:border-faint hover:text-text"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
