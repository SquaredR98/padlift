'use client';

import { Paintbrush, Type, Sparkles, Palette, Loader2 } from 'lucide-react';

interface BrandingSidebarProps {
  companyName: string;
  tagline: string;
  primaryColor: string;
  claiming: boolean;
  onCompanyNameChange: (v: string) => void;
  onTaglineChange: (v: string) => void;
  onPrimaryColorChange: (v: string) => void;
  onUseTemplate: () => void;
}

const COLOR_PRESETS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444',
  '#f59e0b', '#10b981', '#6366f1', '#f97316',
];

export function BrandingSidebar({
  companyName, tagline, primaryColor, claiming,
  onCompanyNameChange, onTaglineChange, onPrimaryColorChange, onUseTemplate,
}: BrandingSidebarProps) {
  return (
    <div className="w-72 shrink-0 overflow-y-auto border-l border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <Paintbrush className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Custom Branding</h3>
      </div>
      <p className="mb-5 text-xs text-dimmed-foreground">
        Preview how this template looks with your brand. Changes are live &mdash; no data is saved until you use this template.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Type className="h-3 w-3" /> Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder-dimmed-foreground focus:border-blue-500 focus:outline-none"
            placeholder="Your Company"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => onTaglineChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder-dimmed-foreground focus:border-blue-500 focus:outline-none"
            placeholder="Your tagline here"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Palette className="h-3 w-3" /> Brand Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-border bg-muted p-0.5"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono text-foreground focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs text-dimmed-foreground">Quick presets</span>
          <div className="flex flex-wrap gap-1.5">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                onClick={() => onPrimaryColorChange(color)}
                className={`h-7 w-7 rounded-md border-2 transition ${
                  primaryColor === color ? 'border-white' : 'border-transparent'
                }`}
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
        <p className="mb-3 text-xs text-muted-foreground">
          Happy with the look? Use this template to create your site.
        </p>
        <button
          onClick={onUseTemplate}
          disabled={claiming}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Use This Template
        </button>
      </div>
    </div>
  );
}
