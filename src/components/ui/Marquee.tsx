'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Infinite horizontal scroller. Duplicates children so the loop is seamless. */
export default function Marquee({
  children,
  speedSeconds = 28,
  reverse = false,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  speedSeconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('marquee-mask group relative flex w-full overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max animate-marquee items-center',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ ['--marquee-duration' as string]: `${speedSeconds}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
