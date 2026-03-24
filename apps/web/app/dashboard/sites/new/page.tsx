'use client';

import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TEMPLATE_PRESETS } from '@/lib/templates/presets';
import type { TemplateBranding } from '@/lib/templates/block-types';
import { PageHeader } from '../../components/ui/page-header';
import { ACCENT_COLORS } from '@/components/dashboard/template-picker/data';
import { StepIndicator } from '@/components/dashboard/template-picker/step-indicator';
import { DetailsStep } from '@/components/dashboard/template-picker/details-step';
import { TemplateGrid } from '@/components/dashboard/template-picker/template-grid';
import { ConfirmStep } from '@/components/dashboard/template-picker/confirm-step';
import '@/components/dashboard/template-picker/styles.css';

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function NewSitePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const dirRef = useRef(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedDef = selectedTemplate ? TEMPLATE_PRESETS.find((t) => t.id === selectedTemplate) : null;
  const primaryColor = selectedTemplate ? ACCENT_COLORS[selectedTemplate] || '#3b82f6' : '#3b82f6';

  const branding: TemplateBranding = useMemo(
    () => ({
      companyName: name || selectedDef?.branding.companyName || 'My Site',
      tagline: selectedDef?.branding.tagline || '',
      primaryColor,
      secondaryColor: primaryColor,
      logoUrl: null,
      headingFont: 'Inter',
      bodyFont: 'Inter',
      defaultTheme: 'dark',
    }),
    [name, selectedDef, primaryColor],
  );

  function goToStep(next: 1 | 2 | 3) {
    dirRef.current = next > step ? 1 : -1;
    setStep(next);
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      if (selectedTemplate) {
        const res = await fetch(`/api/templates/${selectedTemplate}/claim`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug, branding }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Failed to create site'); setLoading(false); return; }
        router.push(`/dashboard/sites/${data.siteId}/edit`);
      } else {
        const res = await fetch('/api/sites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Failed to create site'); setLoading(false); return; }
        router.push(`/dashboard/sites/${data.id}/edit`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  const canProceedStep1 = name.trim().length > 0 && slug.trim().length > 0;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Create a new site"
        description={
          step === 1 ? 'Start by giving your site a name.'
            : step === 2 ? 'Choose a template or start blank.'
              : 'Review and create your site.'
        }
        actions={
          <Link href="/dashboard/sites" className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        }
      />

      <StepIndicator step={step} onStepClick={goToStep} />

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={dirRef.current}>
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={dirRef.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <DetailsStep
                name={name}
                slug={slug}
                canProceed={canProceedStep1}
                onNameChange={handleNameChange}
                onSlugChange={setSlug}
                onSlugTouch={() => setSlugTouched(true)}
                onNext={() => goToStep(2)}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={dirRef.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TemplateGrid
                selectedTemplate={selectedTemplate}
                activeCategory={activeCategory}
                onSelect={setSelectedTemplate}
                onCategoryChange={setActiveCategory}
                onBack={() => goToStep(1)}
                onNext={() => goToStep(3)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              custom={dirRef.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ConfirmStep
                selectedTemplate={selectedTemplate}
                name={name}
                slug={slug}
                error={error}
                loading={loading}
                onBack={() => goToStep(2)}
                onSubmit={handleSubmit}
                onEditName={() => goToStep(1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
