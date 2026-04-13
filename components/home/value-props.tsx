'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Workflow,
  Lock,
  type LucideIcon,
} from 'lucide-react';

type Prop = { Icon: LucideIcon; title: string; body: string };

const props: Prop[] = [
  {
    Icon: ShieldCheck,
    title: 'Reliability',
    body: 'Cognitive twins built on extracted reasoning, not summaries you have to trust on faith.',
  },
  {
    Icon: Clock,
    title: 'Speed',
    body: 'A working twin in 24 hours from the first interview. No documentation marathon.',
  },
  {
    Icon: Workflow,
    title: 'Simplicity',
    body: 'One conversation. No wikis to maintain. Anyone on the team can query in plain English.',
  },
  {
    Icon: Lock,
    title: 'Security',
    body: 'SOC 2 Type II. Your data trains your twins, never anyone else’s model.',
  },
];

export function ValueProps() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 px-5 sm:grid-cols-2 sm:gap-y-12 sm:px-6 lg:grid-cols-4">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <p.Icon size={22} strokeWidth={1.6} className="text-ink-900" />
            <h3 className="mt-5 text-[16px] font-semibold text-ink-900">
              {p.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-ink-500">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
