'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Icon from '@/components/ui/Icon';
import Stars from '@/components/ui/Stars';
import SmartImage from '@/components/ui/SmartImage';
import { Blobs } from '@/components/ui/Decor';
import { home } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types';

export default function Testimonials() {
  const data = home.testimonials;
  const items: Testimonial[] = data?.items || [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + items.length) % items.length);
    },
    [index, items.length],
  );

  useEffect(() => {
    if (!data?.autoplay || paused || items.length < 2) return;
    const t = setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % items.length);
    }, (data.autoplaySeconds || 7) * 1000);
    return () => clearTimeout(t);
  }, [index, paused, data, items.length]);

  if (!items.length) return null;
  const active = items[index];

  return (
    <Section id="testimonials" tone="page">
      <Blobs />

      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        icon="quote"
      />

      <div
        className="relative mx-auto mt-14 max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* card */}
        <div className="relative min-h-[24rem] sm:min-h-[21rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -60, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-card border border-line bg-white p-7 shadow-card sm:p-11"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-4 font-heading text-[9rem] leading-none text-primary/6 select-none sm:right-10"
              >
                &rdquo;
              </span>

              <Stars rating={active.rating || 5} className="relative" />

              <p className="relative mt-6 font-heading text-[1.125rem] leading-[1.55] font-medium text-heading sm:text-[1.375rem] sm:leading-[1.5]">
                {active.quote}
              </p>

              <footer className="relative mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="relative size-13 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/15">
                  <SmartImage src={active.avatar} alt={active.name} fill sizes="52px" />
                </span>
                <span className="flex flex-col">
                  <span className="font-heading text-[0.9375rem] font-bold text-heading">{active.name}</span>
                  <span className="text-[0.8125rem] text-body">
                    {active.role}
                    {active.role && active.company ? ' · ' : ''}
                    <span className="font-semibold text-primary">{active.company}</span>
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-heading transition-all duration-300 hover:-translate-x-0.5 hover:border-primary hover:bg-primary hover:text-white"
            >
              <Icon name="arrow-left" size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-heading transition-all duration-300 hover:translate-x-0.5 hover:border-primary hover:bg-primary hover:text-white"
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>

          {/* avatar picker */}
          <div className="flex items-center gap-2">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                className={cn(
                  'relative size-10 overflow-hidden rounded-full transition-all duration-400',
                  i === index
                    ? 'scale-110 ring-2 ring-primary ring-offset-2 ring-offset-page'
                    : 'opacity-45 grayscale hover:opacity-80 hover:grayscale-0',
                )}
              >
                <SmartImage src={t.avatar} alt={t.name} fill sizes="40px" />
              </button>
            ))}
          </div>
        </div>

        {/* autoplay progress */}
        {data.autoplay && (
          <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-line">
            <motion.div
              key={`${index}-${paused}`}
              initial={{ width: '0%' }}
              animate={{ width: paused ? '0%' : '100%' }}
              transition={{ duration: paused ? 0.2 : data.autoplaySeconds || 7, ease: 'linear' }}
              className="h-full rounded-full bg-linear-to-r from-primary to-primary-dark"
            />
          </div>
        )}
      </div>
    </Section>
  );
}
