import { ArrowRight } from 'lucide-react';

interface DetailsStepProps {
  name: string;
  slug: string;
  canProceed: boolean;
  onNameChange: (v: string) => void;
  onSlugChange: (v: string) => void;
  onSlugTouch: () => void;
  onNext: () => void;
}

export function DetailsStep({ name, slug, canProceed, onNameChange, onSlugChange, onSlugTouch, onNext }: DetailsStepProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed) { e.preventDefault(); onNext(); }
  };

  return (
    <div className="px-5 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">Site name</label>
          <input
            id="name"
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="tp-input"
            placeholder="My Awesome SaaS"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-foreground">URL slug</label>
          <div className="flex items-center">
            <span className="rounded-l-lg border border-r-0 border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground">
              padlift.site/s/
            </span>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => {
                onSlugTouch();
                onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
              }}
              onKeyDown={handleKeyDown}
              className="tp-input rounded-l-none"
              placeholder="my-awesome-saas"
            />
          </div>
          <p className="mt-1 text-xs text-dimmed-foreground">Lowercase letters, numbers, and hyphens only.</p>
        </div>

        <button type="button" disabled={!canProceed} onClick={onNext} className="tp-btn-primary">
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
