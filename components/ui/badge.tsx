import * as React from 'react';
import { cn } from '@/lib/utils';

type Tone = 'brand' | 'green' | 'amber' | 'red' | 'neutral' | 'purple' | 'ink';

const tones: Record<Tone, string> = {
  ink: 'bg-ink-900 text-white border-transparent',
  brand: 'bg-white text-ink-700 border-[#EBEAE6]',
  green: 'bg-white text-[#0F766E] border-[#D6E5E2]',
  amber: 'bg-white text-[#B45309] border-[#EBE2CD]',
  red: 'bg-white text-[#B91C1C] border-[#EBD2D2]',
  neutral: 'bg-white text-ink-500 border-[#EBEAE6]',
  purple: 'bg-white text-[#6D28D9] border-[#E2DBEC]',
};

export function Badge({
  tone = 'neutral',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium tracking-tight',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
