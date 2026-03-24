'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Adds scroll-reveal animation via IntersectionObserver.
 * When the element becomes visible, sets data-revealed attribute.
 * CSS handles the actual animation transition.
 */
export function useScrollReveal<T extends HTMLElement>(
  options?: { threshold?: number; delay?: number },
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply delay as CSS transition-delay
    if (options?.delay) {
      el.style.transitionDelay = `${options.delay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.delay]);

  return ref;
}
