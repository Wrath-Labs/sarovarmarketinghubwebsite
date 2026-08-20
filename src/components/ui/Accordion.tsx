'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/lib/types';

export default function Accordion({
  items,
  tone = 'light',
  className,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  tone?: 'light' | 'dark';
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const dark = tone === 'dark';

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items?.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'overflow-hidden rounded-soft border transition-colors duration-300',
              dark
                ? isOpen
                  ? 'border-white/25 bg-white/[0.07]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                : isOpen
                  ? 'border-primary/30 bg-white shadow-card'
                  : 'border-line bg-white/70 hover:border-primary/25',
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
            >
              <span
                className={cn(
                  'font-heading text-[1.0rem] font-semibold leading-snug sm:text-[1.0625rem]',
                  dark ? 'text-white' : 'text-heading',
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300',
                  isOpen
                    ? 'rotate-180 bg-primary text-white'
                    : dark
                      ? 'bg-white/10 text-white/70'
                      : 'bg-primary/8 text-primary',
                )}
              >
                <Icon name="chevron-down" size={17} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className={cn(
                      'px-5 pb-6 text-[0.9375rem] leading-relaxed sm:px-7 sm:pb-7 sm:text-base',
                      dark ? 'text-white/70' : 'text-body',
                    )}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
