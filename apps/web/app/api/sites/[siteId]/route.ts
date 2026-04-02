import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { canUseCustomDomain, planLimitResponse } from '@/lib/plan-gate';
import { addDomainToVercel, removeDomainFromVercel } from '@/lib/vercel-domains';

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

    // Track old custom domain before update (for Vercel sync)
    const oldDomain = site.customDomain;
    const newDomain: string | null = body.customDomain ?? undefined;

    const updated = await sitesService.update(siteId, body);

    // Sync custom domain with Vercel (fire-and-forget, don't block response)
    if (newDomain !== undefined && newDomain !== oldDomain) {
      // Remove old domain if it existed
      if (oldDomain) {
        removeDomainFromVercel(oldDomain).catch(() => {});
      }
      // Add new domain if set
      if (newDomain) {
        addDomainToVercel(newDomain).catch(() => {});
      }
    }

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

    // Remove custom domain from Vercel before deleting
    if (site.customDomain) {
      removeDomainFromVercel(site.customDomain).catch(() => {});
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
