import { useMemo } from 'react';
import { ArrowLeft, ArrowRight, FileText, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEMPLATE_PRESETS } from '@/lib/templates/presets';
import { ACCENT_COLORS, TEMPLATE_ICONS, CATEGORY_COLORS, CATEGORY_TAB_COLORS, CATEGORY_TABS } from './data';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

interface TemplateGridProps {
  selectedTemplate: string | null;
  activeCategory: string;
  onSelect: (id: string | null) => void;
  onCategoryChange: (cat: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function TemplateGrid({ selectedTemplate, activeCategory, onSelect, onCategoryChange, onBack, onNext }: TemplateGridProps) {
  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return TEMPLATE_PRESETS;
    return TEMPLATE_PRESETS.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="px-5 py-6">
      <div className="mb-6 flex flex-wrap gap-1 border-b border-border">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onCategoryChange(tab.key)}
            className={`border-b-2 px-3 pb-2.5 pt-1 text-xs font-medium transition ${
              activeCategory === tab.key
                ? CATEGORY_TAB_COLORS[tab.key] || 'border-blue-500 text-blue-400'
                : 'border-transparent text-dimmed-foreground hover:text-muted-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <motion.div variants={staggerItem}>
          <BlankCard selected={selectedTemplate === null} onSelect={() => onSelect(null)} />
        </motion.div>
        {filteredTemplates.map((t) => (
          <motion.div key={t.id} variants={staggerItem}>
            <TemplateCard template={t} selected={selectedTemplate === t.id} onSelect={() => onSelect(t.id)} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={onBack} className="tp-btn-outline">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button type="button" onClick={onNext} className="tp-btn-primary">
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function BlankCard({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative w-full overflow-hidden rounded-xl border text-left transition-all ${
        selected
          ? 'border-white/30 bg-white/5 ring-1 ring-white/10'
          : 'border-border bg-card/60 hover:border-muted-foreground/30 hover:bg-card'
      }`}
    >
      <div className="h-0.75" style={{ background: selected ? '#fff' : '#374151' }} />
      <div className="p-4">
        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
          selected ? 'bg-white/15 text-white' : 'bg-muted text-dimmed-foreground'
        }`}>
          <FileText className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-foreground">Blank Page</div>
        <div className="mt-1 text-xs leading-relaxed text-dimmed-foreground">
          Start with an empty canvas. Build your page from scratch.
        </div>
        <div className="mt-3">
          <span className="rounded-full border border-gray-500/20 bg-gray-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
            blank
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function TemplateCard({ template: t, selected, onSelect }: {
  template: (typeof TEMPLATE_PRESETS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const accent = ACCENT_COLORS[t.id] || '#3b82f6';
  const Icon = TEMPLATE_ICONS[t.id] ?? Layout;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative w-full overflow-hidden rounded-xl border text-left transition-all ${
        selected ? 'ring-1' : 'border-border bg-card/60 hover:border-muted-foreground/30 hover:bg-card'
      }`}
      style={selected ? { borderColor: accent, background: `${accent}08`, boxShadow: `0 0 0 1px ${accent}40` } : undefined}
    >
      <div className="h-0.75" style={{ background: accent }} />
      <div className="p-4">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: `${accent}${selected ? '25' : '15'}`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-foreground">{t.name}</div>
        <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-dimmed-foreground">{t.description}</div>
        <div className="mt-3">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
            CATEGORY_COLORS[t.category] || 'bg-gray-500/10 text-muted-foreground border-gray-500/20'
          }`}>
            {t.category}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
