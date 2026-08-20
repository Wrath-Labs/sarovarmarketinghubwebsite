'use client';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import Icon from '@/components/ui/Icon';
import TiltCard from '@/components/ui/TiltCard';
import { Blobs } from '@/components/ui/Decor';
import { home } from '@/lib/content';

export default function WhyUs() {
  const data = home.whyUs;
  if (!data?.items?.length) return null;

  return (
    <Section id="why-us" tone="dark">
      <Blobs tone="dark" />

      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        highlight={data.highlight}
        subheading={data.subheading}
        tone="dark"
        icon="award"
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item: any, i: number) => (
          <StaggerItem key={item.title} className="h-full">
            <TiltCard className="group h-full" intensity={4} glow={false}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/25 hover:bg-white/[0.07] sm:p-8">
                {/* number watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-5 right-4 font-heading text-[5rem] leading-none font-bold text-white/[0.045] transition-all duration-500 group-hover:text-white/[0.09]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="relative grid size-13 place-items-center rounded-[1rem] bg-linear-135 from-primary to-primary-dark text-white shadow-[0_12px_30px_-12px_var(--c-primary)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={item.icon} size={23} strokeWidth={1.75} />
                </span>

                <h3 className="relative mt-6 font-heading text-lg font-bold text-white sm:text-xl">{item.title}</h3>
                <p className="relative mt-3 flex-1 text-[0.9375rem] leading-relaxed text-white/60">
                  {item.description}
                </p>

                {item.metric && (
                  <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-pill border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-[0.75rem] font-bold text-white/85">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {item.metric}
                  </span>
                )}
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
