import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { supportService } from '@/lib/service-container';

// GET /api/support/tickets/[id] — ticket detail with messages
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const ticket = await supportService.getTicket(id, profile.id);
    return NextResponse.json({ ticket });
  } catch (err: any) {
    if (err.name === 'NotFoundError') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (err.name === 'ForbiddenError') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    throw err;
  }
}
