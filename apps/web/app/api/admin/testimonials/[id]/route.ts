import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { testimonialsService } from '@/lib/service-container';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.action === 'approve') {
    const t = await testimonialsService.approve(id);
    return NextResponse.json({ testimonial: t });
  }
  if (body.action === 'reject') {
    const t = await testimonialsService.reject(id);
    return NextResponse.json({ testimonial: t });
  }
  if (body.action === 'toggleFeatured') {
    const t = await testimonialsService.toggleFeatured(id);
    return NextResponse.json({ testimonial: t });
  }
  if (body.action === 'updatePosition' && typeof body.position === 'number') {
    const t = await testimonialsService.updatePosition(id, body.position);
    return NextResponse.json({ testimonial: t });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  await testimonialsService.delete(id);
  return NextResponse.json({ ok: true });
}
