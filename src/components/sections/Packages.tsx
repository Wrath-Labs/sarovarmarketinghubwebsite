'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function Packages() {
  const data = services.packages;
  if (!data?.enabled || !data.items?.length) return null;

  return (
    <Section id="packages" tone="section">
      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        icon="wallet"
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {data.items.map((plan: any, i: number) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className={cn(
              'group relative flex flex-col overflow-hidden rounded-card p-8 transition-shadow duration-500 sm:p-9',
              plan.highlighted
                ? 'border border-primary/30 bg-linear-135 from-primary-dark via-primary to-primary text-white shadow-[0_30px_70px_-28px_var(--c-primary)] lg:-my-4 lg:py-12'
                : 'border border-line bg-page hover:shadow-card',
            )}
          >
            {plan.highlighted && (
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <div
                  className="size-full"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                  }}
                />
              </div>
            )}

            {plan.badge && (
              <span
                className={cn(
                  'relative mb-6 inline-flex w-fit items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] uppercase',
                  plan.highlighted ? 'bg-white text-primary' : 'bg-primary/10 text-primary',
                )}
              >
                <Icon name="star" size={12} className="fill-current" />
                {plan.badge}
              </span>
            )}

            <h3
              className={cn(
                'relative font-heading text-xl font-bold',
                plan.highlighted ? 'text-white' : 'text-heading',
              )}
            >
              {plan.name}
            </h3>

            <p
              className={cn(
                'relative mt-2.5 text-[0.875rem] leading-relaxed',
                plan.highlighted ? 'text-white/70' : 'text-body',
              )}
            >
              {plan.description}
            </p>

            <p className="relative mt-7 flex items-end gap-1.5">
              <span
                className={cn(
                  'font-heading text-[clamp(2rem,5vw,2.75rem)] leading-none font-bold tracking-[-0.03em]',
                  plan.highlighted ? 'text-white' : 'text-heading',
                )}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span className={cn('pb-1 text-[0.8125rem] font-medium', plan.highlighted ? 'text-white/60' : 'text-body')}>
                  {plan.period}
                </span>
              )}
            </p>

            <ul className="relative mt-8 flex flex-1 flex-col gap-3">
              {plan.features?.map((f: string) => (
                <li
                  key={f}
                  className={cn(
                    'flex items-start gap-2.5 text-[0.875rem]',
                    plan.highlighted ? 'text-white/85' : 'text-heading/80',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                      plan.highlighted ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary',
                    )}
                  >
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="relative mt-9">
              <Button
                href={plan.cta?.href || '/contact'}
                label={plan.cta?.label || 'Get started'}
                icon="arrow-right"
                variant={plan.highlighted ? 'light' : 'primary'}
                fullWidth
              />
            </div>
          </motion.div>
        ))}
      </div>

      {(data.note || data.billingNote) && (
        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-2 text-center">
          {data.billingNote && (
            <p className="inline-flex items-center gap-2 rounded-pill border border-line bg-page px-4 py-2 text-[0.8125rem] font-semibold text-heading/70">
              <Icon name="calendar" size={14} className="text-primary" />
              {data.billingNote}
            </p>
          )}
          {data.note && <p className="max-w-xl text-[0.8125rem] leading-relaxed text-body/80">{data.note}</p>}
        </Reveal>
      )}
    </Section>
  );
}
