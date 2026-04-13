import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  variant?: 'light' | 'dark';
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 'text-[18px]',
  md: 'text-[22px]',
  lg: 'text-[26px]',
};

export function Logo({
  variant = 'light',
  href = '/',
  className,
  size = 'md',
}: LogoProps) {
  const isDark = variant === 'dark';
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex select-none items-center font-sans font-black uppercase tracking-[-0.02em] leading-none',
        sizes[size],
        isDark ? 'text-white' : 'text-ink-900',
        className
      )}
      aria-label="DEHY home"
    >
      DEHY
    </Link>
  );
}
