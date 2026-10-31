'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useAnimationControls } from 'framer-motion';

/** Thin bar under the scroll progress that starts the instant an internal link is
    clicked and completes when the new route has rendered. */
export default function RouteProgress() {
  const pathname = usePathname();
  const controls = useAnimationControls();
  const [visible, setVisible] = useState(false);
  const current = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // hash jumps on the same page
      clearTimeout(timer.current);
      setVisible(true);
      controls.set({ scaleX: 0, opacity: 1 });
      controls.start({ scaleX: 0.85, transition: { duration: 6, ease: [0.1, 0.8, 0.2, 1] } });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [controls]);

  useEffect(() => {
    if (current.current === pathname) return;
    current.current = pathname;
    controls.start({ scaleX: 1, transition: { duration: 0.25 } }).then(() => {
      controls.start({ opacity: 0, transition: { duration: 0.3 } });
      timer.current = setTimeout(() => setVisible(false), 320);
    });
  }, [pathname, controls]);

  if (!visible) return null;
  return (
    <motion.div
      aria-hidden
      animate={controls}
      initial={{ scaleX: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-[71] h-[3px] origin-left bg-linear-to-r from-accent via-primary to-primary-dark shadow-[0_0_12px_var(--c-primary)]"
    />
  );
}
