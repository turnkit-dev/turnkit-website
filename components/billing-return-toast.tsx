'use client';

import { useEffect, useRef } from 'react';
import { showDashboardToast } from '@/components/dashboard-ui';

type BillingReturnToastProps = {
  billingStatus?: string;
};

function getToastFromStatus(statusRaw: string) {
  const status = statusRaw.trim().toLowerCase();

  if (status === 'success') {
    return {
      tone: 'success' as const,
      message: 'Subscription updated successfully.',
    };
  }

  if (status === 'cancel' || status === 'cancelled') {
    return {
      tone: 'error' as const,
      message: 'Checkout was canceled. No changes were made.',
    };
  }

  if (status === 'failed' || status === 'error') {
    return {
      tone: 'error' as const,
      message: 'Checkout failed. Please try again.',
    };
  }

  return null;
}

export function BillingReturnToast({ billingStatus }: BillingReturnToastProps) {
  const handledRef = useRef(false);

  useEffect(() => {
    if (!billingStatus || handledRef.current) {
      return;
    }

    const toast = getToastFromStatus(billingStatus);
    if (!toast) {
      return;
    }

    handledRef.current = true;
    showDashboardToast(toast);

    const url = new URL(window.location.href);
    url.searchParams.delete('billing');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, [billingStatus]);

  return null;
}
