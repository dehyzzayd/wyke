import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full rounded-2xl border border-surface-200 bg-white px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300',
        'transition-all duration-150',
        'focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-50',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
