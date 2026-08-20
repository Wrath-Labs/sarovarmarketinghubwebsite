'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Icon from '@/components/ui/Icon';
import { home, motionConfig } from '@/lib/content';
import type { ProcessStep } from '@/lib/types';

export default function Process({ data = home.process }: { data?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;
  const steps: ProcessStep[] = data?.steps || [];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!data?.enabled && data?.enabled !== undefined) return null;
  if (!steps.length) return null;

  return (
    <Section id="process" tone="section">
      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        icon="route"
      />

      <div ref={ref} className="relative mt-16">
        {/* vertical rail (mobile) / horizontal rail (desktop) */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-[1.4rem] w-px bg-line lg:top-[3.05rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
        />
        <motion.div
          aria-hidden
          style={animate ? { height: lineHeight } : { height: '100%' }}
          className="absolute top-0 left-[1.4rem] w-px origin-top bg-linear-to-b from-primary to-primary-dark lg:hidden"
        />
        <motion.div
          aria-hidden
          style={animate ? { scaleX: scrollYProgress } : { scaleX: 1 }}
          className="absolute top-[3.05rem] left-0 hidden h-px w-full origin-left bg-linear-to-r from-primary to-primary-dark lg:block"
        />

        <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex gap-5 pl-0 lg:flex-col lg:gap-0"
            >
              {/* node */}
              <div className="relative z-10 shrink-0">
                <span className="grid size-11 place-items-center rounded-full border-4 border-section bg-primary text-white shadow-[0_10px_24px_-10px_var(--c-primary)] transition-transform duration-500 group-hover:scale-110">
                  <Icon name={step.icon} size={19} />
                </span>
              </div>

              <div className="lg:mt-7 lg:pr-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-heading text-[0.75rem] font-bold tracking-[0.2em] text-primary/60">
                    {step.number}
                  </span>
                  {step.duration && (
                    <span className="rounded-pill bg-primary/8 px-2.5 py-1 text-[0.625rem] font-bold tracking-wide text-primary uppercase">
                      {step.duration}
                    </span>
                  )}
                </div>
                <h3 className="mt-2.5 font-heading text-lg font-bold text-heading sm:text-xl">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
