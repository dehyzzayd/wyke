import { cn } from '@/lib/utils';

type Props = {
  value: number; // 0-100
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
};

export function Progress({
  value,
  className,
  trackClassName,
  fillClassName,
}: Props) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn(
        'relative h-1 w-full overflow-hidden rounded-full bg-[#EFEEEA]',
        trackClassName,
        className
      )}
    >
      <div
        className={cn(
          'h-full rounded-full bg-ink-900 transition-[width] duration-700 ease-out',
          fillClassName
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
