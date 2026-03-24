import { NextResponse } from 'next/server';
import { isPaymentsEnabled } from '@/lib/app-settings';

/**
 * Public endpoint — returns whether payments/checkout are enabled.
 * Used by pricing CTAs and upgrade buttons to show "Coming Soon" when disabled.
 */
export async function GET() {
  const enabled = await isPaymentsEnabled();
  return NextResponse.json({ paymentsEnabled: enabled });
}
