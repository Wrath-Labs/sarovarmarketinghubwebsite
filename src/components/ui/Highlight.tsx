'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionConfig } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Gradient-text + animated underline for the highlighted words in a heading.
    The underline is painted per line box, so it stays correct however the
    JSON copy wraps at any screen size. */
export default function Highlight({
  children,
  tone = 'light',
  delay = 0.5,
  trigger = 'inView',
  thickness = '0.13em',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  delay?: number;
  trigger?: 'inView' | 'mount';
  thickness?: string;
}) {
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;

  const rule =
    tone === 'dark'
      ? 'linear-gradient(to right, rgba(255,255,255,.6), rgba(255,255,255,.22))'
      : 'linear-gradient(to right, color-mix(in oklab, var(--c-primary) 55%, transparent), color-mix(in oklab, var(--c-accent) 60%, transparent))';

  const full = `100% ${thickness}`;
  const empty = `0% ${thickness}`;

  const motionProps = animate
    ? trigger === 'inView'
      ? {
          initial: { backgroundSize: empty },
          whileInView: { backgroundSize: full },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.95, delay, ease: 'easeOut' as const },
        }
      : {
          initial: { backgroundSize: empty },
          animate: { backgroundSize: full },
          transition: { duration: 0.95, delay, ease: 'easeOut' as const },
        }
    : {};

  return (
    <motion.span
      {...motionProps}
      className="box-decoration-clone bg-no-repeat"
      style={{
        backgroundImage: rule,
        backgroundPosition: '0 100%',
        ...(animate ? {} : { backgroundSize: full }),
      }}
    >
      <motion.span
        className={cn(tone === 'dark' ? 'text-white' : 'text-gradient')}
        animate={animate ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
