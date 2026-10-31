'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** A soft light that follows the pointer. Desktop / fine-pointer only. */
export default function CursorGlow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setActive(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX - 220);
      y.set(e.clientY - 220);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[440px] rounded-full opacity-55 will-change-transform lg:block"
    >
      <div className="size-full rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--c-primary)_16%,transparent),transparent_68%)]" />
    </motion.div>
  );
}
