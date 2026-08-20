'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { motionConfig } from '@/lib/content';

/** Subtle 3D tilt + cursor spotlight on hover. Degrades to a plain div when
    animations are disabled in theme.json or the OS asks for reduced motion. */
export default function TiltCard({
  children,
  className,
  intensity = 7,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), { stiffness: 220, damping: 22 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, color-mix(in oklab, var(--c-primary) 15%, transparent), transparent 72%)`;

  if (reduced || !motionConfig.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      {children}
    </motion.div>
  );
}
