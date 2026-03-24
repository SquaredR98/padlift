'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FadeIn } from '../motion';
import './styles.css';

const FAQS = [
  { q: 'Do I need to know how to code?', a: 'Not at all. Padlift is a fully visual, no-code builder. Pick a template, customize it with the drag-and-drop editor, and publish in minutes.' },
  { q: 'Can I use my own domain?', a: 'Yes. Connect any custom domain on the Pro plan or above. We handle SSL automatically — just point your DNS and you\'re live.' },
  { q: 'How does the waitlist work?', a: 'Visitors enter their email on your page. Each signup gets a unique referral link and position. Top referrers move up the queue. You can export to Google Sheets or push to any service via webhooks.' },
  { q: 'What about payments?', a: 'We integrate natively with Gumroad for subscriptions and one-time payments. Add payment links to your page in seconds — no Stripe setup, no code, no third-party plugins.' },
  { q: 'Is there a free plan?', a: 'Yes! The free plan includes 1 site, 100 waitlist entries, and access to all templates. No credit card required to get started.' },
  { q: 'Can I switch templates later?', a: 'Yes. Your content is preserved when you switch templates. You can also start from scratch and build your own layout with the block-based editor.' },
];

export function LandingFAQ() {
  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="landing-faq-item">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
