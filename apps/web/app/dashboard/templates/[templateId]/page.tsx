'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { TEMPLATE_PRESETS, buildPageDataFromPreset } from '@/lib/templates/presets';
import { BLOCK_REGISTRY } from '@/lib/templates/block-registry';
import { resolveBlockClasses, resolveBlockInlineStyles } from '@/lib/templates/block-types';
import type { TemplateBranding } from '@/lib/templates/block-types';
import { cn } from '@/lib/utils';
import { BrandingSidebar } from '@/components/dashboard/template-preview-sidebar';

export default function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const router = useRouter();

  const preset = useMemo(() => TEMPLATE_PRESETS.find((t) => t.id === templateId), [templateId]);
  const pageData = useMemo(() => (templateId ? buildPageDataFromPreset(templateId) : null), [templateId]);

  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState(preset?.branding.companyName || '');
  const [tagline, setTagline] = useState(preset?.branding.tagline || '');
  const [primaryColor, setPrimaryColor] = useState(preset?.branding.primaryColor || '#3b82f6');

  const branding: TemplateBranding = useMemo(
    () => ({ companyName, tagline, primaryColor, secondaryColor: primaryColor, logoUrl: null, headingFont: 'Inter', bodyFont: 'Inter', defaultTheme: 'dark' }),
    [companyName, tagline, primaryColor],
  );

  async function handleUseTemplate() {
    setClaiming(true);
    setError(null);
    try {
      const res = await fetch(`/api/templates/${templateId}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branding: { companyName, tagline, primaryColor, logoUrl: null } }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to create site from template'); setClaiming(false); return; }
      router.push(`/dashboard/sites/${data.siteId}/edit`);
    } catch {
      setError('Something went wrong. Please try again.');
      setClaiming(false);
    }
  }

  if (!preset || !pageData) {
    return (
      <div className="py-20 text-center text-sm text-dimmed-foreground">
        Template not found. <Link href="/dashboard/templates" className="text-blue-400 hover:underline">Back to gallery</Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/templates" className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Gallery
          </Link>
          <div className="h-4 w-px bg-border" />
          <h2 className="text-sm font-semibold text-foreground">{preset.name}</h2>
          <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">{preset.category}</span>
        </div>
        <button onClick={handleUseTemplate} disabled={claiming} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">
          {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Use This Template
        </button>
      </div>

      {error && (
        <div className="border-b border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">{error}</div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[#030712]">
          {pageData.blocks.map((block) => {
            const entry = BLOCK_REGISTRY[block.blockType];
            if (!entry) return null;
            const Component = entry.component;
            const blockBranding = block.styles.accentColor ? { ...branding, primaryColor: block.styles.accentColor } : branding;
            return (
              <div key={block.id} className={cn('relative', resolveBlockClasses(block))} style={resolveBlockInlineStyles(block, branding)}>
                <Component branding={blockBranding} content={block.content} styles={block.styles} />
              </div>
            );
          })}
        </div>

        <BrandingSidebar
          companyName={companyName}
          tagline={tagline}
          primaryColor={primaryColor}
          claiming={claiming}
          onCompanyNameChange={setCompanyName}
          onTaglineChange={setTagline}
          onPrimaryColorChange={setPrimaryColor}
          onUseTemplate={handleUseTemplate}
        />
      </div>
    </div>
  );
}
