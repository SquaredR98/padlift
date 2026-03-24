'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// ─── Section Group (collapsible accordion) ──────────────────

interface SectionGroupProps {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SectionGroup({ label, defaultOpen = true, children }: SectionGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--lp-border)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left text-sm font-semibold text-[var(--lp-text-secondary)] hover:text-[var(--lp-text)] transition-colors"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-[var(--lp-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-5 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Text Field ─────────────────────────────────────────────

export function TextField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1 block">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors"
      />
    </label>
  );
}

// ─── Textarea Field ─────────────────────────────────────────

export function TextareaField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1 block">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors resize-none"
      />
    </label>
  );
}

// ─── Color Field ────────────────────────────────────────────

export function ColorField({ label, value, onChange }: {
  label: string; value: string; onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1 block">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-[var(--lp-border)] bg-transparent p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-sm text-[var(--lp-text)] font-mono focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors"
        />
      </div>
    </label>
  );
}

// ─── URL Field ──────────────────────────────────────────────

export function UrlField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1 block">{label}</span>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors"
      />
    </label>
  );
}

// ─── Boolean Field ──────────────────────────────────────────

export function BooleanField({ label, value, onChange }: {
  label: string; value: boolean; onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-xs font-medium text-[var(--lp-text-muted)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          value ? 'bg-[var(--lp-accent)]' : 'bg-[var(--lp-bg-active)]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}
