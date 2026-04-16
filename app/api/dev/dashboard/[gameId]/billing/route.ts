import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backend-auth';

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

type BillingOverview = {
  autoUpgrade: boolean;
  burstActive: boolean;
  burstUsedThisMonth: boolean;
  burstExpiresAt: string | null;
  burstUsedAt: string | null;
  tiers: Record<string, string>;
  tierLimits: Record<string, number>;
  latestSubscriptionUpdateCharge: BillingChargeSummary | null;
};

export async function GET(_request: Request, { params }: { params: Promise<{ gameId: string }> }) {
  try {
    const { gameId } = await params;
    const response = (await backendFetch(`/v1/dev/dashboard/${gameId}/billing`)) as BillingOverview | null;
    if (!response) {
      return NextResponse.json({ error: 'Billing status not found' }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('[BILLING_STATUS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to load billing status.' }, { status: 500 });
  }
}
