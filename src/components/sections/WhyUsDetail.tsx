'use client';

import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { whyUsPage } from '@/lib/content';

export default function WhyUsDetail() {
  const { intro, sections = [], closing } = whyUsPage;

  return (
    <>
      <Section tone="page">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-[1.125rem] leading-relaxed text-heading/80 sm:text-[1.25rem]">
            {intro}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-10">
          {sections.map((s: any, i: number) => (
            <Reveal key={s.title} delay={0.04}>
              <article className="flex flex-col gap-5 rounded-card border border-line bg-white p-7 sm:flex-row sm:gap-7 sm:p-9">
                <span className="grid size-14 shrink-0 place-items-center rounded-[1.1rem] bg-linear-135 from-primary to-primary-dark text-white">
                  <Icon name={s.icon} size={25} strokeWidth={1.75} />
                </span>
                <div>
                  <span className="font-heading text-[0.6875rem] font-bold tracking-[0.2em] text-primary/60 uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 text-[clamp(1.4rem,3vw,1.9rem)] leading-tight">{s.title}</h3>
                  {s.paragraphs.map((p: string) => (
                    <p key={p} className="mt-4 text-[1rem] leading-relaxed text-body sm:text-[1.0625rem]">
                      {p}
                    </p>
                  ))}
                  {s.example && (
                    <p className="mt-5 rounded-soft border border-primary/15 bg-primary/6 p-4 text-[0.9375rem] leading-relaxed text-heading/80">
                      <span className="font-bold text-heading">{s.example.label}: </span>
                      {s.example.text}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {closing && (
        <Section tone="dark">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-[1.125rem] leading-relaxed text-white/75 sm:text-[1.25rem]">{closing.promise}</p>
            <h2 className="mt-8 text-[clamp(1.6rem,4vw,2.5rem)] text-white">{closing.tagline}</h2>
            {closing.cta && (
              <div className="mt-9">
                <Button href={closing.cta.href} label={closing.cta.label} icon={closing.cta.icon} variant="light" size="lg" />
              </div>
            )}
          </Reveal>
        </Section>
      )}
    </>
  );
}
