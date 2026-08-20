'use client';

import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import Icon from '@/components/ui/Icon';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import { home } from '@/lib/content';

export default function Stats() {
  const data = home.stats;
  if (!data?.enabled || !data.items?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-linear-135 from-primary via-primary to-primary-dark py-16 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div
          className="size-full"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
      </div>
      <div aria-hidden className="absolute -top-24 -right-16 size-80 rounded-full bg-white/10 blur-3xl" />

      <div className="container-page relative">
        <Reveal className="mb-12 flex flex-col items-center text-center">
          {data.eyebrow && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] uppercase">
              <Icon name="bar-chart-3" size={13} />
              {data.eyebrow}
            </span>
          )}
          {data.heading && (
            <h2 className="max-w-2xl text-[clamp(1.6rem,3.8vw,2.6rem)] text-white">{data.heading}</h2>
          )}
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4">
          {data.items.map((stat: any) => (
            <StaggerItem key={stat.label}>
              <div className="group flex flex-col items-center text-center">
                <span className="mb-4 grid size-12 place-items-center rounded-[0.9rem] bg-white/12 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={stat.icon} size={21} />
                </span>
                <span className="font-heading text-[clamp(2rem,6vw,3.25rem)] leading-none font-bold tracking-[-0.04em]">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </span>
                <span className="mt-2.5 text-[0.8125rem] font-medium text-white/70 sm:text-[0.875rem]">
                  {stat.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {data.note && (
          <Reveal delay={0.2}>
            <p className="mt-12 text-center text-[0.75rem] text-white/45">{data.note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
