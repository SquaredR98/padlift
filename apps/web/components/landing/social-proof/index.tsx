'use client';

import { Star, Blocks, Palette, Clock } from 'lucide-react';
import { FadeIn, HoverCard, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

const STATS = [
  { icon: Blocks, value: '80+', label: 'Ready-Made Blocks' },
  { icon: Palette, value: '20+', label: 'Starter Templates' },
  { icon: Clock, value: '< 5 min', label: 'To Go Live' },
];

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  rating: number;
}

interface Props {
  testimonials?: Testimonial[];
}

export function LandingSocialProof({ testimonials = [] }: Props) {
  return (
    <section className="social-proof-section">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="social-proof-stats"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
              <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {testimonials.length > 0 && (
          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {testimonials.slice(0, 3).map((t) => (
              <motion.div key={t.id} variants={staggerItem}>
                <HoverCard className="landing-card social-proof-card">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    {(t.role || t.company) && (
                      <p className="text-xs text-muted-foreground">
                        {t.role}{t.role && t.company ? ' at ' : ''}{t.company}
                      </p>
                    )}
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
