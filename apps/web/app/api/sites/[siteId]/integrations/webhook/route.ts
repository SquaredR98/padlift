import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { integrationsService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

/**
 * PUT /api/sites/:siteId/integrations/webhook
 * Set or update webhook configuration.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  let body: { url?: string; secret?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.url) {
    return Response.json({ error: 'url is required' }, { status: 400 });
  }

  try {
    const integration = await integrationsService.setWebhook(siteId, profile.id, body.url, body.secret);
    const { credentials, ...safe } = integration;
    return Response.json(safe);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

/**
 * DELETE /api/sites/:siteId/integrations/webhook
 * Remove webhook integration.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  try {
    await integrationsService.removeWebhook(siteId, profile.id);
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
