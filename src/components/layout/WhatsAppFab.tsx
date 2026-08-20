'use client';

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { site } from '@/lib/content';

/** Floating WhatsApp button. Toggle it in site.json → floatingWhatsApp. */
export default function WhatsAppFab() {
  const { floatingWhatsApp, contactInfo } = site;
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 420));

  if (!floatingWhatsApp?.enabled) return null;

  const number = (contactInfo.whatsapp || '').replace(/[^\d]/g, '');
  const href = `https://wa.me/${number}?text=${encodeURIComponent(floatingWhatsApp.message)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          id="whatsapp"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={floatingWhatsApp.label}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 340, damping: 22 }}
          className="group fixed right-5 bottom-5 z-[68] flex items-center gap-3 rounded-pill bg-[#25D366] py-3.5 pr-4 pl-3.5 text-white shadow-[0_18px_40px_-14px_rgba(37,211,102,.8)] sm:right-7 sm:bottom-7"
        >
          <span className="relative grid place-items-center">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
            <Icon name="whatsapp" size={24} />
          </span>
          <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap opacity-0 transition-all duration-400 group-hover:max-w-[11rem] group-hover:opacity-100">
            {floatingWhatsApp.label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
