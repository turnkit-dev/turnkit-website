'use client';

import { useEffect, useMemo, useState } from 'react';
import { Modal, SectionButton, TextArea, Field } from '@/components/dashboard-ui';
import {
  BILLING_CCU_TIERS,
  BILLING_MODULE_KEYS,
  calculateMonthlyTotal,
  formatPrice,
  getCurrentSubscriptionCcu,
  getModuleDescription,
  getModuleLabel,
  getNextCcuTier,
  getSelectedTierPrice,
  normalizeSelectableModules,
  type UpgradeModuleKey,
} from '@/lib/billing-upgrade';

type UpgradeCheckoutRequest = {
  selectedCcu: number;
  selectedModules: UpgradeModuleKey[];
};

type UpgradeCheckoutResponse = {
  checkoutUrl: string | null;
  checkoutSessionId: string | null;
  subscriptionUpdated: boolean;
  flowType: 'checkout' | 'subscription_update_preview';
  requiresConfirmation: boolean;
  subscriptionId: string | null;
  currentPlanId: string | null;
  currentPlanName: string | null;
  currentPriceInCents: number | null;
  targetPlanId: string;
  targetPlanName: string;
  targetPriceInCents: number;
  estimatedProrationCents: number | null;
  estimatedChargeTodayCents: number | null;
  estimatedCreditTodayCents: number | null;
  billingPeriodStart: string | null;
  billingPeriodEnd: string | null;
  estimateIsExact: boolean;
  targetProductId: string;
  currency: string;
};

type UpgradeConfirmResponse = {
  flowType: 'checkout' | 'subscription_update_confirmed';
  optimistic: boolean;
  subscriptionUpdateRequested: boolean;
  checkoutUrl: string | null;
  checkoutSessionId: string | null;
  subscriptionId: string | null;
  targetProductId: string;
  targetPlanId: string;
  targetPriceInCents: number;
  currency: string;
};

type PendingUpgradeState = {
  targetPlanId: string;
  targetProductId: string;
  selectedCcu: number;
  selectedModules: UpgradeModuleKey[];
  estimatedChargeTodayCents: number | null;
  estimatedCreditTodayCents: number | null;
  currency: string;
};

function formatCurrencyFromCents(valueInCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueInCents / 100);
}

function sortModules(modules: UpgradeModuleKey[]) {
  return [...modules].sort((a, b) => BILLING_MODULE_KEYS.indexOf(a) - BILLING_MODULE_KEYS.indexOf(b));
}

