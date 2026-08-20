import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'page' | 'section' | 'dark' | 'gradient';

const tones: Record<Tone, string> = {
  page: 'bg-page',
  section: 'bg-section',
  dark: 'bg-ink text-white',
  gradient: 'bg-linear-135 from-primary via-primary to-primary-dark text-white',
};

export default function Section({
  id,
  tone = 'page',
  className,
  containerClassName,
  children,
  compact,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn('relative isolate overflow-hidden', tones[tone], compact ? 'py-16 sm:py-20' : 'section-y', className)}
    >
      <div className={cn('container-page relative', containerClassName)}>{children}</div>
    </section>
  );
}
