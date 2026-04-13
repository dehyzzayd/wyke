'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

type Row = { dimension: string; wiki: string; wyke: string };

const rows: Row[] = [
  {
    dimension: 'Input',
    wiki: 'Months of writing — if anyone remembers.',
    wyke: 'One 90-minute Socratic interview.',
  },
  {
    dimension: 'Output',
    wiki: 'What got written down.',
    wyke: 'How they\u2019d actually decide.',
  },
  {
    dimension: 'Decay',
    wiki: 'Stale the moment it\u2019s shipped.',
    wyke: 'Sharpens every time the expert reviews.',
  },
  {
    dimension: 'Use',
    wiki: 'Search. Skim. Hope. Give up.',
    wyke: 'Ask a question. Get a judgment call.',
  },
  {
    dimension: 'When they leave',
    wiki: 'The docs stay. The reasoning doesn\u2019t.',
    wyke: 'The twin keeps deciding in their style.',
  },
];

export function Comparison() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Eyebrow + headline */}
        <header className="max-w-2xl">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Why not just a wiki
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
            A wiki is a filing cabinet.
            <br />
            A twin is the person.
          </h2>
        </header>

        {/* Comparison */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#EFEEEA]">
          {/* Column headers */}
          <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[#EFEEEA] bg-[#FBFBF9]">
            <div className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Dimension
            </div>
            <div className="px-5 py-4 border-l border-[#EFEEEA]">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink-200/60 text-ink-500">
                  <X size={11} strokeWidth={2.5} />
                </span>
                <span className="text-[13px] font-semibold text-ink-500">
                  Wiki (Notion, Confluence, Mem)
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-[#EFEEEA]">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="text-[13px] font-semibold text-ink-900">
                  WYKE cognitive twin
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div
              key={r.dimension}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[#F1F0EC] last:border-b-0"
            >
              <div className="px-5 py-5 sm:py-6">
                <p className="text-[13.5px] font-semibold text-ink-900">
                  {r.dimension}
                </p>
              </div>
              <div className="border-l border-[#F1F0EC] bg-[#FBFBF9]/50 px-5 py-5 sm:py-6">
                <p className="text-[13.5px] leading-[1.65] text-ink-500 line-through decoration-ink-300/60 decoration-[1.5px]">
                  {r.wiki}
                </p>
              </div>
              <div className="border-l border-[#F1F0EC] px-5 py-5 sm:py-6">
                <p className="text-[13.5px] leading-[1.65] text-ink-900">
                  {r.wyke}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
