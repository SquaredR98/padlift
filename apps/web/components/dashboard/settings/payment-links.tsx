'use client';

import { useState } from 'react';
import { Plus, X, CreditCard } from 'lucide-react';
import { SectionCard, InputField } from './shared';

interface PaymentLink {
  id: string;
  planName: string;
  price: number;
  billingCycle: string;
  stripeUrl: string;
}

interface PaymentLinksSectionProps {
  paymentLinks: PaymentLink[];
  onAddLink: (link: { planName: string; price: number; billingCycle: string; stripeUrl: string }) => Promise<void>;
  onDeleteLink: (id: string) => void;
}

export function PaymentLinksSection({ paymentLinks, onAddLink, onDeleteLink }: PaymentLinksSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [linkPlan, setLinkPlan] = useState('');
  const [linkPrice, setLinkPrice] = useState('');
  const [linkCycle, setLinkCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [linkUrl, setLinkUrl] = useState('');

  const handleAdd = async () => {
    if (!linkPlan || !linkPrice || !linkUrl) return;
    await onAddLink({ planName: linkPlan, price: parseFloat(linkPrice), billingCycle: linkCycle, stripeUrl: linkUrl });
    setLinkPlan('');
    setLinkPrice('');
    setLinkUrl('');
    setShowForm(false);
  };

  return (
    <SectionCard title="Payment Links" icon={CreditCard}>
      {paymentLinks.length === 0 && !showForm ? (
        <p className="text-sm text-dimmed-foreground">
          No payment links yet. Add a payment link to monetize your site.
        </p>
      ) : (
        <div className="space-y-3">
          {paymentLinks.map((link) => (
            <div key={link.id} className="settings-payment-link-row">
              <div>
                <p className="text-sm font-medium text-foreground">{link.planName}</p>
                <p className="text-xs text-dimmed-foreground">
                  ${Number(link.price).toFixed(2)} / {link.billingCycle.toLowerCase()}
                </p>
              </div>
              <button
                onClick={() => onDeleteLink(link.id)}
                className="rounded-md p-1.5 text-dimmed-foreground transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <div className="mt-4 space-y-3 rounded-lg border border-border bg-background p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <InputField label="Plan Name" value={linkPlan} onChange={setLinkPlan} placeholder="Pro" />
            <InputField label="Price" value={linkPrice} onChange={setLinkPrice} placeholder="29.00" mono />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Billing Cycle</label>
            <div className="flex gap-2">
              {(['MONTHLY', 'YEARLY'] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setLinkCycle(cycle)}
                  className={`settings-cycle-btn ${linkCycle === cycle ? 'settings-cycle-btn-active' : 'settings-cycle-btn-inactive'}`}
                >
                  {cycle.charAt(0) + cycle.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <InputField label="Payment Link URL" value={linkUrl} onChange={setLinkUrl} placeholder="https://..." mono />
          <div className="flex items-center gap-2">
            <button onClick={handleAdd} disabled={!linkPlan || !linkPrice || !linkUrl} className="settings-btn-primary-sm">
              Add Link
            </button>
            <button onClick={() => setShowForm(false)} className="settings-btn-ghost-sm">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-blue-400 transition hover:text-blue-300"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Payment Link
        </button>
      )}
    </SectionCard>
  );
}
