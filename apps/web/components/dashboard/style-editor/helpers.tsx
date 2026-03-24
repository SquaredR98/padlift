'use client';

import { useState } from 'react';

// ── Pill selector ───────────────────────────────────────────

export function PillSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1.5 block">{label}</span>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              value === opt.value
                ? 'bg-[var(--lp-accent)] text-white'
                : 'bg-[var(--lp-bg-surface)] text-[var(--lp-text-muted)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Range slider ────────────────────────────────────────────

export function RangeField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 5,
  suffix = '%',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[var(--lp-text-muted)]">{label}</span>
        <span className="text-xs text-[var(--lp-text-secondary)]">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[var(--lp-bg-surface)] accent-[var(--lp-accent)]"
      />
    </div>
  );
}

// ── Collapsible group ───────────────────────────────────────

export function StyleGroup({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--lp-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-0 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--lp-text-muted)] hover:text-[var(--lp-text-secondary)] transition-colors"
      >
        {label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="space-y-3 pb-4">{children}</div>}
    </div>
  );
}
