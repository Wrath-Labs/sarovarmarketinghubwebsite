'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-primary via-accent to-primary-dark"
    />
  );
}
