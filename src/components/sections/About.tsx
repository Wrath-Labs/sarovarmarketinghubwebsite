'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SmartImage from '@/components/ui/SmartImage';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import { home, motionConfig } from '@/lib/content';
import { splitHighlight } from '@/lib/utils';

export default function About() {
  const data = home.about;
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;
  if (!data) return null;

  const parts = splitHighlight(data.heading, data.highlight);

  return (
    <Section id="about" tone="section">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* ------------- visual ------------- */}
        <Reveal direction="right" className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <motion.div
              animate={animate ? { rotate: [0, 1.4, 0] } : undefined}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[2rem] shadow-soft"
            >
              <SmartImage
                src={data.image}
                alt={data.imageAlt}
                width={720}
                height={780}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-auto w-full"
              />
            </motion.div>

            {/* years badge */}
            {data.imageBadge && (
              <motion.div
                initial={animate ? { opacity: 0, scale: 0.6 } : undefined}
                whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }}
                className="absolute -right-3 -bottom-5 flex items-center gap-3 rounded-[1.25rem] border border-line bg-page px-5 py-4 shadow-card sm:-right-7"
              >
                <span className="grid size-12 place-items-center rounded-[0.9rem] bg-linear-135 from-primary to-primary-dark text-white">
                  <Icon name={data.imageBadge.icon} size={22} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-heading text-xl font-bold text-heading">{data.imageBadge.title}</span>
                  <span className="text-[0.6875rem] font-medium text-body">{data.imageBadge.subtitle}</span>
                </span>
              </motion.div>
            )}

            {/* founder quote card */}
            {data.signature?.enabled && (
              <motion.div
                initial={animate ? { opacity: 0, x: -30 } : undefined}
                whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-5 -left-3 hidden max-w-[15rem] items-start gap-3 rounded-[1.25rem] border border-line bg-page/95 p-4 shadow-card backdrop-blur sm:-left-8 sm:flex"
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                  <SmartImage src={data.signature.image} alt={data.signature.name} fill sizes="44px" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.8125rem] leading-snug font-medium text-heading">
                    “{data.signature.quote}”
                  </span>
                  <span className="mt-1.5 text-[0.6875rem] font-bold text-primary">{data.signature.name}</span>
                  <span className="text-[0.625rem] text-body">{data.signature.role}</span>
                </span>
              </motion.div>
            )}
          </div>
        </Reveal>

        {/* ------------- copy ------------- */}
        <div className="order-1 flex flex-col lg:order-2">
          <Reveal direction="down" distance={14}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-primary/15 bg-primary/8 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] text-primary uppercase">
              <Icon name="users" size={13} />
              {data.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3.1rem)] leading-[1.07]">
              {parts.map((p, i) =>
                p.accent ? (
                  <span key={i} className="text-gradient">
                    {p.text}
                  </span>
                ) : (
                  <span key={i}>{p.text}</span>
                ),
              )}
            </h2>
          </Reveal>

          {data.paragraphs?.map((para: string, i: number) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p className="mt-5 text-[1.0rem] leading-relaxed text-body sm:text-[1.0625rem]">{para}</p>
            </Reveal>
          ))}

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.1}>
            {data.highlights?.map((h: any) => (
              <StaggerItem key={h.title}>
                <div className="group flex h-full items-start gap-3.5 rounded-soft border border-line bg-page/70 p-4 transition-all duration-400 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[0.75rem] bg-primary/8 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-white">
                    <Icon name={h.icon} size={19} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-heading text-[0.9375rem] font-bold text-heading">{h.title}</span>
                    <span className="text-[0.8125rem] leading-snug text-body">{h.text}</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {data.cta && (
            <Reveal delay={0.2} className="mt-9">
              <Button href={data.cta.href} label={data.cta.label} icon={data.cta.icon} size="lg" />
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
