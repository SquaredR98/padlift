import { notFound } from 'next/navigation';
import { TEMPLATE_PRESETS, getPreset, buildPageDataFromPreset } from '@/lib/templates/presets';
import { BLOCK_REGISTRY } from '@/lib/templates/block-registry';
import { resolveBlockClasses, resolveBlockInlineStyles } from '@/lib/templates/block-types';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ company?: string; tagline?: string; color?: string }>;
}

export function generateStaticParams() {
  return TEMPLATE_PRESETS.map((t) => ({ templateId: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateId } = await params;
  const preset = getPreset(templateId);
  if (!preset) return {};
  return {
    title: preset.seo.title,
    description: preset.seo.description,
  };
}

export default async function TemplatePreviewPage({ params, searchParams }: PageProps) {
  const { templateId } = await params;
  const sp = await searchParams;

  const pageData = buildPageDataFromPreset(templateId);
  if (!pageData) notFound();

  // Apply search param overrides
  if (sp.company) pageData.branding.companyName = sp.company;
  if (sp.tagline) pageData.branding.tagline = sp.tagline;
  if (sp.color) pageData.branding.primaryColor = sp.color;

  return (
    <div className="min-h-screen bg-[#030712]">
      {pageData.blocks.map((block) => {
        const entry = BLOCK_REGISTRY[block.blockType];
        if (!entry) return null;

        const Component = entry.component;
        const blockBranding = block.styles.accentColor
          ? { ...pageData.branding, primaryColor: block.styles.accentColor }
          : pageData.branding;

        return (
          <div
            key={block.id}
            className={cn('relative', resolveBlockClasses(block))}
            style={resolveBlockInlineStyles(block, pageData.branding)}
            data-lp-section={block.blockType}
          >
            <Component
              branding={blockBranding}
              content={block.content}
              styles={block.styles}
            />
          </div>
        );
      })}
    </div>
  );
}
