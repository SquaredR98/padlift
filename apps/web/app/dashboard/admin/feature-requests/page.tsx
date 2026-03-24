'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { Badge } from '../../components/ui/badge';
import { DataTable, type Column } from '../../components/ui/data-table';

interface FeatureRow {
  id: string;
  title: string;
  description: string;
  status: string;
  voteCount: number;
  createdAt: string;
  profile: { name: string | null; email: string } | null;
}

const STATUS_FILTERS = ['All', 'OPEN', 'PLANNED', 'IN_PROGRESS', 'SHIPPED', 'DECLINED'] as const;
const STATUS_OPTIONS = ['OPEN', 'PLANNED', 'IN_PROGRESS', 'SHIPPED', 'DECLINED'] as const;

const STATUS_VARIANT: Record<string, string> = {
  OPEN: 'default',
  PLANNED: 'info',
  IN_PROGRESS: 'warning',
  SHIPPED: 'success',
  DECLINED: 'error',
};

export default function AdminFeatureRequestsPage() {
  const [items, setItems] = useState<FeatureRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const pageSize = 25;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (statusFilter !== 'All') params.set('status', statusFilter);
      const res = await fetch(`/api/admin/feature-requests?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/feature-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this feature request?')) return;
    await fetch(`/api/admin/feature-requests/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const columns: Column<FeatureRow>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.title}</p>
          <p className="mt-0.5 max-w-md truncate text-xs text-dimmed-foreground">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'votes',
      header: 'Votes',
      className: 'w-20',
      render: (row) => <span className="font-medium text-foreground">{row.voteCount}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-40',
      render: (row) => (
        <div className="relative">
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, e.target.value)}
            className="appearance-none rounded-md border border-border bg-card px-2.5 py-1 pr-7 text-xs font-medium text-foreground transition hover:border-muted-foreground focus:outline-none"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-dimmed-foreground" />
        </div>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      className: 'w-36',
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.profile?.name || row.profile?.email || 'Anonymous'}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
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
        <button onClick={() => handleDelete(row.id)} className="rounded-md p-1.5 text-dimmed-foreground transition hover:bg-muted hover:text-red-500" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Feature Requests"
        badge={<Badge variant="info">{total} total</Badge>}
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        <div className="flex flex-wrap rounded-lg border border-border bg-card p-0.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setPage(1); }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === f ? 'bg-muted text-foreground' : 'text-dimmed-foreground hover:text-muted-foreground'
              }`}
            >
              {f === 'All' ? 'All' : f.replace('_', ' ')}
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={items}
          keyExtractor={(row) => row.id}
          pagination={{ page, pageSize, total, onPageChange: setPage }}
          emptyMessage="No feature requests yet"
        />
      </div>
    </div>
  );
}
