import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { db } from '@launchpad/db';
import { getMaxPaymentLinks, planLimitResponse } from '@/lib/plan-gate';

// GET /api/sites/[siteId]/payment-links — list payment links
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return Response.json(site.paymentLinks);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// POST /api/sites/[siteId]/payment-links — create a payment link
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Plan gate: check payment link limit
    const maxLinks = await getMaxPaymentLinks(profile.plan);
    if (maxLinks === 0) {
      return await planLimitResponse('payment links', profile.plan);
    }
    if (site.paymentLinks.length >= maxLinks) {
      return Response.json(
        { error: `You've reached the maximum of ${maxLinks} payment links for your plan.`, code: 'PLAN_LIMIT' },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { planName, price, billingCycle, stripeUrl } = body;

    if (!planName || price == null || !billingCycle || !stripeUrl) {
      return Response.json(
        { error: 'planName, price, billingCycle, and stripeUrl are required' },
        { status: 400 },
      );
    }

    const link = await db.paymentLink.create({
      data: {
        siteId,
        planName,
        price,
        billingCycle,
        stripeUrl,
        position: site.paymentLinks.length,
      },
    });

    return Response.json(link, { status: 201 });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// DELETE /api/sites/[siteId]/payment-links — delete a payment link (by id in body)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) {
      return Response.json({ error: 'id is required' }, { status: 400 });
    }

    await db.paymentLink.delete({ where: { id, siteId } });
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
