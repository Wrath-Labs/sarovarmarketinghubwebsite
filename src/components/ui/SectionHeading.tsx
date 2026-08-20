'use client';

import Reveal from './Reveal';
import Highlight from './Highlight';
import Icon from './Icon';
import { cn } from '@/lib/utils';
import { splitHighlight } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  heading,
  highlight,
  subheading,
  align = 'center',
  tone = 'light',
  icon,
  className,
  headingClassName,
  maxWidth = 'max-w-3xl',
}: {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  subheading?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  icon?: string;
  className?: string;
  headingClassName?: string;
  maxWidth?: string;
}) {
  const parts = splitHighlight(heading, highlight);
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="down" distance={14}>
          <span
            className={cn(
              'mb-5 inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] uppercase',
              dark
                ? 'border-white/20 bg-white/10 text-white/85'
                : 'border-primary/15 bg-primary/8 text-primary',
            )}
          >
            <Icon name={icon || 'sparkle'} size={13} />
            {eyebrow}
          </span>
        </Reveal>
      )}

      {heading && (
        <Reveal delay={0.06}>
          <h2
            className={cn(
              'text-[clamp(1.85rem,4.6vw,3.35rem)] leading-[1.06]',
              dark && 'text-white',
              maxWidth,
              headingClassName,
            )}
          >
            {parts.map((part, i) =>
              part.accent ? (
                <Highlight key={i} tone={tone} delay={0.35}>
                  {part.text}
                </Highlight>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
        </Reveal>
      )}

      {subheading && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              'mt-6 text-[1.0625rem] leading-relaxed sm:text-lg',
              dark ? 'text-white/70' : 'text-body',
              maxWidth,
            )}
          >
            {subheading}
          </p>
        </Reveal>
      )}
    </div>
  );
}
