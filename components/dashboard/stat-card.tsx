'use client';

import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/lib/use-count-up';
import { cn, formatNumber } from '@/lib/utils';

type Props = {
  label: string;
  value: number;
  Icon: LucideIcon;
  delta: string;
  deltaTone?: 'up' | 'down' | 'neutral';
  suffix?: string;
};

export function StatCard({
  label,
  value,
  Icon,
  delta,
  deltaTone = 'up',
  suffix = '',
}: Props) {
  const { ref, display } = useCountUp(value);

  const deltaColor =
    deltaTone === 'up'
      ? 'text-[#0F766E]'
      : deltaTone === 'down'
        ? 'text-[#B45309]'
        : 'text-ink-400';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-xl border border-[#EBEAE6] bg-white p-5"
    >
      <div className="flex items-start justify-between">
        <p className="text-[12px] font-medium uppercase tracking-wider text-ink-400">
          {label}
        </p>
        <Icon size={15} strokeWidth={1.75} className="text-ink-300" />
      </div>
      <p className="mt-6 font-sans text-[32px] font-semibold leading-none tracking-[-0.02em] text-ink-900 tabular-nums">
        {formatNumber(display)}
        {suffix}
      </p>
      <p className={cn('mt-3 text-[12px] font-medium', deltaColor)}>{delta}</p>
    </div>
  );
}
