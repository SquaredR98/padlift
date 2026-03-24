'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Users, Shield, Crown, ChevronRight } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { StatCard } from '../../components/ui/stat-card';
import { Badge } from '../../components/ui/badge';
import { DataTable, type Column } from '../../components/ui/data-table';

interface UserRow {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: string;
  role: string;
  adminPermissions: string[];
  createdAt: string;
  gumroadSubscriptionId: string | null;
  _count: { sites: number };
}

const PLAN_FILTERS = ['All', 'FREE', 'PRO', 'BUSINESS'] as const;
const ROLE_FILTERS = ['All', 'USER', 'ADMIN', 'SUPER_ADMIN'] as const;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const pageSize = 25;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (search) params.set('search', search);
      if (planFilter !== 'All') params.set('plan', planFilter);
      if (roleFilter !== 'All') params.set('role', roleFilter);

      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, [page, search, planFilter, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const proCount = users.filter((u) => u.plan === 'PRO').length;
  const bizCount = users.filter((u) => u.plan === 'BUSINESS').length;

  const columns: Column<UserRow>[] = [
    {
      key: 'user',
      header: 'User',
      render: (row) => (
        <Link href={`/dashboard/admin/users/${row.id}`} className="group block">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
              {row.name?.charAt(0)?.toUpperCase() ?? row.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-foreground group-hover:underline">{row.name || 'Unnamed'}</p>
              <p className="text-xs text-dimmed-foreground">{row.email}</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      className: 'w-28',
      render: (row) => (
        <Badge variant={row.plan === 'BUSINESS' ? 'purple' : row.plan === 'PRO' ? 'info' : 'default'}>
          {row.plan}
        </Badge>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      className: 'w-32',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.role === 'SUPER_ADMIN' && <Crown className="h-3.5 w-3.5 text-amber-500" />}
          {row.role === 'ADMIN' && <Shield className="h-3.5 w-3.5 text-blue-500" />}
          <span className={`text-sm ${row.role !== 'USER' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
            {row.role === 'SUPER_ADMIN' ? 'Super Admin' : row.role === 'ADMIN' ? 'Admin' : 'User'}
          </span>
        </div>
      ),
    },
    {
      key: 'sites',
      header: 'Sites',
      className: 'w-20',
      render: (row) => <span className="text-muted-foreground">{row._count.sites}</span>,
    },
    {
      key: 'joined',
      header: 'Joined',
      className: 'w-28',
      render: (row) => (
        <span className="text-dimmed-foreground">
          {new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-10',
      render: (row) => (
        <Link href={`/dashboard/admin/users/${row.id}`}>
          <ChevronRight className="h-4 w-4 text-dimmed-foreground" />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        badge={<Badge variant="info">{total} users</Badge>}
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dimmed-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-dimmed-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {PLAN_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => { setPlanFilter(f); setPage(1); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    planFilter === f ? 'bg-muted text-foreground' : 'text-dimmed-foreground hover:text-muted-foreground'
                  }`}
                >
                  {f === 'All' ? 'All Plans' : f}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {ROLE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => { setRoleFilter(f); setPage(1); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    roleFilter === f ? 'bg-muted text-foreground' : 'text-dimmed-foreground hover:text-muted-foreground'
                  }`}
                >
                  {f === 'All' ? 'All Roles' : f === 'SUPER_ADMIN' ? 'Super' : f === 'ADMIN' ? 'Admin' : 'User'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={users}
          keyExtractor={(row) => row.id}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: setPage,
          }}
          emptyMessage={search ? 'No users matching your search' : 'No users yet'}
        />
      </div>
    </div>
  );
}
