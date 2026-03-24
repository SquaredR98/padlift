// Admin access control
// Bootstrap emails always have SUPER_ADMIN access (failsafe).
// Other admins are managed via the `role` + `adminPermissions` fields on Profile.

const BOOTSTRAP_EMAILS = new Set([
  'mail@ravi-ranjan.in',
]);

// ─── Permissions ────────────────────────────────────────────
export const ADMIN_PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_BILLING: 'manage_billing',
  MANAGE_PLANS: 'manage_plans',
  MANAGE_SITES: 'manage_sites',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings',
} as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS];

export const ALL_PERMISSIONS: { key: AdminPermission; label: string; description: string }[] = [
  { key: 'manage_users', label: 'Manage Users', description: 'View, edit, and manage user accounts and roles' },
  { key: 'manage_billing', label: 'Manage Billing', description: 'View revenue, subscriptions, and billing data' },
  { key: 'manage_plans', label: 'Manage Plans', description: 'Edit plan tiers, pricing, and feature limits' },
  { key: 'manage_sites', label: 'Manage Sites', description: 'View and manage all sites across the platform' },
  { key: 'view_analytics', label: 'View Analytics', description: 'Access platform-wide analytics and stats' },
  { key: 'manage_settings', label: 'Manage Settings', description: 'Manage admin users and system configuration' },
];

// ─── Bootstrap ──────────────────────────────────────────────
export function getBootstrapAdminEmails(): string[] {
  return Array.from(BOOTSTRAP_EMAILS);
}

// ─── Role checks ────────────────────────────────────────────

type ProfileLike = { email: string; role?: string; adminPermissions?: string[] };

/**
 * Check if a user has admin-level access (ADMIN or SUPER_ADMIN).
 * Accepts a plain email string (backward compat) or a profile object.
 */
export function isAdmin(
  input: string | null | undefined | ProfileLike,
): boolean {
  if (!input) return false;
  if (typeof input === 'string') {
    return BOOTSTRAP_EMAILS.has(input);
  }
  return (
    input.role === 'SUPER_ADMIN' ||
    input.role === 'ADMIN' ||
    BOOTSTRAP_EMAILS.has(input.email)
  );
}

/**
 * Check if a user is a Super Admin (full access, no permission checks).
 */
export function isSuperAdmin(
  input: string | null | undefined | ProfileLike,
): boolean {
  if (!input) return false;
  if (typeof input === 'string') {
    return BOOTSTRAP_EMAILS.has(input);
  }
  return input.role === 'SUPER_ADMIN' || BOOTSTRAP_EMAILS.has(input.email);
}

/**
 * Check if a user has a specific permission.
 * Super Admins always have all permissions.
 * Regular Admins must have the permission in their `adminPermissions` array.
 */
export function hasPermission(
  profile: ProfileLike | null | undefined,
  permission: AdminPermission,
): boolean {
  if (!profile) return false;
  if (BOOTSTRAP_EMAILS.has(profile.email)) return true;
  if (profile.role === 'SUPER_ADMIN') return true;
  if (profile.role === 'ADMIN') {
    return profile.adminPermissions?.includes(permission) ?? false;
  }
  return false;
}
