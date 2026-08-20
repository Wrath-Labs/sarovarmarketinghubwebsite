'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { site } from '@/lib/content';

export default function CtaBanner({ data }: { data: any }) {
  if (!data) return null;
  const wa = (site.contactInfo.whatsapp || '').replace(/[^\d]/g, '');

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 size-[32rem] rounded-full bg-primary/25 blur-[120px]"
        />
        <div className="absolute -right-20 -bottom-40 size-[26rem] rounded-full bg-primary-dark/50 blur-[120px]" />
      </div>

      <div className="container-page relative flex flex-col items-center text-center">
        {data.eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] uppercase"
          >
            <Icon name="sparkles" size={13} />
            {data.eyebrow}
          </motion.span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl text-[clamp(1.9rem,5vw,3.4rem)] text-white"
        >
          {data.heading}
        </motion.h2>

        {data.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/65"
          >
            {data.subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          {data.primaryCta && (
            <Button
              href={data.primaryCta.href}
              label={data.primaryCta.label}
              icon={data.primaryCta.icon}
              iconPosition="left"
              variant="light"
              size="lg"
            />
          )}
          {data.secondaryCta && (
            <Button
              href={data.secondaryCta.href === '#whatsapp' ? `https://wa.me/${wa}` : data.secondaryCta.href}
              label={data.secondaryCta.label}
              icon={data.secondaryCta.icon}
              variant="outlineLight"
              size="lg"
            />
          )}
        </motion.div>

        {data.note && (
          <p className="mt-6 text-[0.8125rem] text-white/40">{data.note}</p>
        )}
      </div>
    </section>
  );
}
