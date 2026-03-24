import { ArrowLeft, Rocket, Loader2, FileText, Globe, Pencil, Layout, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEMPLATE_PRESETS } from '@/lib/templates/presets';
import { ACCENT_COLORS, TEMPLATE_ICONS, CATEGORY_COLORS } from './data';

interface ConfirmStepProps {
  selectedTemplate: string | null;
  name: string;
  slug: string;
  error: string | null;
  loading: boolean;
  onBack: () => void;
  onSubmit: () => void;
  onEditName: () => void;
}

export function ConfirmStep({ selectedTemplate, name, slug, error, loading, onBack, onSubmit, onEditName }: ConfirmStepProps) {
  const def = selectedTemplate ? TEMPLATE_PRESETS.find((t) => t.id === selectedTemplate) : null;

  if (def) {
    return <TemplateConfirm def={def} name={name} slug={slug} error={error} loading={loading} onBack={onBack} onSubmit={onSubmit} />;
  }

  return (
    <div className="px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-xl border border-border bg-card/60 p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Ready to create</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your site will start as a blank canvas.</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between tp-summary-row">
              <div>
                <div className="text-xs text-dimmed-foreground">Site name</div>
                <div className="text-sm font-medium text-foreground">{name}</div>
              </div>
              <button type="button" onClick={onEditName} className="text-dimmed-foreground transition hover:text-foreground">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="tp-summary-row">
              <div className="text-xs text-dimmed-foreground">URL</div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Globe className="h-3.5 w-3.5 text-dimmed-foreground" />
                padlift.site/s/{slug}
              </div>
            </div>
            <div className="tp-summary-row">
              <div className="text-xs text-dimmed-foreground">Template</div>
              <div className="text-sm font-medium text-foreground">Blank Page</div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="tp-error"
            >
              {error}
            </motion.div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={onBack} className="tp-btn-outline">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" disabled={loading} onClick={onSubmit} className="tp-btn-primary flex-1 justify-center">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Rocket className="h-4 w-4" />
              )}
              {loading ? 'Creating...' : 'Create Site'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateConfirm({ def, name, slug, error, loading, onBack, onSubmit }: {
  def: (typeof TEMPLATE_PRESETS)[number];
  name: string;
  slug: string;
  error: string | null;
  loading: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const accent = ACCENT_COLORS[def.id] || '#3b82f6';
  const Icon = TEMPLATE_ICONS[def.id] ?? Layout;

  return (
    <div className="px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-xl border border-border bg-card/60 p-6">
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${accent}20`, color: accent }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Ready to create</h3>
          <p className="mt-1 text-sm text-muted-foreground">Review your site details before creating.</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between tp-summary-row">
              <div>
                <div className="text-xs text-dimmed-foreground">Site name</div>
                <div className="text-sm font-medium text-foreground">{name}</div>
              </div>
              <button type="button" onClick={onBack} className="text-dimmed-foreground transition hover:text-foreground">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="tp-summary-row">
              <div className="text-xs text-dimmed-foreground">URL</div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Globe className="h-3.5 w-3.5 text-dimmed-foreground" />
                padlift.site/s/{slug}
              </div>
            </div>
            <div className="tp-summary-row">
              <div className="mb-2 text-xs text-dimmed-foreground">Template</div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${accent}20`, color: accent }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{def.name}</div>
                  <span className={`mt-0.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    CATEGORY_COLORS[def.category] || 'bg-gray-500/10 text-muted-foreground border-gray-500/20'
                  }`}>
                    {def.category}
                  </span>
                </div>
              </div>
              <button type="button" onClick={onBack} className="mt-2 text-xs text-blue-400 transition hover:text-blue-300">
                Change template
              </button>
            </div>
            <div className="tp-summary-row">
              <div className="text-xs text-dimmed-foreground">Blocks included</div>
              <div className="text-sm font-medium text-foreground">{def.blocks.length} sections</div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="tp-error"
            >
              {error}
            </motion.div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={onBack} className="tp-btn-outline">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" disabled={loading} onClick={onSubmit} className="tp-btn-primary flex-1 justify-center">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Rocket className="h-4 w-4" />
              )}
              {loading ? 'Creating...' : 'Create Site'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
