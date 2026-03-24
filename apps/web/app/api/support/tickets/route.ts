import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { supportService } from '@/lib/service-container';

// GET /api/support/tickets — user's own tickets
export async function GET() {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { items, total } = await supportService.listTickets({ profileId: profile.id });
  return NextResponse.json({ items, total });
}

// POST /api/support/tickets — create ticket
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { subject, message } = body;

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    return NextResponse.json({ error: 'Subject must be at least 3 characters' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
  }

  const ticket = await supportService.createTicket({
    subject: subject.trim(),
    message: message.trim(),
    profileId: profile.id,
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
