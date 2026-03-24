'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Trash2, Check, X, Bookmark } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { Badge } from '../../components/ui/badge';
import { DataTable, type Column } from '../../components/ui/data-table';

interface TestimonialRow {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  rating: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  featured: boolean;
  position: number;
  createdAt: string;
}

const STATUS_FILTERS = ['All', 'PENDING', 'APPROVED', 'REJECTED'] as const;

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
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
      const res = await fetch(`/api/admin/testimonials?${params}`);
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

  const handleAction = async (id: string, action: string) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const statusVariant = (s: string) =>
    s === 'APPROVED' ? 'success' : s === 'REJECTED' ? 'error' : 'warning';

  const columns: Column<TestimonialRow>[] = [
    {
      key: 'name',
      header: 'Author',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          {row.role && <p className="text-xs text-dimmed-foreground">{row.role}{row.company ? ` at ${row.company}` : ''}</p>}
        </div>
      ),
    },
    {
      key: 'quote',
      header: 'Quote',
      render: (row) => (
        <p className="max-w-sm truncate text-sm text-muted-foreground">&ldquo;{row.quote}&rdquo;</p>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      className: 'w-28',
      render: (row) => (
        <div className="flex gap-0.5">
          {Array.from({ length: row.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-28',
      render: (row) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge>,
    },
    {
      key: 'featured',
      header: 'Featured',
      className: 'w-24',
      render: (row) => (
        <button
          onClick={() => handleAction(row.id, 'toggleFeatured')}
          className={`rounded-md p-1.5 transition ${row.featured ? 'text-amber-500 hover:text-amber-400' : 'text-dimmed-foreground hover:text-muted-foreground'}`}
          title={row.featured ? 'Unfeature' : 'Feature'}
        >
          <Bookmark className={`h-4 w-4 ${row.featured ? 'fill-current' : ''}`} />
        </button>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-28',
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.status !== 'APPROVED' && (
            <button onClick={() => handleAction(row.id, 'approve')} className="rounded-md p-1.5 text-green-500 transition hover:bg-muted" title="Approve">
              <Check className="h-4 w-4" />
            </button>
          )}
          {row.status !== 'REJECTED' && (
            <button onClick={() => handleAction(row.id, 'reject')} className="rounded-md p-1.5 text-red-500 transition hover:bg-muted" title="Reject">
              <X className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => handleDelete(row.id)} className="rounded-md p-1.5 text-dimmed-foreground transition hover:bg-muted hover:text-red-500" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Testimonials"
        badge={<Badge variant="info">{total} total</Badge>}
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
              {f === 'All' ? 'All' : f}
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={items}
          keyExtractor={(row) => row.id}
          pagination={{ page, pageSize, total, onPageChange: setPage }}
          emptyMessage="No testimonials yet"
        />
      </div>
    </div>
  );
}
