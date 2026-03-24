'use client';

import { Sun, Moon } from 'lucide-react';
import type { TemplateBranding } from '@/lib/templates/block-types';
import { resolveFonts } from '@/lib/templates/block-types';
import { BLOCK_BRANDING_FIELDS } from '@/lib/templates/content-schema';
import { SectionGroup, DynamicField } from '@/components/dashboard/form-fields';
import { ImageField } from './ImageField';
import { FontPairPicker } from '@/components/dashboard/font-picker';

interface BrandingEditorProps {
  branding: TemplateBranding;
  onChange: (key: string, value: unknown) => void;
}

export function BrandingEditor({ branding, onChange }: BrandingEditorProps) {
  const currentTheme = branding.defaultTheme || 'dark';
  const { headingFont, bodyFont } = resolveFonts(branding);

  return (
    <div>
      <div className="px-4 py-3 border-b border-[var(--lp-border)]">
        <h3 className="text-sm font-semibold text-[var(--lp-text)]">Global Branding</h3>
        <p className="text-xs text-[var(--lp-text-muted)] mt-0.5">
          These settings apply to all blocks
        </p>
      </div>

      <SectionGroup label="Site Theme" defaultOpen={true}>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange('defaultTheme', 'dark')}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition ${
              currentTheme === 'dark'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-[var(--lp-border)] hover:border-[var(--lp-text-muted)]'
            }`}
          >
            <Moon className="h-5 w-5 text-[var(--lp-text-secondary)]" />
            <span className="text-xs font-medium text-[var(--lp-text)]">Dark</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('defaultTheme', 'light')}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition ${
              currentTheme === 'light'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-[var(--lp-border)] hover:border-[var(--lp-text-muted)]'
            }`}
          >
            <Sun className="h-5 w-5 text-[var(--lp-text-secondary)]" />
            <span className="text-xs font-medium text-[var(--lp-text)]">Light</span>
          </button>
        </div>
      </SectionGroup>

      <SectionGroup label="Brand Identity" defaultOpen={true}>
        {BLOCK_BRANDING_FIELDS
          .filter((f) => f.key !== 'headingFont' && f.key !== 'bodyFont')
          .map((field) => (
            <DynamicField
              key={field.key}
              field={field}
              value={(branding as unknown as Record<string, unknown>)[field.key] ?? field.defaultValue}
              onChange={(v) => onChange(field.key, v)}
            />
          ))}
      </SectionGroup>

      <SectionGroup label="Typography" defaultOpen={true}>
        <FontPairPicker
          headingFont={headingFont}
          bodyFont={bodyFont}
          onChangeHeading={(v) => onChange('headingFont', v)}
          onChangeBody={(v) => onChange('bodyFont', v)}
        />
      </SectionGroup>

      <SectionGroup label="Logo" defaultOpen={true}>
        <ImageField
          label="Company Logo"
          value={branding.logoUrl ?? ''}
          onChange={(v) => onChange('logoUrl', v || null)}
          placeholder="Upload your company logo"
        />
      </SectionGroup>
    </div>
  );
}
