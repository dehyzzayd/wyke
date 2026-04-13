import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ink-900 text-white hover:bg-ink-700 hover:-translate-y-px hover:shadow-lg focus-visible:ring-ink-900',
        accent:
          'bg-brand-600 text-white hover:bg-brand-700 hover:scale-[1.02] focus-visible:ring-brand-600',
        ghost:
          'bg-transparent border border-surface-200 text-ink-900 hover:bg-surface-50 focus-visible:ring-ink-900',
        light:
          'bg-white text-ink-900 hover:bg-surface-50 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-white',
        subtle:
          'bg-surface-50 text-ink-900 hover:bg-surface-100 focus-visible:ring-ink-900',
      },
      size: {
        sm: 'rounded-full px-4 py-2 text-sm',
        md: 'rounded-full px-6 py-3 text-sm',
        lg: 'rounded-full px-8 py-4 text-base font-semibold',
        xl: 'rounded-full px-10 py-5 text-base font-semibold',
        icon: 'rounded-xl p-3',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
