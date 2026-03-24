import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { featureRequestsService } from '@/lib/service-container';

// POST /api/feature-requests/[id]/vote — toggle vote
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const result = await featureRequestsService.vote(id, profile.id);
  return NextResponse.json(result);
}
