import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { STEPS } from './data';

export function StepIndicator({ step, onStepClick }: { step: 1 | 2 | 3; onStepClick: (n: 1 | 2 | 3) => void }) {
  return (
    <div className="border-b border-border px-5 pb-4 pt-2">
      <div className="mx-auto flex max-w-lg items-center">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => { if (s.num < step) onStepClick(s.num as 1 | 2 | 3); }}
              disabled={s.num > step}
              className="relative flex items-center gap-2"
            >
              <div
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                  s.num < step
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : s.num === step
                      ? 'text-blue-400'
                      : 'bg-muted text-dimmed-foreground'
                }`}
              >
                {s.num === step && (
                  <motion.div
                    layoutId="step-active-bg"
                    className="absolute inset-0 rounded-full bg-blue-500/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {s.num < step ? <Check className="h-3.5 w-3.5" /> : s.num}
                </span>
              </div>
              <span
                className={`text-xs font-medium ${
                  s.num === step ? 'text-foreground' : s.num < step ? 'text-muted-foreground' : 'text-dimmed-foreground'
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`mx-3 h-px flex-1 transition-colors duration-300 ${s.num < step ? 'bg-emerald-500/30' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
