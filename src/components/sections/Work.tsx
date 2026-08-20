'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SmartImage from '@/components/ui/SmartImage';
import { home } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { WorkItem } from '@/lib/types';

export default function Work() {
  const data = home.work;
  const items: WorkItem[] = data?.items || [];
  const allLabel = data?.allLabel || 'All work';
  const [filter, setFilter] = useState(allLabel);

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(items.map((i) => i.category)))],
    [items, allLabel],
  );

  const visible = filter === allLabel ? items : items.filter((i) => i.category === filter);

  if (!items.length) return null;

  return (
    <Section id="work" tone="page">
      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        icon="briefcase"
      />

      {/* filters */}
      {data.filtersEnabled && categories.length > 2 && (
        <Reveal delay={0.1} className="mt-11">
          <div className="hide-scrollbar -mx-5 flex snap-x items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={cn(
                    'relative shrink-0 snap-start rounded-pill border px-4.5 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-300',
                    active
                      ? 'border-primary text-white'
                      : 'border-line text-heading/70 hover:border-primary/40 hover:text-primary',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 -z-10 rounded-pill bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      {/* grid */}
      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-7">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.article
              key={item.title}
              layout
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow duration-500 hover:shadow-soft"
            >
              {/* media */}
              <Link href={item.link || '/contact'} className="relative block aspect-16/11 overflow-hidden">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 92vw, 46vw"
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-108"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                />

                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-pill bg-white/95 px-3 py-1.5 text-[0.6875rem] font-bold tracking-wide text-primary uppercase backdrop-blur">
                  {item.category}
                </span>

                <span className="absolute top-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-primary text-white opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <Icon name="arrow-up-right" size={18} />
                </span>

                {/* results on image */}
                {item.results?.length ? (
                  <span className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                    {item.results.map((r) => (
                      <span
                        key={r.label}
                        className="flex flex-col rounded-[0.75rem] bg-white/15 px-3 py-2 leading-tight ring-1 ring-white/30 backdrop-blur-md"
                      >
                        <span className="font-heading text-[0.9375rem] font-bold text-white">{r.value}</span>
                        <span className="text-[0.625rem] font-medium text-white/75">{r.label}</span>
                      </span>
                    ))}
                  </span>
                ) : null}
              </Link>

              {/* body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-heading transition-colors duration-300 group-hover:text-primary sm:text-[1.375rem]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">{item.summary}</p>

                {item.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill bg-section px-2.5 py-1 text-[0.6875rem] font-semibold text-heading/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <Link
                  href={item.link || '/contact'}
                  className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-bold text-primary"
                >
                  {item.linkLabel || 'View project'}
                  <Icon name="arrow-right" size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {data.cta && (
        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href={data.cta.href} label={data.cta.label} icon={data.cta.icon} size="lg" />
        </Reveal>
      )}
    </Section>
  );
}
