'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Soft animated colour blobs used behind sections. */
export function Blobs({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const reduced = useReducedMotion();
  const color = tone === 'dark' ? 'bg-white/10' : 'bg-primary/18';
  const color2 = tone === 'dark' ? 'bg-white/6' : 'bg-accent/20';

  const anim = (dx: number, dy: number, s: number) =>
    reduced
      ? {}
      : {
          animate: { x: [0, dx, 0], y: [0, dy, 0], scale: [1, s, 1] },
          transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' as const },
        };

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <motion.div
        {...anim(40, -30, 1.12)}
        className={cn('absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full blur-[110px]', color)}
      />
      <motion.div
        {...anim(-50, 40, 1.08)}
        className={cn('absolute -right-28 top-1/3 h-[22rem] w-[22rem] rounded-full blur-[120px]', color2)}
      />
    </div>
  );
}

/** Faint dotted / grid backdrop. */
export function GridPattern({ className, variant = 'dots' }: { className?: string; variant?: 'dots' | 'grid' }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={
        variant === 'dots'
          ? {
              backgroundImage: 'radial-gradient(color-mix(in oklab, var(--c-primary) 22%, transparent) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 78%)',
            }
          : {
              backgroundImage:
                'linear-gradient(to right, color-mix(in oklab, var(--c-primary) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--c-primary) 12%, transparent) 1px, transparent 1px)',
              backgroundSize: '68px 68px',
              maskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)',
            }
      }
    />
  );
}

/** Thin gradient divider used between light sections. */
export function GradientRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('h-px w-full bg-linear-to-r from-transparent via-primary/25 to-transparent', className)}
    />
  );
}
