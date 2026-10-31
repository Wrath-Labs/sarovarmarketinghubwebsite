'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { motionConfig } from '@/lib/content';

/* ------------------------------------------------------------------
   One animated illustration per service id (content/services.json).
   Every scene is a plain SVG on a 480x360 canvas. Entrance animations are
   driven by variants from the root <svg>; loops play only while the card is
   on screen and switch off under reduced-motion.
------------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;
const fb: CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' };
const fbBottom: CSSProperties = { transformBox: 'fill-box', transformOrigin: '50% 100%' };
const fbLeft: CSSProperties = { transformBox: 'fill-box', transformOrigin: '0% 50%' };

const pop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { delay, type: 'spring', stiffness: 260, damping: 18 } },
});
const rise = (delay = 0, y = 18): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease } },
});
const slide = (delay = 0, x = -30): Variants => ({
  hidden: { opacity: 0, x },
  show: { opacity: 1, x: 0, transition: { delay, duration: 0.6, ease } },
});
const draw = (delay = 0, duration = 1.1): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { delay, duration, ease: 'easeInOut' } },
});
const grow = (delay = 0): Variants => ({
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { delay, duration: 0.7, ease } },
});
const fade = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay, duration: 0.5 } },
});

type SceneProps = { play: boolean };
const W = '#fff';

/* ---------- 1. Organic content: a plant growing while hearts float up ---------- */
function Organic({ play }: SceneProps) {
  return (
    <>
      <motion.ellipse variants={fade(0)} cx="240" cy="304" rx="120" ry="14" fill={W} fillOpacity="0.14" />
      <motion.path variants={draw(0.1, 1.2)} d="M240 304 C240 262 232 232 240 190" stroke={W} strokeWidth="6" strokeLinecap="round" fill="none" />
      <motion.path variants={pop(0.7)} style={{ ...fb, transformOrigin: '100% 100%' }} d="M240 258 C200 258 186 228 196 208 C228 208 242 230 240 258Z" fill={W} fillOpacity="0.9" />
      <motion.path variants={pop(0.95)} style={{ ...fb, transformOrigin: '0% 100%' }} d="M240 230 C282 230 296 200 286 180 C254 180 240 202 240 230Z" fill={W} fillOpacity="0.75" />
      <motion.circle variants={pop(1.2)} style={fb} cx="240" cy="176" r="20" fill={W} />
      <motion.g animate={play ? { scale: [1, 1.12, 1] } : undefined} transition={{ duration: 2.4, repeat: Infinity }} style={fb}>
        <circle cx="240" cy="176" r="9" fill="var(--c-primary)" fillOpacity="0.85" />
      </motion.g>

      {/* post card */}
      <motion.g variants={slide(0.5, -40)}>
        <rect x="46" y="96" width="118" height="146" rx="14" fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.3" />
        <rect x="58" y="108" width="94" height="64" rx="9" fill={W} fillOpacity="0.28" />
        <rect x="58" y="184" width="70" height="8" rx="4" fill={W} fillOpacity="0.55" />
        <rect x="58" y="200" width="48" height="8" rx="4" fill={W} fillOpacity="0.3" />
        <circle cx="70" cy="226" r="6" fill={W} fillOpacity="0.7" />
      </motion.g>
      {/* comment bubble */}
      <motion.g variants={slide(0.7, 40)}>
        <path d="M322 108 h96 a12 12 0 0 1 12 12 v44 a12 12 0 0 1 -12 12 h-60 l-20 18 v-18 h-16 a12 12 0 0 1 -12 -12 v-44 a12 12 0 0 1 12 -12Z" fill={W} fillOpacity="0.16" stroke={W} strokeOpacity="0.3" />
        <rect x="334" y="124" width="70" height="8" rx="4" fill={W} fillOpacity="0.6" />
        <rect x="334" y="142" width="46" height="8" rx="4" fill={W} fillOpacity="0.35" />
      </motion.g>

      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d="M0 -5 C-8 -14 -20 -2 0 12 C20 -2 8 -14 0 -5Z"
          fill={W}
          style={{ x: 150 + i * 90, y: 200 }}
          animate={play ? { y: [200, 90], opacity: [0, 1, 0], scale: [0.6, 1, 0.8] } : { opacity: 0 }}
          transition={{ duration: 3.2, delay: i * 1.05, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

/* ---------- 2. Social media management: a content calendar being filled ---------- */
const CAL_SCHEDULED = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26];
function Calendar({ play }: SceneProps) {
  const cell = (i: number) => ({ x: 62 + (i % 7) * 55, y: 124 + Math.floor(i / 7) * 48 });
  const path = CAL_SCHEDULED.map((i) => cell(i));
  return (
    <>
      <motion.rect variants={rise(0, -10)} x="48" y="46" width="384" height="48" rx="14" fill={W} fillOpacity="0.16" stroke={W} strokeOpacity="0.28" />
      <motion.rect variants={fade(0.2)} x="66" y="62" width="90" height="10" rx="5" fill={W} fillOpacity="0.8" />
      <motion.rect variants={fade(0.25)} x="66" y="78" width="56" height="6" rx="3" fill={W} fillOpacity="0.4" />
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <motion.text key={i} variants={fade(0.3)} x={86 + i * 55} y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill={W} fillOpacity="0.7">
          {d}
        </motion.text>
      ))}
      {Array.from({ length: 28 }).map((_, i) => {
        const { x, y } = cell(i);
        const on = CAL_SCHEDULED.includes(i);
        return (
          <motion.g key={i} variants={pop(0.15 + i * 0.025)} style={fb}>
            <rect x={x} y={y} width="48" height="40" rx="9" fill={W} fillOpacity={on ? 0.9 : 0.1} />
            {on && <rect x={x + 10} y={y + 14} width="28" height="6" rx="3" fill="var(--c-primary)" fillOpacity="0.8" />}
            {on && <rect x={x + 10} y={y + 25} width="16" height="5" rx="2.5" fill="var(--c-primary)" fillOpacity="0.4" />}
          </motion.g>
        );
      })}
      {/* "now" marker hopping across scheduled posts */}
      <motion.rect
        width="54" height="46" rx="12" fill="none" stroke={W} strokeWidth="3"
        style={{ x: path[0].x - 3, y: path[0].y - 3 }}
        animate={play ? { x: path.map((p) => p.x - 3), y: path.map((p) => p.y - 3) } : { opacity: 0 }}
        transition={{ duration: path.length * 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

/* ---------- 3. Meta ads: audience targeting ---------- */
function Target({ play }: SceneProps) {
  const dots = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return { x: 240 + Math.cos(a) * 150, y: 180 + Math.sin(a) * 120, i };
  });
  return (
    <>
      {[130, 96, 62, 28].map((r, i) => (
        <motion.circle key={r} variants={pop(0.1 + i * 0.12)} style={fb} cx="240" cy="180" r={r} fill={i === 3 ? W : 'none'} fillOpacity="0.95" stroke={W} strokeOpacity={0.55 - i * 0.08} strokeWidth="3" />
      ))}
      <motion.circle
        cx="240" cy="180" r="28" fill="none" stroke={W} strokeWidth="2"
        animate={play ? { r: [28, 140], opacity: [0.8, 0] } : { opacity: 0 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
      />
      {dots.map((d) => (
        <motion.circle
          key={d.i} r="6" fill={W} style={{ x: d.x, y: d.y }}
          animate={play ? { x: [d.x, 240 + (d.x - 240) * 0.45], y: [d.y, 180 + (d.y - 180) * 0.45], opacity: [0.9, 0] } : { opacity: 0.5 }}
          transition={{ duration: 2.8, delay: d.i * 0.3, repeat: Infinity, ease: 'easeIn' }}
        />
      ))}
      {/* dart */}
      <motion.g variants={{ hidden: { opacity: 0, x: 90, y: -70 }, show: { opacity: 1, x: 0, y: 0, transition: { delay: 0.8, duration: 0.55, ease } } }}>
        <line x1="240" y1="180" x2="332" y2="104" stroke={W} strokeWidth="5" strokeLinecap="round" />
        <path d="M332 104 l22 -6 l-6 22 Z" fill={W} />
        <path d="M352 100 l14 -14 M346 114 l14 -14" stroke={W} strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </>
  );
}

/* ---------- 4. Google ads: sponsored result at the top of search ---------- */
function SearchAds({ play }: SceneProps) {
  return (
    <>
      <motion.rect variants={rise(0, -14)} x="56" y="40" width="368" height="50" rx="25" fill={W} fillOpacity="0.95" />
      <motion.circle variants={fade(0.3)} cx="86" cy="65" r="10" fill="none" stroke="var(--c-primary)" strokeWidth="3" />
      <motion.line variants={fade(0.3)} x1="94" y1="73" x2="102" y2="81" stroke="var(--c-primary)" strokeWidth="3" strokeLinecap="round" />
      <motion.rect variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.5, duration: 1.1, ease: 'easeOut' } } }} style={fbLeft} x="116" y="59" width="160" height="12" rx="6" fill="var(--c-primary)" fillOpacity="0.55" />
      <motion.rect x="282" y="57" width="3" height="16" rx="1.5" fill="var(--c-primary)" animate={play ? { opacity: [1, 0, 1] } : undefined} transition={{ duration: 1, repeat: Infinity }} />

      {/* sponsored result */}
      <motion.g variants={slide(1.1, -50)}>
        <rect x="56" y="112" width="368" height="86" rx="16" fill={W} fillOpacity="0.95" />
        <rect x="74" y="126" width="38" height="18" rx="5" fill="var(--c-primary)" />
        <text x="93" y="139" textAnchor="middle" fontSize="11" fontWeight="800" fill={W}>Ad</text>
        <rect x="122" y="130" width="150" height="10" rx="5" fill="var(--c-primary)" fillOpacity="0.7" />
        <rect x="74" y="156" width="300" height="8" rx="4" fill="var(--c-heading)" fillOpacity="0.28" />
        <rect x="74" y="172" width="220" height="8" rx="4" fill="var(--c-heading)" fillOpacity="0.18" />
        <motion.rect x="56" y="112" width="368" height="86" rx="16" fill="none" stroke={W} strokeWidth="3" animate={play ? { opacity: [0, 1, 0], scale: [1, 1.03, 1.06] } : { opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity }} style={fb} />
      </motion.g>
      {[0, 1].map((i) => (
        <motion.g key={i} variants={slide(1.3 + i * 0.15, 50)}>
          <rect x="56" y={216 + i * 58} width="368" height="46" rx="14" fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.25" />
          <rect x="74" y={230 + i * 58} width="130" height="8" rx="4" fill={W} fillOpacity="0.6" />
          <rect x="74" y={246 + i * 58} width="220" height="7" rx="3.5" fill={W} fillOpacity="0.32" />
        </motion.g>
      ))}
    </>
  );
}

