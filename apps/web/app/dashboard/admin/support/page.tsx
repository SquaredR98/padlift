'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { Badge } from '../../components/ui/badge';
import { DataTable, type Column } from '../../components/ui/data-table';

interface TicketRow {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  profile: { name: string | null; email: string };
  _count: { messages: number };
}

const STATUS_FILTERS = ['All', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;

const STATUS_VARIANT: Record<string, string> = {
  OPEN: 'warning',
  IN_PROGRESS: 'info',
  RESOLVED: 'success',
  CLOSED: 'default',
};

const PRIORITY_VARIANT: Record<string, string> = {
  LOW: 'default',
  MEDIUM: 'warning',
  HIGH: 'error',
};

export default function AdminSupportPage() {
  const [items, setItems] = useState<TicketRow[]>([]);
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
      const res = await fetch(`/api/admin/support?${params}`);
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

  const columns: Column<TicketRow>[] = [
    {
      key: 'subject',
      header: 'Subject',
      render: (row) => (
        <Link href={`/dashboard/admin/support/${row.id}`} className="group block">
          <p className="font-medium text-foreground group-hover:underline">{row.subject}</p>
          <p className="text-xs text-dimmed-foreground">{row.profile.name || row.profile.email}</p>
        </Link>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-28',
      render: (row) => (
        <Badge variant={(STATUS_VARIANT[row.status] || 'default') as any}>{row.status.replace('_', ' ')}</Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      className: 'w-24',
      render: (row) => (
        <Badge variant={(PRIORITY_VARIANT[row.priority] || 'default') as any}>{row.priority}</Badge>
      ),
    },
    {
      key: 'messages',
      header: 'Msgs',
      className: 'w-16',
      render: (row) => <span className="text-muted-foreground">{row._count.messages}</span>,
    },
    {
      key: 'updated',
      header: 'Last Activity',
      className: 'w-32',
      render: (row) => (
        <span className="text-dimmed-foreground">
          {new Date(row.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-10',
      render: (row) => (
        <Link href={`/dashboard/admin/support/${row.id}`}>
          <ChevronRight className="h-4 w-4 text-dimmed-foreground" />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Support Tickets"
        badge={<Badge variant="info">{total} tickets</Badge>}
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        <div className="flex rounded-lg border border-border bg-card p-0.5">
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
          emptyMessage="No support tickets yet"
        />
      </div>
    </div>
  );
}
