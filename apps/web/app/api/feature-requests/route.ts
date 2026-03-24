import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { featureRequestsService } from '@/lib/service-container';
import type { FeatureStatus } from '@prisma/client';

// GET /api/feature-requests — public list
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(url.searchParams.get('pageSize') ?? '25')));
  const status = url.searchParams.get('status') as FeatureStatus | null;
  const sort = url.searchParams.get('sort') === 'newest' ? 'newest' : 'votes';

  const { items, total } = await featureRequestsService.list({
    status: status ?? undefined,
    sort: sort as 'votes' | 'newest',
    page,
    pageSize,
  });

  return NextResponse.json({ items, total });
}

// POST /api/feature-requests — auth'd submit
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, description } = body;

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 });
  }
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
  }

  const request = await featureRequestsService.submit({
    title: title.trim(),
    description: description.trim(),
    profileId: profile.id,
  });

  return NextResponse.json({ request }, { status: 201 });
}
