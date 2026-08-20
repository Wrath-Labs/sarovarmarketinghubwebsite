'use client';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { home, site } from '@/lib/content';

export default function Faq({ data = home.faq, tone = 'section' }: { data?: any; tone?: 'section' | 'page' }) {
  if (!data || data.enabled === false || !data.items?.length) return null;

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            highlight={data.highlight}
            subheading={data.subheading}
            align="left"
            icon="circle-help"
            maxWidth="max-w-md"
          />

          <Reveal delay={0.2} className="mt-9">
            <div className="flex flex-col gap-4 rounded-card border border-primary/15 bg-primary/6 p-6">
              <span className="grid size-11 place-items-center rounded-[0.85rem] bg-primary text-white">
                <Icon name="message-circle" size={20} />
              </span>
              <div>
                <p className="font-heading text-[0.9375rem] font-bold text-heading">Still have a question?</p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-body">
                  Message us directly — a real strategist replies, not a bot.
                </p>
              </div>
              <div className="flex flex-col gap-1.5 text-[0.875rem] font-semibold">
                <a href={`mailto:${site.contactInfo.email}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Icon name="mail" size={15} />
                  {site.contactInfo.email}
                </a>
                <a href={`tel:${site.contactInfo.phoneLink}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Icon name="phone" size={15} />
                  {site.contactInfo.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Accordion items={data.items} />
      </div>
    </Section>
  );
}
