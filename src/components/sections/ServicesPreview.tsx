'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import TiltCard from '@/components/ui/TiltCard';
import { GridPattern } from '@/components/ui/Decor';
import { home, services } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function ServicesPreview() {
  const data = home.services;
  const items: any[] = services.services || [];
  if (!data || !items.length) return null;

  return (
    <Section id="services" tone="page">
      <GridPattern className="opacity-60" />

      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        icon="layers"
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {items.map((service: any, i: number) => (
          <StaggerItem key={service.id} className="h-full">
            <TiltCard className="group h-full" intensity={5}>
              <Link
                href={`/services#${service.id}`}
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-card border p-7 transition-all duration-500 sm:p-8',
                  service.featured
                    ? 'border-primary/25 bg-linear-135 from-primary to-primary-dark text-white shadow-[0_24px_60px_-24px_var(--c-primary)]'
                    : 'border-line bg-white hover:border-primary/30 hover:shadow-card',
                )}
              >
                {/* hover wash */}
                {!service.featured && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 bg-linear-to-br from-primary/6 via-transparent to-accent/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}

                <span
                  className={cn(
                    'relative grid size-14 place-items-center rounded-[1.1rem] transition-transform duration-500 group-hover:scale-108 group-hover:-rotate-6',
                    service.featured
                      ? 'bg-white/15 text-white ring-1 ring-white/20'
                      : 'bg-primary/8 text-primary ring-1 ring-primary/10',
                  )}
                >
                  <Icon name={service.icon} size={25} strokeWidth={1.7} />
                </span>

                <h3
                  className={cn(
                    'relative mt-6 font-heading text-xl font-bold sm:text-[1.375rem]',
                    service.featured && 'text-white',
                  )}
                >
                  {service.title}
                </h3>

                <p
                  className={cn(
                    'relative mt-3 text-[0.9375rem] leading-relaxed',
                    service.featured ? 'text-white/75' : 'text-body',
                  )}
                >
                  {service.tagline}
                </p>

                {/* Point-by-point detail lives on /services; landing shows name + one-liner only.
                {service.bullets?.length > 0 && (
                  <ul className="relative mt-6 flex flex-col gap-2.5">
                    {service.bullets.map((b: string) => (
                      <li
                        key={b}
                        className={cn(
                          'flex items-start gap-2.5 text-[0.8125rem] font-medium',
                          service.featured ? 'text-white/80' : 'text-heading/75',
                        )}
                      >
                        <Icon
                          name="check"
                          size={15}
                          className={cn('mt-0.5', service.featured ? 'text-white' : 'text-primary')}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                */}

                <span
                  className={cn(
                    'relative mt-8 inline-flex items-center gap-2 pt-1 text-[0.8125rem] font-bold tracking-wide',
                    service.featured ? 'text-white' : 'text-primary',
                  )}
                >
                  Learn more
                  <motion.span
                    aria-hidden
                    className="inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </motion.span>
                </span>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>

      {data.cta && (
        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href={data.cta.href} label={data.cta.label} icon={data.cta.icon} variant="secondary" size="lg" />
        </Reveal>
      )}
    </Section>
  );
}
