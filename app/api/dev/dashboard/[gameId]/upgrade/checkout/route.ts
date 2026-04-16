import { NextResponse, type NextRequest } from 'next/server';
import { backendFetch } from '@/lib/backend-auth';

export async function POST(request: NextRequest, { params }: { params: Promise<{ gameId: string }> }) {
  try {
    const { gameId } = await params;
    const body = await request.json();
    const response = await backendFetch(`/v1/dev/dashboard/${gameId}/upgrade/checkout`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (response === null) {
      return NextResponse.json({ error: 'Upgrade checkout not found' }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('[UPGRADE_CHECKOUT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to start upgrade checkout.' }, { status: 500 });
  }
}
