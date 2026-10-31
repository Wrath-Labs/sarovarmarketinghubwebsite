'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { home, site } from '@/lib/content';
import { splitHighlight } from '@/lib/utils';

export default function ContactCta() {
  const data = home.contact;
  if (!data) return null;

  const parts = splitHighlight(data.heading, data.highlight);

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-section section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 size-[30rem] rounded-full bg-primary/12 blur-[120px]" />
      </div>

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-linear-135 from-primary-dark via-primary to-primary px-7 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* decor */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.13]">
            <div
              className="size-full"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-24 -bottom-28 size-96 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] uppercase">
                <Icon name="send" size={13} />
                {data.eyebrow}
              </span>

              <h2 className="mt-6 max-w-2xl text-[clamp(1.85rem,4.6vw,3.25rem)] text-white">
                {parts.map((p, i) => (
                  <span key={i} className={p.accent ? 'italic text-white/80' : undefined}>
                    {p.text}
                  </span>
                ))}
              </h2>

              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">{data.subheading}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Button
                  href={data.primaryCta.href}
                  label={data.primaryCta.label}
                  icon={data.primaryCta.icon}
                  iconPosition="left"
                  variant="light"
                  size="lg"
                />
                <Button
                  href={data.secondaryCta.href}
                  label={data.secondaryCta.label}
                  icon={data.secondaryCta.icon}
                  iconPosition="left"
                  variant="outlineLight"
                  size="lg"
                />
              </div>
            </div>

            <Reveal direction="left" className="flex flex-col gap-4">
              {data.points?.map((point: any, i: number) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-3.5 rounded-soft border border-white/12 bg-white/[0.07] p-4 backdrop-blur-sm"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[0.75rem] bg-white text-primary">
                    <Icon name={point.icon} size={18} />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-white/90">{point.text}</span>
                </motion.div>
              ))}

              {data.formNote && (
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/55">{data.formNote}</p>
              )}
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
