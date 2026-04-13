'use client';

import { motion } from 'framer-motion';
import { Brain, MessageSquare, Search, type LucideIcon } from 'lucide-react';
import { SectionHeader } from './section-header';

type Step = {
  n: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    n: '01',
    Icon: MessageSquare,
    title: 'Socratic Interview',
    body:
      "Our AI conducts a structured, probing conversation with your expert — not a form, not a survey. A real dialogue that surfaces the reasoning behind every decision they've ever made.",
  },
  {
    n: '02',
    Icon: Brain,
    title: 'Pattern Extraction',
    body:
      'DEhy maps the mental models, heuristics, and decision trees beneath the surface-level answers. We capture the why, not just the what.',
  },
  {
    n: '03',
    Icon: Search,
    title: 'Living Query Layer',
    body:
      "Any team member can ask a question and receive an answer in your expert's reasoning style — not a search result. A judgment call.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The Process"
          titleTop="Three steps to make expertise"
          titleAccent="permanent."
          subtitle="No documentation. No wikis. No friction. Just a conversation that captures everything."
        />

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-surface-100 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <span className="absolute right-8 top-8 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-200">
                {s.n}
              </span>

              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-colors group-hover:bg-brand-100">
                <s.Icon size={26} className="text-brand-600" />
              </span>

              <h3 className="mt-7 text-[20px] font-bold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
