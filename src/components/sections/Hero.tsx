'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SmartImage from '@/components/ui/SmartImage';
import Highlight from '@/components/ui/Highlight';
import { Blobs, GridPattern } from '@/components/ui/Decor';
import { home, motionConfig } from '@/lib/content';
import { splitHighlight } from '@/lib/utils';
import { cn } from '@/lib/utils';

/* Cards sit half outside the visual so they never cover its content. */
const positions: Record<string, string> = {
  'top-left': '-top-5 -left-3 sm:-top-7 sm:-left-9',
  'top-right': '-top-5 -right-3 sm:-top-7 sm:-right-9',
  'bottom-left': '-bottom-5 -left-3 sm:-bottom-7 sm:-left-9',
  'bottom-right': '-bottom-5 -right-3 sm:-bottom-7 sm:-right-9',
};

export default function Hero() {
  const hero = home.hero;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const headingParts = splitHighlight(
    `${hero.headingLine1} ${hero.headingHighlight}${hero.headingLine2 ? ` ${hero.headingLine2}` : ''}`.trim(),
    hero.headingHighlight,
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-page pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <Blobs />
      <GridPattern variant="grid" className="opacity-70" />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_1fr] lg:gap-12 xl:gap-20">
          {/* ---------------- copy ---------------- */}
          <motion.div
            variants={animate ? container : undefined}
            initial={animate ? 'hidden' : undefined}
            animate={animate ? 'visible' : undefined}
            style={animate ? { y: textY } : undefined}
            className="flex flex-col items-start"
          >
            {hero.badge?.enabled && (
              <motion.div variants={animate ? item : undefined}>
                <span className="group inline-flex items-center gap-2.5 rounded-pill border border-primary/15 bg-primary/6 py-2 pr-5 pl-2 text-[0.8125rem] font-semibold text-primary">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-white">
                    <Icon name={hero.badge.icon} size={14} />
                  </span>
                  {hero.badge.text}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={animate ? item : undefined}
              className="mt-6 text-[clamp(2.3rem,7.2vw,4.5rem)] leading-[1.02] tracking-[-0.035em]"
            >
              {headingParts.map((part, i) =>
                part.accent ? (
                  <Highlight key={i} trigger="mount" delay={0.75} thickness="0.12em">
                    {part.text}
                  </Highlight>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </motion.h1>

            <motion.p
              variants={animate ? item : undefined}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-body sm:text-lg"
            >
              {hero.subheading}
            </motion.p>

            <motion.div variants={animate ? item : undefined} className="mt-9 flex flex-wrap items-center gap-3.5">
              <Button
                href={hero.primaryCta.href}
                label={hero.primaryCta.label}
                icon={hero.primaryCta.icon}
                iconPosition="left"
                size="lg"
              />
              <Button
                href={hero.secondaryCta.href}
                label={hero.secondaryCta.label}
                icon={hero.secondaryCta.icon}
                iconPosition="left"
                variant="secondary"
                size="lg"
              />
            </motion.div>

            {hero.trustLine && (
              <motion.div variants={animate ? item : undefined} className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {(home.testimonials?.items || []).slice(0, 4).map((t: any, i: number) => (
                    <motion.span
                      key={t.name}
                      initial={{ opacity: 0, scale: 0.5, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.09, type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative size-10 overflow-hidden rounded-full ring-3 ring-page"
                    >
                      <SmartImage src={t.avatar} alt={t.name} fill sizes="40px" />
                    </motion.span>
                  ))}
                </div>
                <p className="max-w-[15rem] text-[0.8125rem] leading-snug text-body sm:max-w-none">
                  {hero.trustLine}
                </p>
              </motion.div>
            )}

            {hero.quickStats?.length > 0 && (
              <motion.dl
                variants={animate ? item : undefined}
                className="mt-11 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-line pt-8"
              >
                {hero.quickStats.map((s: any) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <dt className="font-heading text-[clamp(1.4rem,4vw,1.9rem)] font-bold text-heading">{s.value}</dt>
                    <dd className="text-[0.75rem] leading-snug text-body sm:text-[0.8125rem]">{s.label}</dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </motion.div>

          {/* ---------------- visual ---------------- */}
          <motion.div
            initial={animate ? { opacity: 0, scale: 0.92, y: 40 } : undefined}
            animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={animate ? { y: imageY } : undefined}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {/* halo */}
            <div
              aria-hidden
              className="absolute inset-6 -z-10 rounded-[3rem] bg-linear-135 from-primary/30 to-primary-dark/25 blur-[60px]"
            />

            <motion.div
              animate={animate ? { y: [0, -14, 0] } : undefined}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft"
            >
              <SmartImage
                src={hero.image}
                alt={hero.imageAlt}
                priority
                width={640}
                height={620}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-auto w-full"
              />
            </motion.div>

            {/* floating stat cards */}
            {(hero.floatingCards || []).map((card: any, i: number) => (
              <motion.div
                key={card.title}
                initial={animate ? { opacity: 0, scale: 0.7, y: 24 } : undefined}
                animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
                transition={{ delay: 0.95 + i * 0.18, type: 'spring', stiffness: 260, damping: 20 }}
                className={cn('absolute z-10', positions[card.position] || positions['top-left'])}
              >
                <motion.div
                  animate={animate ? { y: [0, i % 2 === 0 ? -12 : 12, 0] } : undefined}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 rounded-[1.15rem] border border-line bg-page/90 px-4 py-3.5 shadow-card backdrop-blur-md"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[0.85rem] bg-linear-135 from-primary to-primary-dark text-white">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-heading text-lg font-bold text-heading">{card.title}</span>
                    <span className="text-[0.6875rem] font-medium text-body">{card.subtitle}</span>
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* scroll hint */}
        {hero.scrollHint && (
          <motion.div
            style={animate ? { opacity: fade } : undefined}
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16 hidden items-center justify-center gap-3 lg:flex"
          >
            <span className="text-[0.6875rem] font-bold tracking-[0.22em] text-body/60 uppercase">
              {hero.scrollHint}
            </span>
            <motion.span
              animate={animate ? { y: [0, 7, 0] } : undefined}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="grid size-8 place-items-center rounded-full border border-line text-primary"
            >
              <Icon name="chevron-down" size={15} />
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
