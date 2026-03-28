'use client';

import { CreditCard, Clock } from 'lucide-react';
import { SectionCard } from './shared';

export function PaymentLinksSection() {
  return (
    <SectionCard title="Payment Links" icon={CreditCard}>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
        <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">Coming Soon</p>
          <p className="text-xs text-dimmed-foreground">
            Payment link management is coming in a future update. You&apos;ll be able to add Gumroad payment links directly to your pages.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
