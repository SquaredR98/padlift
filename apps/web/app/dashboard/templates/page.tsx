'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Loader2 } from 'lucide-react';
import { PageHeader } from '../components/ui/page-header';
import { CATEGORY_COLORS, ACCENT_COLORS, getTemplateIcon } from './template-data';

interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function TemplatesGalleryPage() {
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => { setTemplates(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(templates.map((t) => t.category))];
  const filtered = filter === 'all' ? templates : templates.filter((t) => t.category === filter);

  return (
    <div>
      <PageHeader title="Templates" description="Preview, customize branding, and use a template." />

      <div className="px-5 pb-8 pt-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition ${
                filter === cat
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t) => {
              const accent = ACCENT_COLORS[t.id] || '#3b82f6';
              return (
                <Link key={t.id} href={`/dashboard/templates/${t.id}`} className="group relative overflow-hidden rounded-xl border border-border transition hover:border-muted-foreground/30">
                  <div className="h-1" style={{ background: accent }} />
                  <div className="flex h-40 items-center justify-center bg-card" style={{ background: `linear-gradient(135deg, ${accent}10 0%, var(--card) 100%)` }}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: `${accent}20`, color: accent }}>
                      {getTemplateIcon(t.id)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${CATEGORY_COLORS[t.category] || 'bg-gray-500/10 text-muted-foreground border-gray-500/20'}`}>
                        {t.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-dimmed-foreground">{t.description}</p>
                    <div className="mt-4 flex gap-2">
                      <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition group-hover:border-muted-foreground/50 group-hover:text-foreground">
                        <Eye className="h-3 w-3" /> Preview
                      </span>
                      <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition hover:opacity-90" style={{ background: accent }}>
                        Use Template
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-dimmed-foreground">No templates in this category.</div>
        )}
      </div>
    </div>
  );
}
