import { cn, initialsOf, avatarColorFor } from '@/lib/utils';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<Size, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-[13px]',
  lg: 'h-12 w-12 text-[15px]',
  xl: 'h-16 w-16 text-[18px]',
};

export function Avatar({
  name,
  size = 'md',
  className,
  toneOverride,
}: {
  name: string;
  size?: Size;
  className?: string;
  toneOverride?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-tight',
        sizes[size],
        toneOverride ?? avatarColorFor(name),
        className
      )}
      aria-hidden
    >
      {initialsOf(name)}
    </span>
  );
}
