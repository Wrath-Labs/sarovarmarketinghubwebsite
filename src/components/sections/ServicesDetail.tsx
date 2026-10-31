'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import ServiceVisual from '@/components/ui/ServiceVisual';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import { services, whatsappHref } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { ServiceItem } from '@/lib/types';

export default function ServicesDetail() {
  const intro = services.servicesIntro;
  const items: ServiceItem[] = services.services || [];
  if (!items.length) return null;

  return (
    <Section tone="page" id="all-services">
      {intro && (
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          highlight={intro.highlight}
          subheading={intro.subheading}
          subheadingMobile={intro.subheadingMobile}
          icon="layers"
        />
      )}

      <div className="mt-16 flex flex-col gap-20 sm:gap-24 lg:gap-28">
        {items.map((service, i) => {
          const flip = i % 2 === 1;

          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* ---------- visual ---------- */}
              <Reveal
                direction={flip ? 'left' : 'right'}
                className={cn('relative', flip && 'lg:order-2')}
              >
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-5 -z-10 rounded-[2.5rem] bg-linear-135 from-primary/25 to-primary-dark/20 blur-[50px]"
                  />
                  <motion.div
                    whileHover={{ y: -8, rotate: flip ? -0.8 : 0.8 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  >
                    <ServiceVisual id={service.id} icon={service.icon} title={service.title} />
                  </motion.div>

                  {service.priceFrom && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.25 }}
                      className="absolute -bottom-5 left-6 flex flex-col rounded-[1.1rem] border border-line bg-page px-5 py-3.5 shadow-card"
                    >
                      <span className="text-[0.625rem] font-bold tracking-[0.14em] text-body uppercase">
                        Starting from
                      </span>
                      <span className="font-heading text-lg font-bold text-primary">{service.priceFrom}</span>
                    </motion.span>
                  )}
                </div>
              </Reveal>

              {/* ---------- copy ---------- */}
              <div className={cn('flex flex-col', flip && 'lg:order-1')}>
                <Reveal direction="down" distance={14}>
                  <div className="flex items-center gap-3.5">
                    <span className="grid size-13 place-items-center rounded-[1rem] bg-linear-135 from-primary to-primary-dark text-white shadow-[0_12px_28px_-12px_var(--c-primary)]">
                      <Icon name={service.icon} size={23} strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-heading text-[0.6875rem] font-bold tracking-[0.2em] text-primary/60 uppercase">
                        {String(i + 1).padStart(2, '0')} / Service
                      </span>
                      {service.tagline && (
                        <span className="text-[0.8125rem] font-semibold text-body">{service.tagline}</span>
                      )}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h3 className="mt-6 text-[clamp(1.6rem,3.8vw,2.5rem)] leading-[1.1]">{service.title}</h3>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-4 text-[1rem] leading-relaxed text-body sm:text-[1.0625rem]">
                    <RichText text={service.description} />
                  </p>
                </Reveal>

                {service.features?.length ? (
                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {service.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: fi * 0.06 }}
                        className="flex items-start gap-2.5 text-[0.875rem] font-medium text-heading/80"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Icon name="check" size={12} strokeWidth={3} />
                        </span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                ) : null}

                {service.deliverables?.length ? (
                  <Reveal delay={0.16} className="mt-7">
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((d) => (
                        <span
                          key={d}
                          className="inline-flex items-center gap-1.5 rounded-pill bg-section px-3.5 py-1.5 text-[0.75rem] font-bold text-heading/70"
                        >
                          <Icon name="package" size={13} className="text-primary" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ) : null}

                {service.idealFor && (
                  <Reveal delay={0.2} className="mt-7">
                    <p className="flex items-start gap-2.5 rounded-soft border border-primary/15 bg-primary/6 p-4 text-[0.875rem] leading-relaxed text-heading/80">
                      <Icon name="target" size={17} className="mt-0.5 shrink-0 text-primary" />
                      <span>
                        <span className="font-bold text-heading">Ideal for: </span>
                        {service.idealFor}
                      </span>
                    </p>
                  </Reveal>
                )}

                <Reveal delay={0.24} className="mt-8">
                  <Button
                    href={whatsappHref(`Hi Sarovar Marketing Hub! I'd like to enquire about ${service.title}.`)}
                    label={`Enquire about ${service.title}`}
                    icon="arrow-right"
                  />
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
