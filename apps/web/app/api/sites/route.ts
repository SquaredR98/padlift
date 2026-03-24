import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { getMaxPages, planLimitResponse } from '@/lib/plan-gate';

// GET /api/sites — list creator's sites
export async function GET() {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sites = await sitesService.findByProfileId(profile.id);
  return Response.json(sites);
}

// POST /api/sites — create a new site
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Plan gate: check site count limit
    const existingSites = await sitesService.findByProfileId(profile.id);
    const maxPages = await getMaxPages(profile.plan);
    if (existingSites.length >= maxPages) {
      return await planLimitResponse('more sites', profile.plan);
    }

    const body = await req.json();
    const site = await sitesService.create({
      name: body.name,
      slug: body.slug,
      profileId: profile.id,
    });
    return Response.json(site, { status: 201 });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