export function UpgradeSubscriptionModal({
  open,
  onClose,
  gameId,
  currentCcu,
  activeModules,
  supportContactName,
  supportContactEmail,
  onPendingUpgradeStart,
}: {
  open: boolean;
  onClose: () => void;
  gameId: string;
  currentCcu: number;
  activeModules: string[];
  supportContactName: string;
  supportContactEmail: string;
  onPendingUpgradeStart?: (pending: PendingUpgradeState) => void;
}) {
  const selectableCurrentModules = useMemo(() => sortModules(normalizeSelectableModules(activeModules)), [activeModules]);
  const currentSubscriptionCcu = useMemo(() => getCurrentSubscriptionCcu(currentCcu), [currentCcu]);
  const nextTier = getNextCcuTier(currentSubscriptionCcu);
  const isCustomPlan = nextTier === null;
  const maxSelectableCcu = BILLING_CCU_TIERS[BILLING_CCU_TIERS.length - 1] ?? currentSubscriptionCcu;
  const initialSelectedCcu = nextTier ?? maxSelectableCcu;
  const [showCustomPlanSelector, setShowCustomPlanSelector] = useState(false);
  const showingTierSelector = !isCustomPlan || showCustomPlanSelector;

  const [selectedCcu, setSelectedCcu] = useState(initialSelectedCcu);
  const [selectedModules, setSelectedModules] = useState<UpgradeModuleKey[]>(selectableCurrentModules);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<UpgradeCheckoutResponse | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    setSelectedCcu(initialSelectedCcu);
    setSelectedModules(selectableCurrentModules);
    setLoading(false);
    setError('');
    setPreview(null);
    setShowCustomPlanSelector(false);
  }, [initialSelectedCcu, open, selectableCurrentModules]);

  const currentModulesLabel = selectableCurrentModules.length > 0 ? selectableCurrentModules.map(getModuleLabel).join(', ') : 'None';
  const selectedModulesLabel = selectedModules.length > 0 ? selectedModules.map(getModuleLabel).join(', ') : 'None';
  const currentMonthlyTotal = calculateMonthlyTotal(currentSubscriptionCcu, selectableCurrentModules);
  const upgradedMonthlyTotal = calculateMonthlyTotal(selectedCcu, selectedModules);
  const selectedTierIndex = Math.max(0, BILLING_CCU_TIERS.indexOf(selectedCcu as (typeof BILLING_CCU_TIERS)[number]));
  const selectedModulePrices = selectedModules.map((module) => ({
    key: module,
    label: getModuleLabel(module),
    price: getSelectedTierPrice(module, selectedCcu),
  }));

  function toggleModule(module: UpgradeModuleKey) {
    setSelectedModules((current) => (current.includes(module) ? current.filter((value) => value !== module) : sortModules([...current, module])));
  }

  function buildUpgradeRequest(): UpgradeCheckoutRequest {
    return {
      selectedCcu,
      selectedModules,
    };
  }

  async function handleCheckoutPreview() {
    if ((!showingTierSelector && isCustomPlan) || loading) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/dev/dashboard/${gameId}/upgrade/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildUpgradeRequest()),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as UpgradeCheckoutResponse;

      if (data.flowType === 'subscription_update_preview') {
        setPreview(data);
        setLoading(false);
        return;
      }

      if (data.flowType === 'checkout' && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }

      throw new Error('Unable to continue upgrade flow from checkout response.');
    } catch (checkoutError) {
      setLoading(false);
      setError(checkoutError instanceof Error && checkoutError.message ? checkoutError.message : 'Failed to start checkout.');
    }
  }

  async function handleConfirmUpgrade() {
    if (!preview || loading) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/dev/dashboard/${gameId}/upgrade/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildUpgradeRequest()),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as UpgradeConfirmResponse;

      if (data.flowType === 'subscription_update_confirmed') {
        if (data.optimistic && data.subscriptionUpdateRequested) {
          onPendingUpgradeStart?.({
            targetPlanId: data.targetPlanId,
            targetProductId: data.targetProductId,
            selectedCcu,
            selectedModules,
            estimatedChargeTodayCents: preview.estimatedChargeTodayCents,
            estimatedCreditTodayCents: preview.estimatedCreditTodayCents,
            currency: preview.currency,
          });
        }
        onClose();
        return;
      }

      if (data.flowType === 'checkout' && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }

      throw new Error('Unable to complete upgrade confirmation.');
    } catch (confirmError) {
      setLoading(false);
      setError(confirmError instanceof Error && confirmError.message ? confirmError.message : 'Failed to confirm upgrade.');
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={showingTierSelector ? 'Upgrade Your Subscription' : 'Contact Support'}
      description={
        showingTierSelector
          ? 'Pick the bundle you want, then confirm before finalizing.'
          : 'Request a custom plan from the team.'
      }
      panelClassName="max-w-[1180px]"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {!showingTierSelector ? (
            <ContactSupportForm
              gameId={gameId}
              currentCcu={currentSubscriptionCcu}
              currentModules={selectableCurrentModules}
              initialIntent="custom-plan"
              allowDowngradeButton={isCustomPlan}
              onChooseDowngrade={() => {
                setShowCustomPlanSelector(true);
                setSelectedCcu(maxSelectableCcu);
                setPreview(null);
                setError('');
              }}
              defaultName={supportContactName}
              defaultEmail={supportContactEmail}
              onDone={onClose}
            />
          ) : (
            <>
              <div className="rounded border border-border2 bg-bg p-4">
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Concurrent Users (CCU)</div>
                <div className="flex items-center justify-between gap-4 text-[13px] text-muted">
                  <span>Currently: {currentSubscriptionCcu} CCU</span>
                  <span>Upgrading to: {selectedCcu} CCU</span>
                </div>
                <div className="mt-4">
                  <input
                    type="range"
                    min={0}
                    max={BILLING_CCU_TIERS.length - 1}
                    step={1}
                    value={selectedTierIndex}
                    onChange={(event) => setSelectedCcu(BILLING_CCU_TIERS[Number(event.target.value)] ?? currentSubscriptionCcu)}
                    className="w-full accent-[#3AADF5]"
                  />
                  <div className="mt-3 grid grid-cols-6 gap-2 text-center text-[11px] text-faint">
                    {BILLING_CCU_TIERS.map((tier, index) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedCcu(tier)}
                        className={
                          tier === selectedCcu
                            ? 'rounded border border-accent bg-[rgba(58,173,245,0.12)] px-2 py-2 text-[11px] text-text'
                            : 'rounded border border-border2 bg-surface px-2 py-2 text-[11px] text-muted transition hover:bg-surface2'
                        }
                      >
                        <div className="font-medium">{tier} CCU</div>
                        <div className="mt-1 text-[10px]">{index === 0 ? 'Free' : 'Paid'}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded border border-border2 bg-bg p-4">
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Modules & Add-ons</div>
                <div className="space-y-3">
                  {BILLING_MODULE_KEYS.map((module) => {
                    const checked = selectedModules.includes(module);
                    const price = getSelectedTierPrice(module, selectedCcu);
                    return (
                      <label key={module} className="flex items-start gap-3 rounded border border-border2 bg-surface px-4 py-3 text-[13px] text-text">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleModule(module)}
                          className="mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium">{getModuleLabel(module)}</div>
                            <div className="text-[12px] text-muted">{formatPrice(price)}/mo</div>
                          </div>
                          <div className="mt-1 text-[12px] text-muted">{getModuleDescription(module)}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {!showingTierSelector ? (
            <>
              <div className="rounded border border-border2 bg-bg p-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Current Subscription</div>
                <div className="mt-3 space-y-2 text-[13px] text-text">
                  <div>CCU: {currentSubscriptionCcu}</div>
                  <div>Modules: {currentModulesLabel}</div>
                  <div>Monthly: {formatPrice(currentMonthlyTotal)}</div>
                </div>
              </div>
              <div className="rounded border border-border2 bg-surface p-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">What Happens Next</div>
                <div className="mt-3 text-[13px] leading-[1.6] text-text">We will review your request and follow up with a custom plan if you need more than 640 CCU.</div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded border border-border2 bg-bg p-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Current Subscription</div>
                <div className="mt-3 space-y-2 text-[13px] text-text">
                  <div>CCU: {currentSubscriptionCcu}</div>
                  <div>Modules: {currentModulesLabel}</div>
                  <div>Monthly: {formatPrice(currentMonthlyTotal)}</div>
                </div>
              </div>

              <div className="rounded border border-border2 bg-bg p-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Selected Subscription</div>
                <div className="mt-3 space-y-2 text-[13px] text-text">
                  <div>CCU: {selectedCcu}</div>
                  <div>Modules: {selectedModulesLabel}</div>
                  <div>New monthly: {formatPrice(upgradedMonthlyTotal)}</div>
                  <div className="pt-2 text-[12px] text-muted">
                    {selectedModulePrices.length > 0 ? (
                      <div className="space-y-1">
                        {selectedModulePrices.map((module) => (
                          <div key={module.key} className="flex items-center justify-between gap-4">
                            <span>{module.label}</span>
                            <span>{formatPrice(module.price)}/mo</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      'No modules selected.'
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded border border-border2 bg-surface p-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">{preview ? 'Confirm Subscription Change' : 'Checkout Note'}</div>
                <div className="mt-3 text-[13px] leading-[1.6] text-text">
                  {preview ? (
                    <div className="space-y-2">
                      <div className="font-medium">Change to {preview.targetPlanName}</div>
                      <div>Current plan: {preview.currentPlanName ?? 'Unknown'}</div>
                      <div>Target plan: {preview.targetPlanName}</div>
                      {typeof preview.estimatedChargeTodayCents === 'number' && preview.estimatedChargeTodayCents > 0 ? (
                        <div>Estimated charge today: {formatCurrencyFromCents(preview.estimatedChargeTodayCents, preview.currency)}</div>
                      ) : null}
                      {typeof preview.estimatedCreditTodayCents === 'number' && preview.estimatedCreditTodayCents > 0 ? (
                        <div>Estimated return credit for today: {formatCurrencyFromCents(preview.estimatedCreditTodayCents, preview.currency)}</div>
                      ) : null}
                      {(!preview.estimatedChargeTodayCents || preview.estimatedChargeTodayCents <= 0) &&
                      (!preview.estimatedCreditTodayCents || preview.estimatedCreditTodayCents <= 0) ? (
                        <div>No immediate prorated charge estimated.</div>
                      ) : null}
                      <div className="pt-1 text-[12px] text-muted">
                        {preview.estimateIsExact ? 'Proration processed by Polar.' : 'Estimated proration processed by Polar.'}
                      </div>
                    </div>
                  ) : (
                    'Proration is calculated during checkout on Polar.'
                  )}
                </div>
                {error ? <div className="mt-3 text-[12px] text-danger">{error}</div> : null}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <SectionButton onClick={() => (showCustomPlanSelector ? setShowCustomPlanSelector(false) : onClose)}>
          {showCustomPlanSelector ? 'Back to Contact' : 'Cancel'}
        </SectionButton>
        {showingTierSelector ? (
          <>
            {preview ? (
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              disabled={loading}
              onClick={() => (preview ? void handleConfirmUpgrade() : void handleCheckoutPreview())}
              className="rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (preview ? 'Confirming...' : 'Loading...') : preview ? 'Confirm Change' : 'Continue'}
            </button>
          </>
        ) : null}
      </div>
    </Modal>
  );
}

function ContactSupportForm({
  gameId,
  currentCcu,
  currentModules,
  initialIntent,
  allowDowngradeButton,
  onChooseDowngrade,
  defaultName,
  defaultEmail,
  onDone,
}: {
  gameId: string;
  currentCcu: number;
  currentModules: UpgradeModuleKey[];
  initialIntent: 'custom-plan' | 'downgrade';
  allowDowngradeButton?: boolean;
  onChooseDowngrade?: () => void;
  defaultName: string;
  defaultEmail: string;
  onDone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [submittedInSession, setSubmittedInSession] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [intent, setIntent] = useState<'custom-plan' | 'downgrade'>(initialIntent);
  const currentModulesLabel = currentModules.length > 0 ? currentModules.map(getModuleLabel).join(', ') : 'None';
  const isDowngrade = intent === 'downgrade';

  useEffect(() => {
    setStatus('idle');
    setMessage('');
    setPending(false);
    setSubmittedInSession(false);
    setIntent(initialIntent);
  }, [gameId, initialIntent]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending || submittedInSession) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const details = String(formData.get('details') ?? '');
    const honeypot = String(formData.get('website') ?? '');

    setPending(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          intent,
          details,
          honeypot,
          context: {
            gameId,
            currentCcu,
            currentModules: currentModulesLabel,
          },
        }),
      });

      const raw = await response.text();
      let data: { success?: boolean; error?: string; message?: string } = {};

      if (raw) {
        try {
          data = JSON.parse(raw) as { success?: boolean; error?: string; message?: string };
        } catch {
          data = {};
        }
      }

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message ?? 'Thanks. We will get back to you soon.');
        setSubmittedInSession(true);
        return;
      }

      setStatus('error');
      setMessage(data.error ?? data.message ?? 'Something went wrong. Please try again or email support@turnkit.dev.');
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded border border-[rgba(240,164,41,0.32)] bg-[rgba(240,164,41,0.08)] p-4">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Contact Support</div>
      <p className="mb-4 text-[13px] leading-[1.6] text-text">
        {isDowngrade
          ? 'Send your downgrade request and we will follow up about reducing your subscription.'
          : 'You are already on the maximum public CCU tier. Send us your requirements and we will follow up about a custom plan.'}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-px w-px opacity-0"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" name="name" required placeholder="Your name" defaultValue={defaultName} autoComplete="name" />
          <Field label="Email" name="email" type="email" required placeholder="you@studio.com" defaultValue={defaultEmail} autoComplete="email" />
        </div>
        <TextArea
          label="What do you need?"
          name="details"
          defaultValue={
            'We need a custom plan for:'
          }
          placeholder={isDowngrade ? 'Tell us which lower plan you want and when to apply it.' : 'Tell us about your expected usage and modules.'}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {allowDowngradeButton && !isDowngrade ? (
              <button
                type="button"
                onClick={() => onChooseDowngrade?.()}
                className="inline-flex items-center rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2"
              >
                Downgrade Plan
              </button>
            ) : null}
            <button
              type="submit"
              disabled={pending || submittedInSession}
              className="inline-flex items-center rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5] disabled:cursor-not-allowed disabled:bg-border2"
            >
              {pending ? 'Sending...' : submittedInSession ? 'Request Sent' : 'Send Request'}
            </button>
          </div>
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center rounded-[3px] border border-border2 px-4 py-2.5 text-[13px] text-text transition hover:bg-surface2"
          >
            Close
          </button>
        </div>
        <p className={`min-h-5 text-[13px] ${status === 'success' ? 'text-green' : status === 'error' ? 'text-danger' : 'text-muted'}`}>{message}</p>
      </form>
    </div>
  );
}
