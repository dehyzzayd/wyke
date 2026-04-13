'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Typewriter } from '@/components/ui/typewriter';
import { asset } from '@/lib/base-path';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      {/* Background image — full bleed, also behind the navbar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset('/hero-sky.jpg')}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_30%] sm:object-center"
      />

      {/* Tonal overlays — soft top wash improves nav contrast,
          stronger left wash gives the white headline grip on the bright sky. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-32 sm:h-40 bg-gradient-to-b from-ink-900/35 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/55 via-ink-900/25 to-ink-900/0 sm:from-ink-900/45 sm:via-ink-900/20 sm:to-transparent"
      />

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-24 pb-16 sm:px-6 sm:pt-28 lg:pt-0 lg:pb-0">
        <div className="max-w-none xl:max-w-5xl">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="font-sans text-[40px] sm:text-[64px] lg:text-[88px] xl:text-[104px] font-black uppercase leading-[0.95] tracking-[-0.025em] text-white drop-shadow-[0_2px_24px_rgba(15,23,42,0.25)]"
          >
            <span className="block">Capture, preserve</span>
            <span className="block">&amp; query every</span>
            <span className="block whitespace-nowrap">
              <Typewriter
                text={[
                  'expert.',
                  'founder.',
                  'engineer.',
                  'operator.',
                  'architect.',
                ]}
                speed={75}
                waitTime={1800}
                deleteSpeed={45}
                cursorChar="_"
                cursorClassName="ml-1 text-white/80"
              />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 sm:mt-8 max-w-xl text-[14.5px] sm:text-[16px] leading-relaxed text-white/85"
          >
            Cognitive twins of your most critical employees — built in 24 hours,
            queried by your team forever.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10"
          >
            <Link
              href="/auth?tab=signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-ink-900 transition-all duration-200 hover:bg-white/95 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Create Your Free Account
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
