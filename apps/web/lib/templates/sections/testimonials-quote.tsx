import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialsQuote({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const quote = content.quote as string ?? "This platform completely transformed how we ship products. What used to take our team weeks now takes days. It's not just a tool \u2014 it's become the backbone of our entire workflow.";
  const name = content.name as string ?? 'Alex Rivera';
  const role = content.role as string ?? 'Co-founder & CEO, Luminary Labs';
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="testimonials-quote"
      className="relative bg-[var(--lp-site-bg)] py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 60%)`,
        }}
      />

      <div className={cn("relative mx-auto px-4 sm:px-6 lg:px-8 text-center", tokens.maxWidth)}>
        {/* Top decorative line */}
        <div className="mx-auto mb-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[var(--lp-site-card-hover)]" />
          <div
            className="h-px w-20"
            style={{ backgroundColor: `${primaryColor}66` }}
          />
          <div className="h-px w-12 bg-[var(--lp-site-card-hover)]" />
        </div>

        {/* Large quote mark */}
        <span
          className="block text-6xl sm:text-7xl font-serif leading-none select-none"
          style={{ color: primaryColor }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <blockquote className="mt-4">
          <p
            data-lp-brand="quote"
            className="text-xl sm:text-2xl font-light italic leading-relaxed text-[var(--lp-site-body)]"
          >
            {quote}
          </p>
        </blockquote>

        {/* Author */}
        <div className="mt-10 flex flex-col items-center gap-3">
          {/* Avatar circle with initials */}
          <div
            className="flex size-12 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: `${primaryColor}33` }}
          >
            {getInitials(name)}
          </div>
          <div>
            <p
              data-lp-brand="author-name"
              className="text-base font-semibold text-[var(--lp-site-heading)]"
            >
              {name}
            </p>
            <p
              data-lp-brand="author-role"
              className="mt-0.5 text-sm text-[var(--lp-site-muted)]"
            >
              {role}
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[var(--lp-site-card-hover)]" />
          <div
            className="h-px w-20"
            style={{ backgroundColor: `${primaryColor}66` }}
          />
          <div className="h-px w-12 bg-[var(--lp-site-card-hover)]" />
        </div>
      </div>
    </section>
  );
}
