'use client';

import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FaqWithCta({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Frequently asked questions';
  const subtitle = (content.subtitle as string) ?? '';
  const faqs = (content.faqs as Array<{ question: string; answer: string }>) ?? [
    { question: 'How quickly can I launch?', answer: 'Most users go from signup to a live page in under 15 minutes.' },
    { question: 'Do I need a developer?', answer: 'Not at all. Our drag-and-drop editor handles everything.' },
    { question: 'Can I use my own domain?', answer: 'Yes. Add a CNAME record and we handle SSL automatically.' },
  ];
  const ctaTitle = (content.ctaTitle as string) ?? 'Still have questions?';
  const ctaBody = (content.ctaBody as string) ?? "Can't find the answer you're looking for? Our team is here to help.";
  const ctaButton = (content.ctaButton as string) ?? 'Contact Support';
  const ctaUrl = (content.ctaUrl as string) ?? '#';

  return (
    <section
      data-lp-section="faq-with-cta"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className="mt-12 space-y-0 divide-y divide-[var(--lp-site-border)]">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-[var(--lp-site-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <svg className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180 text-[var(--lp-site-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--lp-site-body)]">{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* CTA card */}
        <div
          className={cn('mt-12 p-8 text-center text-white', tokens.borderRadius)}
          style={{
            background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
          }}
        >
          <h3 className="text-xl font-bold">{ctaTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm opacity-90">{ctaBody}</p>
          <a
            href={ctaUrl}
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ color: branding.primaryColor }}
          >
            {ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
