'use client';

import { motion } from 'framer-motion';
import { Code2, Lightbulb, TrendingUp, type LucideIcon } from 'lucide-react';
import { SectionHeader } from './section-header';

type Case = { Icon: LucideIcon; role: string; pain: string };

const cases: Case[] = [
  {
    Icon: Code2,
    role: 'The Founding Engineer',
    pain:
      "She knows why every architectural decision was made. She knows which corners were cut and why. She's thinking about leaving. Her GitHub tells you what. WYKE tells you why.",
  },
  {
    Icon: TrendingUp,
    role: 'The Revenue-Carrying AE',
    pain:
      'He has 6 years of client relationship intelligence in his head. The politics, the champions, the landmines. When he leaves, 3 accounts churn within 90 days.',
  },
  {
    Icon: Lightbulb,
    role: 'The Founding PM',
    pain:
      'She made 400 product decisions based on pattern recognition built over years. The new PM will spend 18 months re-learning what she knew on day one.',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Who screams loudest"
          titleTop="Every company has people"
          titleAccent="they cannot afford to lose."
        />

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-r-2xl border-l-4 border-brand-600 bg-surface-50 p-8 transition-colors hover:bg-white hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                <c.Icon size={22} className="text-brand-600" />
              </span>
              <h3 className="mt-6 font-serif text-[26px] leading-tight text-ink-900">
                {c.role}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink-500">
                {c.pain}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
