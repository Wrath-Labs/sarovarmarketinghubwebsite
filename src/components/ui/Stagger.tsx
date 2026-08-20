'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { motionConfig } from '@/lib/content';

/** Wrap a grid in <Stagger> and each direct child in <StaggerItem>
    to get a cascading entrance. */
export function Stagger({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduced = useReducedMotion();
  if (!motionConfig.enabled || reduced) return <div className={className} id={id}>{children}</div>;

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -60px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: motionConfig.stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  if (!motionConfig.enabled || reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance ?? motionConfig.distance, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: motionConfig.duration, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
