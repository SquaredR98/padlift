import { NextRequest } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { getMaxStorageMb } from '@/lib/plan-gate';
import { mediaService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

export async function GET(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const siteId = req.nextUrl.searchParams.get('siteId') || undefined;

  try {
    const files = await mediaService.list(profile.id, siteId);

    // Also return storage usage info
    const usage = await db.mediaFile.aggregate({
      where: { userId: profile.id },
      _sum: { size: true },
      _count: true,
    });

    const usedBytes = usage._sum.size ?? 0;
    const maxMb = await getMaxStorageMb(profile.plan);

    return Response.json({
      files,
      storage: {
        usedBytes,
        maxBytes: maxMb * 1024 * 1024,
        fileCount: usage._count,
      },
    });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const siteId = (formData.get('siteId') as string) || null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Check storage quota before uploading
    const maxMb = await getMaxStorageMb(profile.plan);
    const maxBytes = maxMb * 1024 * 1024;

    const usage = await db.mediaFile.aggregate({
      where: { userId: profile.id },
      _sum: { size: true },
    });

    const usedBytes = usage._sum.size ?? 0;

    if (usedBytes + buffer.length > maxBytes) {
      const usedMb = (usedBytes / (1024 * 1024)).toFixed(1);
      return Response.json(
        {
          error: `Storage limit reached (${usedMb} MB / ${maxMb} MB). Compress your images or upgrade your plan for more storage.`,
          code: 'STORAGE_LIMIT',
          usedBytes,
          maxBytes,
        },
        { status: 403 },
      );
    }

    const media = await mediaService.upload(profile.id, siteId, {
      name: file.name,
      type: file.type,
      buffer,
    });

    return Response.json(media, { status: 201 });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
