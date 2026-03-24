import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'We migrated our entire workflow in a weekend. The onboarding was seamless, and our team productivity jumped 40% in the first month alone.',
    name: 'Sarah Chen',
    role: 'VP of Engineering, Mapleway',
  },
  {
    quote:
      "I've tried a dozen tools in this space and nothing comes close. The attention to detail and developer experience is on another level.",
    name: 'Marcus Johnson',
    role: 'CTO, Stackbloom',
  },
  {
    quote:
      'Their support team responded in minutes, not days. It feels like they genuinely care about helping us succeed, not just closing tickets.',
    name: 'Priya Patel',
    role: 'Head of Product, Nuvio',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialsCards({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Loved by Teams Everywhere';
  const subtitle = content.subtitle as string ?? 'See what people are saying about their experience.';
  const testimonials = content.testimonials as Testimonial[] ?? defaultTestimonials;
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="testimonials-cards"
      className="relative bg-[var(--lp-site-bg)] py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${primaryColor}, transparent)`,
        }}
      />

      <div className={cn("relative mx-auto px-4 sm:px-6 lg:px-8", tokens.maxWidth)}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2
            data-lp-brand="heading"
            data-lp-editable="title"
            className={cn("font-bold text-[var(--lp-site-heading)]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}
          >
            {title}
          </h2>
          <p
            data-lp-brand="subheading"
            data-lp-editable="subtitle"
            className={cn("mt-4 text-[var(--lp-site-body)] leading-relaxed", tokens.bodySize)}
          >
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={cn("grid", tokens.columns, tokens.gap)}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn("group relative bg-[var(--lp-site-card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg", tokens.borderRadius, tokens.cardStyle)}
              style={{
                ['--hover-shadow' as string]: `${primaryColor}15`,
              }}
            >
              {/* Quote mark */}
              <span
                className="block text-4xl font-serif leading-none select-none"
                style={{ color: `${primaryColor}4D` }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <blockquote className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--lp-site-body)] italic">
                {testimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-10 rounded-full object-cover ring-2 ring-[var(--lp-site-border)]"
                  />
                ) : (
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: `${primaryColor}33` }}
                  >
                    {getInitials(testimonial.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-[var(--lp-site-heading)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--lp-site-muted)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
