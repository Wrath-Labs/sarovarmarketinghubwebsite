'use client';

import { motion } from 'framer-motion';
import Icon from './Icon';
import { cn } from '@/lib/utils';

export default function Stars({ rating = 5, size = 16, className }: { rating?: number; size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1 text-amber-400', className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          whileInView={{ opacity: i < rating ? 1 : 0.25, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 320, damping: 18 }}
        >
          <Icon name="star" size={size} className="fill-current" />
        </motion.span>
      ))}
    </div>
  );
}