/* ---------- 5. YouTube ads: video player with a skippable ad ---------- */
function Video({ play }: SceneProps) {
  return (
    <>
      <motion.rect variants={pop(0)} style={fb} x="64" y="50" width="352" height="214" rx="20" fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.35" strokeWidth="2" />
      <motion.circle
        cx="240" cy="148" r="38" fill="none" stroke={W} strokeWidth="2"
        animate={play ? { r: [38, 74], opacity: [0.7, 0] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.circle variants={pop(0.3)} style={fb} cx="240" cy="148" r="38" fill={W} />
      <motion.path variants={pop(0.5)} style={fb} d="M230 130 L230 166 L260 148 Z" fill="var(--c-primary)" />
      <motion.g variants={slide(1, 40)}>
        <rect x="318" y="214" width="84" height="32" rx="16" fill="#0000" stroke={W} strokeOpacity="0.9" strokeWidth="2" />
        <text x="352" y="235" textAnchor="middle" fontSize="13" fontWeight="800" fill={W}>Skip</text>
        <path d="M382 224 l8 6 -8 6" stroke={W} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <motion.g variants={fade(0.7)}>
        <rect x="82" y="66" width="40" height="22" rx="7" fill={W} />
        <text x="102" y="82" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--c-primary)">Ad</text>
      </motion.g>
      <rect x="64" y="292" width="352" height="9" rx="4.5" fill={W} fillOpacity="0.2" />
      <motion.rect
        x="64" y="292" width="352" height="9" rx="4.5" fill={W} style={fbLeft}
        initial={{ scaleX: 0 }}
        animate={play ? { scaleX: [0, 1] } : { scaleX: 0.55 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

/* ---------- 6. Content shooting & editing: viewfinder + timeline ---------- */
function Shoot({ play }: SceneProps) {
  const clips = [
    { y: 232, x: 70, w: 110, o: 0.9 }, { y: 232, x: 188, w: 70, o: 0.55 }, { y: 232, x: 266, w: 140, o: 0.75 },
    { y: 268, x: 70, w: 60, o: 0.5 }, { y: 268, x: 138, w: 150, o: 0.85 }, { y: 268, x: 296, w: 110, o: 0.6 },
  ];
  return (
    <>
      <motion.rect variants={fade(0)} x="78" y="38" width="324" height="164" rx="14" fill={W} fillOpacity="0.1" />
      {['M96 74 V56 H114', 'M384 74 V56 H366', 'M96 166 V184 H114', 'M384 166 V184 H366'].map((d, i) => (
        <motion.path key={i} variants={draw(0.1 + i * 0.08, 0.6)} d={d} stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      <motion.circle cx="116" cy="82" r="7" fill="#fff" animate={play ? { opacity: [1, 0.15, 1] } : undefined} transition={{ duration: 1.2, repeat: Infinity }} />
      <motion.text variants={fade(0.4)} x="130" y="87" fontSize="14" fontWeight="800" fill={W} fillOpacity="0.9">REC</motion.text>
      <motion.g variants={pop(0.5)} style={fb}>
        <circle cx="240" cy="120" r="30" fill={W} fillOpacity="0.9" />
        <path d="M229 105 v30 l26 -15 z" fill="var(--c-primary)" />
      </motion.g>
      {clips.map((c, i) => (
        <motion.rect key={i} variants={slide(0.5 + i * 0.12, -60)} x={c.x} y={c.y} width={c.w} height="26" rx="8" fill={W} fillOpacity={c.o * 0.9} />
      ))}
      <motion.line
        x1="0" x2="0" y1="218" y2="304" stroke={W} strokeWidth="3" strokeLinecap="round"
        style={{ x: 70 }}
        animate={play ? { x: [70, 404] } : { x: 200 }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

/* ---------- 7. Influencer marketing: a creator connecting to an audience ---------- */
function Influencer({ play }: SceneProps) {
  const sats = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
    return { x: 240 + Math.cos(a) * 128, y: 180 + Math.sin(a) * 118, i };
  });
  return (
    <>
      {[44, 44].map((r, i) => (
        <motion.circle
          key={i} cx="240" cy="180" r={r} fill="none" stroke={W} strokeWidth="2"
          animate={play ? { r: [44, 150], opacity: [0.7, 0] } : { opacity: 0 }}
          transition={{ duration: 3, delay: i * 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      {sats.map((s) => (
        <motion.line key={`l${s.i}`} variants={draw(0.3 + s.i * 0.1, 0.6)} x1="240" y1="180" x2={s.x} y2={s.y} stroke={W} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="4 6" />
      ))}
      {sats.map((s) => (
        <motion.g key={s.i} variants={pop(0.5 + s.i * 0.1)} style={fb}>
          <motion.g animate={play ? { y: [0, s.i % 2 ? 6 : -6, 0] } : undefined} transition={{ duration: 3 + s.i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
            <circle cx={s.x} cy={s.y} r="24" fill={W} fillOpacity="0.18" stroke={W} strokeOpacity="0.5" strokeWidth="2" />
            <circle cx={s.x} cy={s.y - 5} r="7" fill={W} fillOpacity="0.85" />
            <path d={`M${s.x - 12} ${s.y + 14} a12 10 0 0 1 24 0Z`} fill={W} fillOpacity="0.85" />
          </motion.g>
        </motion.g>
      ))}
      <motion.g variants={pop(0.1)} style={fb}>
        <circle cx="240" cy="180" r="44" fill={W} />
        <circle cx="240" cy="168" r="14" fill="var(--c-primary)" />
        <path d="M214 204 a26 20 0 0 1 52 0Z" fill="var(--c-primary)" />
      </motion.g>
      {/* megaphone-style heart burst */}
      <motion.path
        d="M0 -5 C-8 -14 -20 -2 0 12 C20 -2 8 -14 0 -5Z" fill={W}
        style={{ x: 286, y: 138 }}
        animate={play ? { scale: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </>
  );
}

/* ---------- 8. Web & app development: browser + phone being built ---------- */
function WebApp({ play }: SceneProps) {
  return (
    <>
      <motion.g variants={rise(0, 24)}>
        <rect x="36" y="48" width="296" height="244" rx="16" fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.35" strokeWidth="2" />
        <path d="M36 82 h296" stroke={W} strokeOpacity="0.3" strokeWidth="2" />
        {[0, 1, 2].map((i) => <circle key={i} cx={56 + i * 16} cy="65" r="4.5" fill={W} fillOpacity={0.8 - i * 0.2} />)}
        <rect x="128" y="57" width="150" height="16" rx="8" fill={W} fillOpacity="0.2" />
      </motion.g>
      <motion.rect variants={slide(0.5, -30)} x="54" y="98" width="260" height="20" rx="6" fill={W} fillOpacity="0.85" />
      <motion.rect variants={slide(0.65, -30)} x="54" y="128" width="164" height="56" rx="10" fill={W} fillOpacity="0.3" />
      <motion.rect variants={slide(0.75, -30)} x="226" y="128" width="88" height="56" rx="10" fill={W} fillOpacity="0.5" />
      {[0, 1, 2].map((i) => (
        <motion.rect key={i} variants={rise(0.9 + i * 0.15, 22)} x={54 + i * 90} y="198" width="80" height="76" rx="10" fill={W} fillOpacity={0.25 + i * 0.12} />
      ))}
      <motion.rect x="72" y="104" width="3" height="8" fill="var(--c-primary)" animate={play ? { opacity: [1, 0, 1] } : { opacity: 0 }} transition={{ duration: 1, repeat: Infinity }} />

      <motion.g variants={rise(0.6, 36)}>
        <motion.g animate={play ? { y: [0, -8, 0] } : undefined} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="352" y="84" width="96" height="190" rx="20" fill={W} fillOpacity="0.2" stroke={W} strokeOpacity="0.6" strokeWidth="2.5" />
          <rect x="386" y="94" width="28" height="6" rx="3" fill={W} fillOpacity="0.6" />
          <rect x="364" y="116" width="72" height="44" rx="9" fill={W} fillOpacity="0.85" />
          <rect x="364" y="170" width="72" height="9" rx="4.5" fill={W} fillOpacity="0.5" />
          <rect x="364" y="187" width="50" height="9" rx="4.5" fill={W} fillOpacity="0.3" />
          <rect x="364" y="222" width="72" height="30" rx="15" fill={W} />
        </motion.g>
      </motion.g>
    </>
  );
}

/* ---------- 9. SEO: a result climbing to #1 ---------- */
function Seo({ play }: SceneProps) {
  const slot = (s: number) => 66 + s * 66;
  const rows = [
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0, hero: true },
  ];
  return (
    <>
      {rows.map((r, i) => (
        <motion.g key={i} variants={slide(0.15 + i * 0.12, -40)}>
          <motion.g
            style={{ y: slot(r.from) }}
            animate={play ? { y: [slot(r.from), slot(r.from), slot(r.to), slot(r.to)] } : { y: slot(r.hero ? 0 : r.from) }}
            transition={{ duration: 5.5, times: [0, 0.3, 0.55, 1], repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut', repeatType: 'loop' }}
          >
            <rect x="58" y="0" width="300" height="54" rx="14" fill={W} fillOpacity={r.hero ? 0.95 : 0.14} stroke={W} strokeOpacity={r.hero ? 0 : 0.3} />
            <rect x="76" y="14" width={r.hero ? 130 : 100} height="9" rx="4.5" fill={r.hero ? 'var(--c-primary)' : W} fillOpacity={r.hero ? 0.75 : 0.6} />
            <rect x="76" y="32" width={r.hero ? 220 : 180} height="7" rx="3.5" fill={r.hero ? 'var(--c-heading)' : W} fillOpacity={r.hero ? 0.25 : 0.3} />
          </motion.g>
        </motion.g>
      ))}
      <motion.g
        animate={play ? { opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] } : { opacity: 0 }}
        transition={{ duration: 5.5, times: [0, 0.45, 0.6, 1], repeat: Infinity, repeatDelay: 0.8 }}
        style={fb}
      >
        <rect x="372" y="72" width="62" height="38" rx="19" fill={W} />
        <text x="403" y="97" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--c-primary)">#1</text>
      </motion.g>
      <motion.g variants={pop(0.8)} style={fb}>
        <motion.g animate={play ? { rotate: [0, -10, 8, 0] } : undefined} transition={{ duration: 4, repeat: Infinity }} style={fb}>
          <circle cx="396" cy="236" r="30" fill="none" stroke={W} strokeWidth="9" />
          <line x1="418" y1="258" x2="440" y2="282" stroke={W} strokeWidth="10" strokeLinecap="round" />
        </motion.g>
      </motion.g>
    </>
  );
}

/* ---------- 10. Performance marketing: funnel in, results out ---------- */
function Funnel({ play }: SceneProps) {
  return (
    <>
      <motion.path variants={rise(0, -20)} d="M50 56 H290 L246 160 H94 Z" fill={W} fillOpacity="0.2" stroke={W} strokeOpacity="0.5" strokeWidth="2" strokeLinejoin="round" />
      <motion.path variants={rise(0.15, -20)} d="M100 172 H240 L214 240 H126 Z" fill={W} fillOpacity="0.38" stroke={W} strokeOpacity="0.6" strokeWidth="2" strokeLinejoin="round" />
      <motion.path variants={rise(0.3, -20)} d="M132 252 H208 L196 304 H144 Z" fill={W} fillOpacity="0.9" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i} r="6" fill={W} cx={96 + i * 36} cy="40"
          animate={play ? { cy: [40, 150, 230, 296], cx: [96 + i * 36, 140 + i * 18, 160 + i * 5, 170], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 3.6, delay: i * 0.7, repeat: Infinity, ease: 'easeIn' }}
        />
      ))}
      {/* results chart */}
      {[60, 96, 132, 178].map((h, i) => (
        <motion.rect key={i} variants={grow(0.7 + i * 0.12)} style={fbBottom} x={326 + i * 34} y={300 - h} width="24" height={h} rx="7" fill={W} fillOpacity={0.35 + i * 0.2} />
      ))}
      <motion.path variants={draw(1.2, 1)} d="M330 220 L372 190 L408 170 L446 106" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <motion.path variants={pop(2)} style={fb} d="M446 106 l-16 4 m16 -4 l2 16" stroke={W} strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  );
}

const scenes: Record<string, (p: SceneProps) => ReactNode> = {
  'organic-content-smm': Organic,
  'social-media-management': Calendar,
  'meta-ads': Target,
  'google-ads': SearchAds,
  'youtube-ads': Video,
  'content-shooting-editing': Shoot,
  'influencer-marketing': Influencer,
  'web-app-development': WebApp,
  seo: Seo,
  'performance-marketing': Funnel,
};

export default function ServiceVisual({ id, icon, title }: { id: string; icon?: string; title: string }) {
  const Scene = scenes[id];
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animate = motionConfig.enabled && !reduced;
  const inView = useInView(ref, { amount: 0.35, margin: '0px 0px -40px 0px' });
  const play = animate && inView;
  if (!Scene) return null;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${title} illustration`}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-linear-155 from-primary via-primary to-primary-dark shadow-[0_28px_60px_-26px_var(--c-primary-dark)]"
    >
      {/* soft backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(255_255_255/0.22),transparent_50%),radial-gradient(circle_at_90%_95%,color-mix(in_oklab,var(--c-accent)_55%,transparent),transparent_55%)]" />
      <svg aria-hidden viewBox="0 0 480 360" className="absolute inset-0 size-full opacity-[0.07]">
        {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 40} x2={i * 40} y1="0" y2="360" stroke="#fff" />)}
        {Array.from({ length: 10 }).map((_, i) => <line key={`h${i}`} y1={i * 40} y2={i * 40} x1="0" x2="480" stroke="#fff" />)}
      </svg>

      <motion.svg
        aria-hidden
        viewBox="0 0 480 360"
        className="absolute inset-0 size-full"
        initial={animate ? 'hidden' : 'show'}
        animate={animate ? (inView ? 'show' : undefined) : 'show'}
      >
        <Scene play={play} />
      </motion.svg>

      {icon && (
        <motion.span
          aria-hidden
          animate={play ? { y: [0, -5, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 left-4 grid size-11 place-items-center rounded-[0.9rem] bg-white/90 text-primary shadow-card"
        >
          <Icon name={icon} size={20} />
        </motion.span>
      )}
    </div>
  );
}
