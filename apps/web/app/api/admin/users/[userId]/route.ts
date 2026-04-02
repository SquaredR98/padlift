import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import {
  hasPermission,
  isSuperAdmin,
  getBootstrapAdminEmails,
  ADMIN_PERMISSIONS,
} from '@/lib/admin';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_USERS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId } = await params;

  const user = await db.profile.findUnique({
    where: { id: userId },
    include: {
      sites: {
        select: {
          id: true,
          name: true,
          slug: true,
          mode: true,
          publishedAt: true,
          createdAt: true,
          _count: { select: { waitlistEntries: true, visitors: true, pages: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: { select: { sites: true, mediaFiles: true } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_USERS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId } = await params;
  const body = await req.json();

  const target = await db.profile.findUnique({ where: { id: userId } });
  if (!target) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};

  // Plan change
  if (body.plan && ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'].includes(body.plan)) {
    updateData.plan = body.plan;
  }

  // Role change — only Super Admins can change roles
  if (body.role && ['USER', 'ADMIN', 'SUPER_ADMIN'].includes(body.role)) {
    if (!isSuperAdmin(profile)) {
      return NextResponse.json(
        { error: 'Only Super Admins can change user roles' },
        { status: 403 },
      );
    }

    // Safety: cannot demote bootstrap emails below SUPER_ADMIN
    const bootstrapEmails = getBootstrapAdminEmails();
    if (body.role !== 'SUPER_ADMIN' && bootstrapEmails.includes(target.email)) {
      return NextResponse.json(
        { error: 'Cannot change role of bootstrap admin email' },
        { status: 400 },
      );
    }

    // Safety: cannot demote the last super admin
    if (body.role !== 'SUPER_ADMIN' && target.role === 'SUPER_ADMIN') {
      const superAdminCount = await db.profile.count({ where: { role: 'SUPER_ADMIN' } });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot demote the last Super Admin' },
          { status: 400 },
        );
      }
    }

    updateData.role = body.role;
  }

  // Admin permissions update — only Super Admins can change permissions
  if (Array.isArray(body.adminPermissions)) {
    if (!isSuperAdmin(profile)) {
      return NextResponse.json(
        { error: 'Only Super Admins can change admin permissions' },
        { status: 403 },
      );
    }
    updateData.adminPermissions = body.adminPermissions;
  }

  // Name update
  if (typeof body.name === 'string') {
    updateData.name = body.name;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const updated = await db.profile.update({
    where: { id: userId },
    data: updateData,
  });

  return NextResponse.json(updated);
}
