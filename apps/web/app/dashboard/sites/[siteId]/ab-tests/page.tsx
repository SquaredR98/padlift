import { FlaskConical } from 'lucide-react';
import { PageHeader } from '../../../components/ui/page-header';
import { EmptyState } from '../../../components/ui/empty-state';

export default function AbTestsPage() {
  return (
    <div>
      <PageHeader
        title="A/B Tests"
        description="Test different headlines, hero sections, and pricing to find what drives revenue."
        actions={
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed"
            title="Coming soon"
          >
            New Test
          </button>
        }
      />
      <div className="space-y-6 px-5 pb-8 pt-5">
        <EmptyState
          icon={FlaskConical}
          title="No A/B tests yet"
          description="Test different headlines, hero sections, and pricing pages to find what drives the most signups and revenue. A/B testing is coming in a future update."
        />

        {/* Feature preview cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Full Page Tests',
              description: 'Compare entirely different page designs against each other.',
            },
            {
              title: 'Section Tests',
              description: 'Swap individual sections like hero or pricing while keeping the rest.',
            },
            {
              title: 'Revenue Attribution',
              description: 'Track which variant generates the most signups and purchases.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-dashed border-border bg-card/50 p-5"
            >
              <p className="text-sm font-medium text-muted-foreground">{feature.title}</p>
              <p className="mt-1 text-xs text-dimmed-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
