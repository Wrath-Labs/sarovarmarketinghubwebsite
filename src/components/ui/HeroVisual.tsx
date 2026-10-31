'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { motionConfig } from '@/lib/content';

const BARS = [38, 66, 52, 98, 82, 132, 158];
const LINE = 'M28 228 C78 220 96 176 148 186 S226 118 268 128 S338 58 372 38';

/* channels orbiting the dashboard */
const ORBIT = [
  { icon: 'search', angle: 0 },
  { icon: 'instagram', angle: 90 },
  { icon: 'youtube', angle: 180 },
  { icon: 'message-circle', angle: 270 },
];

/* illustrative KPI chips (no figures: this is a picture, not a claim) */
const CHIPS = [
  { title: 'Reach', icon: 'trending-up', cls: '-top-3 -left-2 sm:-left-8 sm:top-6', depth: 22, delay: 1.1 },
  { title: 'Leads', icon: 'users', cls: 'top-[44%] -right-2 sm:-right-10', depth: -26, delay: 1.3 },
  { title: 'ROI', icon: 'target', cls: '-bottom-3 left-6 sm:left-2 sm:bottom-4', depth: 16, delay: 1.5 },
];

const SPARKS = [
  { x: '12%', y: '14%', s: 10, d: 0 },
  { x: '86%', y: '10%', s: 14, d: 0.8 },
  { x: '92%', y: '74%', s: 9, d: 1.5 },
  { x: '6%', y: '78%', s: 12, d: 2.1 },
];

type ChipData = (typeof CHIPS)[number];

