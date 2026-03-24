import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { supportService } from '@/lib/service-container';
import type { TicketStatus, TicketPriority } from '@prisma/client';

const VALID_STATUSES: TicketStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const VALID_PRIORITIES: TicketPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

// GET /api/admin/support/[id] — ticket detail with messages
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const ticket = await supportService.getTicket(id);
  return NextResponse.json({ ticket });
}

// PATCH /api/admin/support/[id] — update status/priority or reply
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.status && VALID_STATUSES.includes(body.status)) {
    const t = await supportService.updateStatus(id, body.status);
    return NextResponse.json({ ticket: t });
  }
  if (body.priority && VALID_PRIORITIES.includes(body.priority)) {
    const t = await supportService.updatePriority(id, body.priority);
    return NextResponse.json({ ticket: t });
  }
  if (body.message && typeof body.message === 'string') {
    const msg = await supportService.reply(id, 'ADMIN', body.message.trim());
    return NextResponse.json({ message: msg });
  }

  return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
}
