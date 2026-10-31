'use client';

import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import RichText from '@/components/ui/RichText';
import { aboutPage } from '@/lib/content';

export default function AboutDetail() {
  const { intro = [], sections = [], closing } = aboutPage;

  return (
    <>
      <Section tone="page">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 text-center">
          {intro.map((p: string, i: number) => (
            <Reveal key={i} delay={0.04 * i}>
              <p
                className={
                  i === 0
                    ? 'text-[1.125rem] leading-relaxed text-heading/85 sm:text-[1.25rem]'
                    : 'text-[1rem] leading-relaxed text-body sm:text-[1.0625rem]'
                }
              >
                <RichText text={p} />
              </p>
            </Reveal>
          ))}
        </div>

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
                      <RichText text={p} />
                    </p>
                  ))}
                  {s.highlight && (
                    <p className="mt-5 rounded-soft border border-primary/15 bg-primary/6 p-4 text-[0.9375rem] leading-relaxed font-semibold text-heading/85">
                      {s.highlight}
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
            <h2 className="text-[clamp(1.8rem,4.4vw,2.8rem)] text-white">{closing.heading}</h2>
            {closing.paragraphs.map((p: string) => (
              <p key={p} className="mt-5 text-[1.0625rem] leading-relaxed text-white/75 sm:text-[1.125rem]">
                {p}
              </p>
            ))}
            <p className="mt-8 font-heading text-[1rem] font-semibold text-white/90">{closing.tagline}</p>
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