function Chip({ chip: c, index: i, animate, mx }: { chip: ChipData; index: number; animate: boolean; mx: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * c.depth * 2);
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.6, y: 20 } : false}
      animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ delay: c.delay, type: 'spring', stiffness: 260, damping: 20 }}
      style={animate ? { x } : undefined}
      className={`absolute z-20 ${c.cls}`}
    >
      <motion.div
        animate={animate ? { y: [0, i % 2 ? 10 : -10, 0] } : undefined}
        transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 rounded-[1.1rem] border border-line bg-page/95 px-3.5 py-2.5 shadow-card backdrop-blur-md"
      >
        <span className="grid size-9 place-items-center rounded-[0.75rem] bg-linear-135 from-primary to-primary-dark text-white">
          <Icon name={c.icon} size={17} />
        </span>
        <span className="flex flex-col gap-1.5 leading-none">
          <span className="font-heading text-[0.9375rem] font-bold text-heading">{c.title}</span>
          <span className="flex h-3 items-end gap-[3px]" aria-hidden>
            {[40, 65, 50, 85, 100].map((h, bi) => (
              <motion.span
                key={bi}
                className="w-[5px] origin-bottom rounded-full bg-primary/70"
                style={{ height: `${h}%` }}
                animate={animate ? { scaleY: [0.4, 1, 0.55, 1] } : undefined}
                transition={{ duration: 2.4, delay: bi * 0.18 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/** Animated marketing-growth scene for the home hero. Pure SVG + transforms, so it is
    light on the GPU; everything freezes into its final pose under reduced-motion. */
export default function HeroVisual() {
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;
  const ref = useRef<HTMLDivElement>(null);

  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const cardX = useTransform(mx, (v) => v * 10);
  const cardY = useTransform(my, (v) => v * 10);
  const tiltY = useTransform(mx, (v) => v * 6);
  const tiltX = useTransform(my, (v) => v * -6);

  const onMove = (e: React.PointerEvent) => {
    if (!animate || e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label="Illustration of a marketing growth dashboard with search, social and video channels"
      className="relative mx-auto aspect-square w-full max-w-lg [perspective:1200px] lg:max-w-none"
    >
      {/* halo */}
      <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-linear-135 from-primary/35 to-accent/25 blur-[70px]" />

      {/* dashed orbit rings */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <motion.circle
          cx="50" cy="50" r="47"
          fill="none" stroke="var(--c-primary)" strokeOpacity="0.28" strokeWidth="0.25" strokeDasharray="1.2 2.2"
          animate={animate ? { rotate: -360 } : undefined}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c-primary)" strokeOpacity="0.12" strokeWidth="0.2" />
      </svg>

      {/* orbiting channel badges */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
      >
        {ORBIT.map((o) => {
          const rad = (o.angle * Math.PI) / 180;
          return (
            <span
              key={o.icon}
              className="absolute -translate-1/2"
              style={{ left: `${50 + 45 * Math.sin(rad)}%`, top: `${50 - 45 * Math.cos(rad)}%` }}
            >
              <motion.span
                animate={animate ? { rotate: -360 } : undefined}
                transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
                className="grid size-11 place-items-center rounded-full border border-line bg-white text-primary shadow-card sm:size-12"
              >
                <Icon name={o.icon} size={19} />
              </motion.span>
            </span>
          );
        })}
      </motion.div>

      {/* dashboard card */}
      <motion.div
        initial={animate ? { opacity: 0, scale: 0.88, y: 30 } : false}
        animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
        transition={{ duration: 1, delay: 0.2, ease }}
        style={animate ? { x: cardX, y: cardY, rotateX: tiltX, rotateY: tiltY } : undefined}
        className="absolute inset-[14%] z-10"
      >
        <motion.div
          animate={animate ? { y: [0, -10, 0] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative size-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-linear-155 from-primary via-primary to-primary-dark shadow-[0_30px_70px_-24px_var(--c-primary-dark)]"
        >
          {/* header */}
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/40" />
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/15" />
            </div>
            <span className="rounded-pill bg-white/15 px-2.5 py-1 text-[0.5625rem] font-bold tracking-[0.14em] text-white/90 uppercase">
              Growth
            </span>
          </div>

          <svg viewBox="0 0 400 300" className="absolute inset-x-0 bottom-0 h-[84%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
            <defs>
              <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--c-accent)" />
                <stop offset="1" stopColor="#fff" />
              </linearGradient>
            </defs>

            {[70, 120, 170, 220, 270].map((y) => (
              <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#fff" strokeOpacity="0.1" strokeDasharray="3 6" />
            ))}

            {BARS.map((h, i) => (
              <motion.rect
                key={i}
                x={34 + i * 50}
                width="26"
                rx="7"
                y={270 - h}
                height={h}
                fill="#fff"
                fillOpacity="0.16"
                style={{ transformOrigin: '50% 100%', transformBox: 'fill-box' }}
                initial={animate ? { scaleY: 0 } : false}
                animate={animate ? { scaleY: [0, 1, 0.82, 1] } : undefined}
                transition={{
                  duration: 5.5,
                  delay: 0.6 + i * 0.1,
                  times: [0, 0.18, 0.6, 1],
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              />
            ))}

            <motion.path
              d={`${LINE} L372 270 L28 270 Z`}
              fill="url(#hv-area)"
              initial={animate ? { opacity: 0 } : false}
              animate={animate ? { opacity: 1 } : undefined}
              transition={{ delay: 1.6, duration: 1 }}
            />
            <motion.path
              d={LINE}
              fill="none"
              stroke="url(#hv-line)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={animate ? { pathLength: 0 } : false}
              animate={animate ? { pathLength: 1 } : undefined}
              transition={{ delay: 0.7, duration: 2, ease: 'easeInOut' }}
            />

            {/* live end point */}
            <motion.circle
              cx="372" cy="38" r="7" fill="#fff"
              initial={animate ? { scale: 0 } : false}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ delay: 2.6, type: 'spring', stiffness: 300, damping: 16 }}
              style={{ transformOrigin: '372px 38px' }}
            />
            {animate && (
              <motion.circle
                cx="372" cy="38" r="7" fill="none" stroke="#fff" strokeWidth="2"
                animate={{ r: [7, 22], opacity: [0.7, 0] }}
                transition={{ delay: 2.8, duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </svg>

          {/* light sweep */}
          {animate && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['0%', '480%'] }}
              transition={{ duration: 2.2, delay: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* floating KPI chips */}
      {CHIPS.map((c, i) => (
        <Chip key={c.title} chip={c} index={i} animate={animate} mx={mx} />
      ))}

      {/* twinkling sparkles */}
      {SPARKS.map((s) => (
        <motion.span
          key={s.x + s.y}
          aria-hidden
          className="absolute z-0 text-primary"
          style={{ left: s.x, top: s.y }}
          animate={animate ? { scale: [0.4, 1, 0.4], rotate: [0, 90, 180], opacity: [0.2, 0.9, 0.2] } : undefined}
          transition={{ duration: 3.4, delay: s.d, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width={s.s * 2} height={s.s * 2} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
