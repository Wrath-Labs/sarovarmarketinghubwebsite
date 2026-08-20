'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import { Blobs, GridPattern } from '@/components/ui/Decor';
import { splitHighlight, cn } from '@/lib/utils';

/** Shared hero for the inner pages (/services, /contact). */
export default function PageHero({
  eyebrow,
  heading,
  highlight,
  subheading,
  primaryCta,
  secondaryCta,
  badges,
  breadcrumb,
}: {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  subheading?: string;
  primaryCta?: { label: string; href: string; icon?: string };
  secondaryCta?: { label: string; href: string; icon?: string };
  badges?: { icon?: string; label: string }[];
  breadcrumb?: string;
}) {
  const parts = splitHighlight(heading, highlight);

  const item = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative isolate overflow-hidden bg-page pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
      <Blobs />
      <GridPattern className="opacity-70" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
        className="container-page flex flex-col items-center text-center"
      >
        {breadcrumb && (
          <motion.nav variants={item} aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-[0.75rem] font-semibold text-body/70">
              <li>
                <Link href="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-body/40">
                /
              </li>
              <li className="text-primary">{breadcrumb}</li>
            </ol>
          </motion.nav>
        )}

        {eyebrow && (
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-pill border border-primary/15 bg-primary/8 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] text-primary uppercase"
          >
            <Icon name="sparkles" size={13} />
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl text-[clamp(2.1rem,6vw,4rem)] leading-[1.04] tracking-[-0.035em]"
        >
          {parts.map((p, i) =>
            p.accent ? (
              <Highlight key={i} trigger="mount" delay={0.6}>
                {p.text}
              </Highlight>
            ) : (
              <span key={i}>{p.text}</span>
            ),
          )}
        </motion.h1>

        {subheading && (
          <motion.p variants={item} className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-body sm:text-lg">
            {subheading}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            {primaryCta && (
              <Button
                href={primaryCta.href}
                label={primaryCta.label}
                icon={primaryCta.icon}
                iconPosition="left"
                size="lg"
              />
            )}
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                label={secondaryCta.label}
                icon={secondaryCta.icon}
                variant="secondary"
                size="lg"
              />
            )}
          </motion.div>
        )}

        {badges?.length ? (
          <motion.ul variants={item} className={cn('mt-11 flex flex-wrap items-center justify-center gap-2.5')}>
            {badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 rounded-pill border border-line bg-white/70 px-4 py-2 text-[0.8125rem] font-semibold text-heading/75 backdrop-blur"
              >
                <Icon name={b.icon} size={15} className="text-primary" />
                {b.label}
              </li>
            ))}
          </motion.ul>
        ) : null}
      </motion.div>
    </section>
  );
}
