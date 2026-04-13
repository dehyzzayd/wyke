import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initialsOf(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

export const AVATAR_COLORS = [
  'bg-[#DBEAFE] text-[#1D4ED8]',
  'bg-[#FCE7F3] text-[#BE185D]',
  'bg-[#D1FAE5] text-[#047857]',
  'bg-[#FEF3C7] text-[#B45309]',
  'bg-[#F3E8FF] text-[#6B21A8]',
  'bg-[#FFE4E6] text-[#BE123C]',
  'bg-[#E0F2FE] text-[#075985]',
  'bg-[#ECFCCB] text-[#3F6212]',
];

export function avatarColorFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
