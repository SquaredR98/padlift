'use client';

import type { FieldDef } from '@/lib/templates/content-schema';
import { ImageField } from '@/app/dashboard/sites/[siteId]/edit/_components/ImageField';
import { TextField, TextareaField, ColorField, UrlField, BooleanField } from './primitives';

// Re-export all primitives for consumers
export { SectionGroup, TextField, TextareaField, ColorField, UrlField, BooleanField } from './primitives';

// ─── List Field ─────────────────────────────────────────────

interface ListFieldProps {
  label: string;
  items: Record<string, unknown>[];
  listFields: FieldDef[];
  onChange: (items: Record<string, unknown>[]) => void;
}

export function ListField({ label, items, listFields, onChange }: ListFieldProps) {
  const addItem = () => {
    const newItem: Record<string, unknown> = {};
    for (const f of listFields) {
      newItem[f.key] = f.defaultValue ?? '';
    }
    onChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, key: string, value: unknown) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] block">{label}</span>
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] p-3 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--lp-text-muted)]">#{i + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-xs text-[var(--lp-text-muted)] hover:text-[var(--lp-error)] transition-colors"
            >
              Remove
            </button>
          </div>
          {listFields.map((f) => (
            <DynamicField
              key={f.key}
              field={f}
              value={(item[f.key] as string) ?? ''}
              onChange={(val) => updateItem(i, f.key, val)}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="w-full rounded-md border border-dashed border-[var(--lp-border)] py-2 text-xs text-[var(--lp-text-muted)] hover:border-[var(--lp-text-secondary)] hover:text-[var(--lp-text-secondary)] transition-colors"
      >
        + Add {label.replace(/s$/, '')}
      </button>
    </div>
  );
}

// ─── Dynamic Field Router ───────────────────────────────────

interface DynamicFieldProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function DynamicField({ field, value, onChange }: DynamicFieldProps) {
  switch (field.type) {
    case 'text':
      return <TextField label={field.label} value={String(value ?? '')} onChange={onChange} placeholder={field.placeholder} />;
    case 'textarea': {
      const textVal = Array.isArray(value) ? value.join('\n') : String(value ?? '');
      return <TextareaField label={field.label} value={textVal} onChange={onChange} placeholder={field.placeholder} />;
    }
    case 'color':
      return <ColorField label={field.label} value={String(value ?? '#3b82f6')} onChange={onChange} />;
    case 'url':
      return <UrlField label={field.label} value={String(value ?? '')} onChange={onChange} placeholder={field.placeholder} />;
    case 'image':
      return <ImageField label={field.label} value={String(value ?? '')} onChange={onChange} placeholder={field.placeholder} />;
    case 'boolean':
      return <BooleanField label={field.label} value={value === true || value === 'true'} onChange={onChange} />;
    case 'list':
      return <ListField label={field.label} items={(Array.isArray(value) ? value : []) as Record<string, unknown>[]} listFields={field.listFields ?? []} onChange={onChange} />;
    default:
      return null;
  }
}
