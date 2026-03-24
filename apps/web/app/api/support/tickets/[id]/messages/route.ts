import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { supportService } from '@/lib/service-container';

// POST /api/support/tickets/[id]/messages — reply to ticket
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { message } = body;

  if (!message || typeof message !== 'string' || message.trim().length < 1) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const msg = await supportService.reply(id, 'USER', message.trim(), profile.id);
    return NextResponse.json({ message: msg }, { status: 201 });
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
