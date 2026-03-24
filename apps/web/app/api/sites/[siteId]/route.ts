import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { canUseCustomDomain, planLimitResponse } from '@/lib/plan-gate';

// GET /api/sites/[siteId] — get site details
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);

    // Ensure the site belongs to the authenticated user
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return Response.json(site);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// PATCH /api/sites/[siteId] — update site
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();

    // Plan gate: check custom domain permission
    if (body.customDomain && !(await canUseCustomDomain(profile.plan))) {
      return await planLimitResponse('custom domains', profile.plan);
    }

    const updated = await sitesService.update(siteId, body);
    return Response.json(updated);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// DELETE /api/sites/[siteId] — delete site
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    await sitesService.delete(siteId);
    return Response.json({ deleted: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
