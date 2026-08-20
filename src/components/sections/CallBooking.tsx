'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { contact } from '@/lib/content';

export default function CallBooking() {
  const data = contact.callBooking;
  if (!data?.enabled) return null;

  return (
    <Section tone="section" compact>
      <div className="grid items-center gap-10 rounded-card border border-line bg-page p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-12">
        <div>
          <Reveal direction="down" distance={14}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-primary/15 bg-primary/8 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] text-primary uppercase">
              <Icon name="calendar-clock" size={13} />
              {data.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(1.6rem,3.8vw,2.5rem)]">{data.heading}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-body">{data.subheading}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8">
            <Button
              href={data.cta.href}
              label={data.cta.label}
              icon={data.cta.icon}
              iconPosition="left"
              size="lg"
              external
            />
          </Reveal>

          {data.note && <p className="mt-4 text-[0.75rem] text-body/60">{data.note}</p>}
        </div>

        <ul className="flex flex-col gap-3">
          {data.points?.map((p: any, i: number) => (
            <motion.li
              key={p.text}
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-3.5 rounded-soft border border-line bg-section p-4"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[0.75rem] bg-primary text-white">
                <Icon name={p.icon} size={18} />
              </span>
              <span className="text-[0.9375rem] font-medium text-heading/85">{p.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
