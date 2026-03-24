import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

/**
 * Static SSR version of FaqAccordion for publishing.
 * Renders FAQ as a simple details/summary list instead of Radix Accordion.
 * This avoids the 'use client' dependency on Radix primitives.
 */

interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'How quickly can I get my landing page live?',
    answer:
      'Most users go from signup to a live, published landing page in under 15 minutes. Pick a template, customize your branding, drop in your copy, and hit publish. No build steps, no deploy pipelines -- just a shareable URL ready for traffic.',
  },
  {
    question: 'Do I need a developer to set up payments?',
    answer:
      'Not at all. Paste a Stripe Payment Link into the dashboard and we handle the rest. No API keys, no webhooks, no server-side code. Payments go directly to your Stripe account so you stay in full control of your revenue.',
  },
  {
    question: 'Can I connect my own custom domain?',
    answer:
      'Yes. Add a CNAME record pointing to our servers, enter the domain in your site settings, and we provision an SSL certificate automatically. The whole process takes about 5 minutes plus DNS propagation time.',
  },
  {
    question: 'What happens if I outgrow the free plan?',
    answer:
      'The free plan is generous enough for validating ideas and collecting your first signups. When you need more pages, higher traffic limits, or advanced features like A/B testing and custom domains, you can upgrade instantly from the dashboard. No data migration required -- everything carries over.',
  },
  {
    question: 'Is my data portable if I decide to leave?',
    answer:
      'Absolutely. Your landing pages are built with standard HTML and CSS -- no proprietary lock-in. You can export your page source at any time and host it anywhere. Waitlist data and analytics are also exportable as CSV from the dashboard.',
  },
];

export function FaqAccordionStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Frequently asked questions';
  const subtitle = content.subtitle as string ?? 'Everything you need to know before getting started';
  const faqs = content.faqs as FaqItem[] ?? DEFAULT_FAQS;
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="faq-accordion"
      className="bg-[var(--lp-site-bg)] py-20 sm:py-28"
    >
      <div className={cn('mx-auto px-6', tokens.maxWidth)}>
        <div className="mb-14 text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className="space-y-0 divide-y divide-[var(--lp-site-border)]">
          {faqs.map((faq, index) => (
            <details key={index} className="group py-4">
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-[var(--lp-site-heading)] transition-colors hover:text-[var(--lp-site-body)] [&::-webkit-details-marker]:hidden"
                style={{ ['--hover-color' as string]: primaryColor }}
              >
                {faq.question}
                <svg
                  className="ml-4 h-4 w-4 shrink-0 text-[var(--lp-site-muted)] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lp-site-body)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
