'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { contact, site } from '@/lib/content';

export default function ContactSidebar() {
  const data = contact.sidebar;
  if (!data) return null;

  return (
    <aside className="flex min-w-0 flex-col gap-5">
      <h2 className="font-heading text-lg font-bold text-heading">{data.heading}</h2>

      <div className="flex flex-col gap-3">
        {data.cards?.map((card: any, i: number) => (
          <motion.a
            key={card.label}
            href={card.href}
            target={card.href?.startsWith('http') ? '_blank' : undefined}
            rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ x: 4 }}
            className="group flex items-start gap-4 rounded-card border border-line bg-white p-5 transition-all duration-400 hover:border-primary/30 hover:shadow-card"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-[0.85rem] bg-primary/8 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-white">
              <Icon name={card.icon} size={19} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] text-body/70 uppercase">
                {card.label}
              </span>
              <span className="mt-1 font-heading text-[0.9375rem] font-bold break-words text-heading transition-colors group-hover:text-primary">
                {card.value}
              </span>
              {card.note && <span className="mt-0.5 text-[0.75rem] text-body">{card.note}</span>}
            </span>
            <Icon
              name="arrow-up-right"
              size={16}
              className="ml-auto shrink-0 text-body/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </motion.a>
        ))}
      </div>

      {data.responseCard?.enabled && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="relative overflow-hidden rounded-card bg-linear-135 from-primary-dark via-primary to-primary p-6 text-white"
        >
          <div aria-hidden className="absolute -top-14 -right-10 size-40 rounded-full bg-white/12 blur-2xl" />
          <span className="relative grid size-11 place-items-center rounded-[0.85rem] bg-white/15 ring-1 ring-white/25">
            <Icon name={data.responseCard.icon} size={20} />
          </span>
          <h3 className="relative mt-4 font-heading text-[1.0625rem] font-bold text-white">
            {data.responseCard.title}
          </h3>
          <p className="relative mt-2 text-[0.875rem] leading-relaxed text-white/75">{data.responseCard.text}</p>
        </motion.div>
      )}

      <div className="flex flex-col gap-3 rounded-card border border-line bg-section p-5">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-body/70 uppercase">
          {data.socialHeading}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {site.socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3, scale: 1.05 }}
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-heading/65 transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <Icon name={s.icon} size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </aside>
  );
}
