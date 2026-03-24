'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  Globe,
  Mail,
  Eye,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { StatCard } from '../../components/ui/stat-card';
import { Badge } from '../../components/ui/badge';
import { DataTable, type Column } from '../../components/ui/data-table';

interface SiteRow {
  id: string;
  name: string;
  slug: string;
  mode: string;
  publishedAt: string | null;
  customDomain: string | null;
  createdAt: string;
  profile: { id: string; email: string; name: string | null };
  _count: { waitlistEntries: number; visitors: number; pages: number };
}

const STATUS_FILTERS = ['All', 'Published', 'Draft'] as const;

export default function AdminSitesPage() {
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const pageSize = 25;

  const fetchSites = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (search) params.set('search', search);
      if (statusFilter !== 'All') params.set('status', statusFilter.toLowerCase());

      const res = await fetch(`/api/admin/sites?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSites(data.sites);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const publishedCount = sites.filter((s) => s.publishedAt).length;
  const draftCount = sites.filter((s) => !s.publishedAt).length;

  const columns: Column<SiteRow>[] = [
    {
      key: 'site',
      header: 'Site',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-dimmed-foreground">/s/{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (row) => (
        <Link
          href={`/dashboard/admin/users/${row.profile.id}`}
          className="group block"
        >
          <p className="text-sm text-foreground group-hover:underline">
            {row.profile.name || row.profile.email}
          </p>
          {row.profile.name && (
            <p className="text-xs text-dimmed-foreground">{row.profile.email}</p>
          )}
        </Link>
      ),
    },
    {
      key: 'pages',
      header: 'Pages',
      className: 'w-20',
      render: (row) => (
        <span className="text-muted-foreground">{row._count.pages}</span>
      ),
    },
    {
      key: 'waitlist',
      header: 'Waitlist',
      className: 'w-24',
      render: (row) => (
        <span className="flex items-center gap-1 text-muted-foreground">
          <Mail className="h-3 w-3" />
          {row._count.waitlistEntries}
        </span>
      ),
    },
    {
      key: 'visitors',
      header: 'Visitors',
      className: 'w-24',
      render: (row) => (
        <span className="flex items-center gap-1 text-muted-foreground">
          <Eye className="h-3 w-3" />
          {row._count.visitors}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-24',
      render: (row) => (
        <Badge variant={row.publishedAt ? 'success' : 'default'}>
          {row.publishedAt ? 'Live' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'created',
      header: 'Created',
      className: 'w-28',
      render: (row) => (
        <span className="text-dimmed-foreground">
          {new Date(row.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Sites"
        badge={<Badge variant="info">{total} sites</Badge>}
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dimmed-foreground" />
            <input
              type="text"
              placeholder="Search by site name, slug, or owner email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-dimmed-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
          </div>
          <div className="flex rounded-lg border border-border bg-card p-0.5">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setStatusFilter(f);
                  setPage(1);
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  statusFilter === f
                    ? 'bg-muted text-foreground'
                    : 'text-dimmed-foreground hover:text-muted-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={sites}
          keyExtractor={(row) => row.id}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: setPage,
          }}
          emptyMessage={
            search ? 'No sites matching your search' : 'No sites yet'
          }
        />
      </div>
    </div>
  );
}
