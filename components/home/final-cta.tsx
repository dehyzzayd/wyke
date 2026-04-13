'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="border-t border-[#EFEEEA] bg-[#FBFBF9] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-[28px] sm:text-[44px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900"
        >
          The next person to leave already has a twin.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-[15.5px] text-ink-500"
        >
          Start extracting before you need to. Free for your first expert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-9"
        >
          <Link
            href="/auth?tab=signup"
            className="inline-flex items-center justify-center rounded-full bg-ink-900 px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-black hover:scale-[1.03]"
          >
            Start your first session
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
