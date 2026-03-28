'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FadeIn } from '../motion';
import './styles.css';

const FAQS = [
  {
    q: 'Do I need to know how to code?',
    a: 'Not at all. Padlift is a fully visual, no-code builder. Pick a template, customize with the drag-and-drop editor, and publish in minutes. If you can write an email, you can build a launch page.',
  },
  {
    q: 'How fast can I actually launch?',
    a: 'Most users have a live page within 5 minutes. Pick a template, change your copy and colors, hit publish. You get a shareable link instantly. Connect a custom domain whenever you\'re ready.',
  },
  {
    q: 'What\'s included in the free plan?',
    a: 'You get 1 site, up to 100 waitlist signups, access to all 20+ templates and 80+ blocks, dark/light themes, and a shareable link. No credit card required, no time limit.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Yes. On the Pro plan or above, connect any custom domain. We handle SSL automatically — just point a CNAME record and you\'re live in minutes.',
  },
  {
    q: 'How does the waitlist work?',
    a: 'Visitors enter their email on your page. Each signup gets a unique referral link and a queue position. Top referrers climb the queue automatically. You can export entries to Google Sheets or push them to any service via webhooks.',
  },
  {
    q: 'What about payments?',
    a: 'We integrate natively with Gumroad. Add subscription or one-time payment links to your page in seconds — no Stripe setup, no code, no third-party plugins.',
  },
  {
    q: 'Is my data safe? What about privacy?',
    a: 'Absolutely. Our analytics are cookie-free and privacy-first — no fingerprinting, no third-party trackers. Your data is stored securely on encrypted databases. We never sell your data to anyone. See our Privacy Policy for full details.',
  },
  {
    q: 'Can I switch templates later?',
    a: 'Yes. Your content is preserved when you switch templates. You can also start from scratch with the block-based editor and build a completely custom layout.',
  },
  {
    q: 'What happens when I hit the free plan limit?',
    a: 'Your existing signups are safe and your page stays live. You just can\'t collect new entries until you upgrade or export and clear your list. Upgrading is instant — no data loss, no downtime.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. There are no contracts and no cancellation fees. Cancel from your Gumroad dashboard anytime. Your page stays live until the end of your billing period.',
  },
];

export function LandingFAQ() {
  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn className="mb-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-500 dark:text-blue-400">FAQ</p>
        </FadeIn>
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before you launch.
          </p>
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
