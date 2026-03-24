'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield, Crown, Save, Loader2, Check } from 'lucide-react';
import { PageHeader } from '../../../components/ui/page-header';
import { Badge } from '../../../components/ui/badge';
import { type AdminPermission } from '@/lib/admin';
import { BillingInfo, PermissionsGrid, UserSitesTable } from '@/components/dashboard/admin/user-detail-sections';

interface UserDetail {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: string;
  role: string;
  adminPermissions: string[];
  gumroadSubscriptionId: string | null;
  gumroadCustomerId: string | null;
  planExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  sites: {
    id: string; name: string; slug: string; mode: string; publishedAt: string | null; createdAt: string;
    _count: { waitlistEntries: number; visitors: number; pages: number };
  }[];
  _count: { sites: number; mediaFiles: number };
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [plan, setPlan] = useState('');
  const [role, setRole] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data); setPlan(data.plan); setRole(data.role); setPermissions(data.adminPermissions ?? []);
      }
    } finally { setLoading(false); }
  }, [userId]);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, role, adminPermissions: permissions }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUser((prev) => prev ? { ...prev, ...updated } : prev);
        setSaved(true); setTimeout(() => setSaved(false), 2000);
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update');
      }
    } finally { setSaving(false); }
  };

  const togglePermission = (perm: AdminPermission) => {
    setPermissions((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" /></div>;
  if (!user) return <div className="px-5 py-20 text-center text-dimmed-foreground">User not found</div>;

  const hasChanges = plan !== user.plan || role !== user.role ||
    JSON.stringify(permissions.sort()) !== JSON.stringify((user.adminPermissions ?? []).sort());

  return (
    <div>
      <PageHeader
        title={user.name || user.email}
        badge={<Badge variant={user.plan === 'BUSINESS' ? 'purple' : user.plan === 'PRO' ? 'info' : 'default'}>{user.plan}</Badge>}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/dashboard/admin/users" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
            {hasChanges && (
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
              </button>
            )}
          </div>
        }
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        {/* Profile card */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
              {user.name?.charAt(0)?.toUpperCase() ?? user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">{user.name || 'Unnamed'}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-dimmed-foreground">
                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>&middot;</span>
                <span>{user._count.sites} sites</span>
                <span>&middot;</span>
                <span>{user._count.mediaFiles} media files</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {user.role === 'SUPER_ADMIN' && <Crown className="h-4 w-4 text-amber-500" />}
              {user.role === 'ADMIN' && <Shield className="h-4 w-4 text-blue-500" />}
              <span className="text-sm font-medium text-foreground">
                {user.role === 'SUPER_ADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Plan & Role */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Plan & Role</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Billing Plan</label>
                <div className="flex gap-2">
                  {['FREE', 'PRO', 'BUSINESS'].map((p) => (
                    <button key={p} onClick={() => setPlan(p)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      plan === p
                        ? p === 'PRO' ? 'bg-blue-600 text-white' : p === 'BUSINESS' ? 'bg-purple-600 text-white' : 'bg-muted text-foreground'
                        : 'border border-border text-muted-foreground hover:bg-muted'
                    }`}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Admin Role</label>
                <div className="flex gap-2">
                  {['USER', 'ADMIN', 'SUPER_ADMIN'].map((r) => (
                    <button key={r} onClick={() => setRole(r)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      role === r
                        ? r === 'SUPER_ADMIN' ? 'bg-amber-600 text-white' : r === 'ADMIN' ? 'bg-blue-600 text-white' : 'bg-muted text-foreground'
                        : 'border border-border text-muted-foreground hover:bg-muted'
                    }`}>{r === 'SUPER_ADMIN' ? 'Super Admin' : r === 'ADMIN' ? 'Admin' : 'User'}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <BillingInfo user={user} />
        </div>

        {role === 'ADMIN' && <PermissionsGrid permissions={permissions} onToggle={togglePermission} />}
        <UserSitesTable sites={user.sites} />
      </div>
    </div>
  );
}
