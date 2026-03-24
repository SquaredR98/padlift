import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { mediaService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ mediaId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { mediaId } = await params;

  try {
    await mediaService.delete(profile.id, mediaId);
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
