import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { getPlanConfig } from '@/lib/plan-gate';
import { isPaymentsEnabled } from '@/lib/app-settings';
import type { Plan } from '@prisma/client';

/**
 * Gumroad checkout URL generator.
 *
 * POST { tier: "PRO" | "BUSINESS", billing?: "monthly" | "yearly", experimentId?: string }
 * Returns { url: string } — the Gumroad checkout URL to redirect the user to.
 *
 * For membership products, the URL includes ?email= to pre-fill the checkout.
 */
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const tier = body.tier as Plan;
  const billing = (body.billing as string) ?? 'monthly';
  const experimentId = body.experimentId as string | undefined;

  if (!tier || !['PRO', 'BUSINESS'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
  }

  // Check if payments are enabled
  const paymentsOn = await isPaymentsEnabled();
  if (!paymentsOn) {
    return NextResponse.json(
      {
        error: 'Paid plans are coming soon! Sign up free now and you\'ll be the first to know when they launch.',
        code: 'PAYMENTS_DISABLED',
      },
      { status: 403 },
    );
  }

  // If experiment ID provided, increment conversions counter (fire-and-forget)
  if (experimentId) {
    db.pricingExperiment
      .update({ where: { id: experimentId }, data: { conversions: { increment: 1 } } })
      .catch(() => {});
  }

  const planConfig = await getPlanConfig(tier);

  // Return the Gumroad checkout URL
  const url =
    billing === 'yearly'
      ? planConfig.gumroadYearlyUrl
      : planConfig.gumroadMonthlyUrl;

  if (!url) {
    return NextResponse.json(
      { error: 'Checkout URL not configured for this plan' },
      { status: 400 },
    );
  }

  // Pre-fill email on the Gumroad checkout
  const separator = url.includes('?') ? '&' : '?';
  const checkoutUrl = `${url}${separator}email=${encodeURIComponent(profile.email)}`;

  return NextResponse.json({ url: checkoutUrl });
}
