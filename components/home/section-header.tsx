'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  subtitle?: string;
  invert?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  titleTop,
  titleAccent,
  subtitle,
  invert = false,
  className,
}: Props) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={cn(
          'mt-5 font-serif text-[36px] leading-[1.05] tracking-tight sm:text-[44px] lg:text-[52px]',
          invert ? 'text-white' : 'text-ink-900'
        )}
      >
        <span className="block">{titleTop}</span>
        <span className="block text-brand-600">{titleAccent}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'mt-6 text-[17px] leading-[1.7]',
            invert ? 'text-ink-300' : 'text-ink-400'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
