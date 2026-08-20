'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { motionConfig } from '@/lib/content';

/** Counts up to `value` the first time it scrolls into view. */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1800,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced || !motionConfig.enabled ? value : 0);

  useEffect(() => {
    if (!inView || reduced || !motionConfig.enabled) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  const formatted = display.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
