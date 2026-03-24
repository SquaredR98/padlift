import { NextRequest } from 'next/server';
import { waitlistService, sitesService, integrationsService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { db } from '@launchpad/db';
import { getMaxWaitlistEntries } from '@/lib/plan-gate';

/**
 * POST /api/waitlist/join
 * Public endpoint — called from published site waitlist forms.
 * Body: { siteId: string, email: string, ref?: string }
 */
export async function POST(req: NextRequest) {
  let body: { siteId?: string; email?: string; ref?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { siteId, email, ref } = body;

  if (!siteId || !email) {
    return Response.json(
      { error: 'siteId and email are required' },
      { status: 400 },
    );
  }

  try {
    // Check waitlist entry cap for site owner's plan
    const site = await sitesService.findById(siteId);
    const owner = await db.profile.findUniqueOrThrow({
      where: { id: site.profileId },
    });
    const max = await getMaxWaitlistEntries(owner.plan);
    const currentCount = await db.waitlistEntry.count({ where: { siteId } });
    if (currentCount >= max) {
      return Response.json(
        { error: 'This waitlist has reached its capacity.' },
        { status: 403 },
      );
    }

    const result = await waitlistService.join({
      siteId,
      email,
      referralCode: ref,
    });

    // Fire-and-forget: sync to Google Sheets + fire webhook
    void integrationsService.syncToGoogleSheets(siteId).catch(console.error);
    void integrationsService.fireWebhook(siteId, 'waitlist.join', { email }).catch(console.error);

    return Response.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
