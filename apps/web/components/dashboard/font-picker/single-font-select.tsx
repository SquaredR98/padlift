'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import type { GoogleFont } from '@/lib/google-fonts';

interface SingleFontSelectProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
}

export function SingleFontSelect({ label, value, onChange }: SingleFontSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Fetch fonts with debounce
  useEffect(() => {
    if (!open) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        const res = await fetch(`/api/fonts?${params.toString()}`);
        const data = await res.json();
        setFonts(data);
      } catch {
        setFonts([]);
      }
      setLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open]);

  // Load initial fonts when opening
  useEffect(() => {
    if (open && fonts.length === 0) {
      setLoading(true);
      fetch('/api/fonts')
        .then((r) => r.json())
        .then((data) => setFonts(data))
        .catch(() => setFonts([]))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // Dynamically load Google Fonts CSS for preview
  useEffect(() => {
    if (!open) return;
    const families = fonts.slice(0, 20).map((f) => f.family);
    if (families.length === 0) return;

    const url = `https://fonts.googleapis.com/css2?${families
      .map((f) => `family=${encodeURIComponent(f)}:wght@400;500`)
      .join('&')}&display=swap`;

    const id = `lp-font-select-${label.replace(/\s+/g, '-').toLowerCase()}`;
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [fonts, open, label]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--lp-text-muted)]"
      >
        <div className="min-w-0 flex-1 text-left">
          <span className="block text-[10px] text-[var(--lp-text-muted)]">{label}</span>
          <span
            className="block truncate text-[var(--lp-text)]"
            style={{ fontFamily: `'${value}', sans-serif` }}
          >
            {value}
          </span>
        </div>
        <ChevronDown className={`ml-2 h-3.5 w-3.5 text-[var(--lp-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-[var(--lp-border)] bg-[var(--lp-bg-panel)] shadow-lg">
          <div className="border-b border-[var(--lp-border)] p-2">
            <div className="flex items-center gap-2 rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-[var(--lp-text-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fonts..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto p-1">
            {loading ? (
              <div className="px-3 py-4 text-center text-xs text-[var(--lp-text-muted)]">Loading fonts...</div>
            ) : fonts.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-[var(--lp-text-muted)]">No fonts found</div>
            ) : (
              fonts.map((font) => (
                <button
                  key={font.family}
                  type="button"
                  onClick={() => { onChange(font.family); setOpen(false); setQuery(''); }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                    font.family === value
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)]'
                  }`}
                >
                  <span style={{ fontFamily: `'${font.family}', sans-serif` }}>{font.family}</span>
                  {font.family === value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
