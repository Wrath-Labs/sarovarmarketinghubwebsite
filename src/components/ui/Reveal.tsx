'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';
import { motionConfig } from '@/lib/content';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  scale?: boolean;
  once?: boolean;
  as?: ElementType;
  id?: string;
};

const offsets = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up': return { y: d, x: 0 };
    case 'down': return { y: -d, x: 0 };
    case 'left': return { x: d, y: 0 };
    case 'right': return { x: -d, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

/** Fades + slides its children into view on scroll. The feel is controlled
    from theme.json → effects (revealDuration / revealDistance). */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration,
  direction = 'up',
  distance,
  scale = false,
  once = true,
  as = 'div',
  id,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!motionConfig.enabled || reduced) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  const move = offsets(direction, distance ?? motionConfig.distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...move, scale: scale ? 0.96 : 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: duration ?? motionConfig.duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
