import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Project {
  title: string;
  description: string;
  tag: string;
  imageUrl?: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Brand Redesign',
    description:
      'Complete visual identity overhaul for a fintech startup.',
    tag: 'Branding',
  },
  {
    title: 'E-Commerce Platform',
    description:
      'Custom shopping experience with 40% conversion increase.',
    tag: 'Development',
  },
  {
    title: 'Mobile App Launch',
    description:
      'iOS and Android app with 100K+ downloads in first month.',
    tag: 'Mobile',
  },
  {
    title: 'Marketing Campaign',
    description:
      'Multi-channel campaign that drove $2M in pipeline.',
    tag: 'Marketing',
  },
];

const CARD_GRADIENTS = [
  (c: string) => `linear-gradient(135deg, ${c}30 0%, var(--lp-site-bg) 100%)`,
  (c: string) => `linear-gradient(135deg, var(--lp-site-bg) 0%, ${c}20 100%)`,
  (c: string) => `linear-gradient(225deg, ${c}25 0%, var(--lp-site-bg) 100%)`,
  (c: string) => `linear-gradient(315deg, var(--lp-site-bg) 0%, ${c}15 100%)`,
];

export function ProjectShowcase({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Our Work';
  const subtitle = content.subtitle as string ?? 'Selected projects that showcase our expertise.';
  const projects = content.projects as Project[] ?? DEFAULT_PROJECTS;
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="project-showcase"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Project grid */}
        <div className={cn('grid', tokens.columns, tokens.gap)}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={cn(
                'group overflow-hidden border border-[var(--lp-site-border)] bg-[var(--lp-site-card)]',
                'transition-all duration-200 hover:-translate-y-1 hover:border-[var(--lp-site-border)] hover:shadow-lg',
                tokens.borderRadius
              )}
            >
              {/* Project image or gradient placeholder */}
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-48 w-full rounded-t-xl object-cover"
                />
              ) : (
                <div
                  className="h-48 rounded-t-xl"
                  style={{
                    background: CARD_GRADIENTS[i % CARD_GRADIENTS.length](primaryColor),
                  }}
                />
              )}

              {/* Content */}
              <div className="p-5">
                {/* Tag badge */}
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                  }}
                >
                  {project.tag}
                </span>

                <h3 className="mb-2 text-lg font-semibold text-[var(--lp-site-heading)]">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--lp-site-body)]">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
