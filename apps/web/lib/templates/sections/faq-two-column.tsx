'use client';

import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FaqTwoColumn({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Frequently asked questions';
  const subtitle = (content.subtitle as string) ?? '';
  const faqs = (content.faqs as Array<{ question: string; answer: string }>) ?? [
    { question: 'How quickly can I launch?', answer: 'Most users go from signup to a live page in under 15 minutes.' },
    { question: 'Do I need a developer?', answer: 'Not at all. Our drag-and-drop editor handles everything.' },
    { question: 'Can I use my own domain?', answer: 'Yes. Add a CNAME record and we handle SSL automatically.' },
    { question: 'What about payments?', answer: 'Paste a Stripe link and you can accept payments immediately.' },
    { question: 'Is there a free plan?', answer: 'Yes! Our free plan is generous enough to validate any idea.' },
    { question: 'Can I cancel anytime?', answer: 'Absolutely. No contracts, no questions asked.' },
  ];

  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  const renderFaq = (faq: { question: string; answer: string }, idx: number) => (
    <details key={idx} className="group border-b border-[var(--lp-site-border)] py-4">
      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-[var(--lp-site-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
        {faq.question}
        <svg className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 text-[var(--lp-site-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-[var(--lp-site-body)]">{faq.answer}</p>
    </details>
  );

  return (
    <section
      data-lp-section="faq-two-column"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <div>{col1.map((faq, i) => renderFaq(faq, i))}</div>
          <div>{col2.map((faq, i) => renderFaq(faq, i + half))}</div>
        </div>
      </div>
    </section>
  );
}
