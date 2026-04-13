'use client';

import { motion } from 'framer-motion';
import { trustedCompanies } from '@/lib/mock-data';

export function LogoBar() {
  // Duplicate for seamless loop
  const items = [...trustedCompanies, ...trustedCompanies];

  return (
    <section className="border-y border-surface-100 bg-surface-50 py-12">
      <p className="text-center text-[12px] font-medium uppercase tracking-[0.1em] text-ink-300">
        Trusted by teams at
      </p>

      <div className="mt-8 overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {items.map((name, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-sans text-[20px] font-semibold text-[#CBD5E1] tracking-tight">
                {name}
              </span>
              <span className="text-surface-200" aria-hidden>·</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
