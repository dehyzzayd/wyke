'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  ChevronsUpDown,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useMobileMenu } from './mobile-menu';

type NavItem = { href: string; label: string; Icon: LucideIcon };

const main: NavItem[] = [
  { href: '/dashboard', label: 'Overview', Icon: LayoutDashboard },
  { href: '/dashboard/experts', label: 'Experts', Icon: Users },
  { href: '/dashboard/sessions', label: 'Sessions', Icon: MessageSquare },
  { href: '/dashboard/insights', label: 'Insights', Icon: Sparkles },
  { href: '/dashboard/query', label: 'Query Twin', Icon: Search },
  { href: '/dashboard/analytics', label: 'Analytics', Icon: BarChart3 },
];

const prefs: NavItem[] = [
  { href: '/dashboard/settings', label: 'Settings', Icon: Settings },
  { href: '#', label: 'Help Center', Icon: HelpCircle },
];

function NavList({
  items,
  label,
  pathname,
}: {
  items: NavItem[];
  label: string;
  pathname: string;
}) {
  return (
    <>
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300">
        {label}
      </p>
      <ul className="mt-2 space-y-0.5">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/dashboard' &&
              item.href !== '#' &&
              pathname.startsWith(item.href));
          return (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors',
                  active
                    ? 'bg-ink-900 text-white font-medium'
                    : 'text-ink-500 hover:bg-[#F4F4F1] hover:text-ink-900'
                )}
              >
                <item.Icon
                  size={15}
                  strokeWidth={1.75}
                  className={
                    active
                      ? 'text-white'
                      : 'text-ink-400 group-hover:text-ink-900'
                  }
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function SidebarBody({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex h-14 items-center justify-between px-5">
        <Logo size="sm" />
        {onClose && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-[#F4F4F1] hover:text-ink-900 lg:hidden"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        )}
      </div>

      <div className="mx-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-[#E6E5E0] bg-[#FBFBF9] p-2.5 text-left transition-colors hover:border-ink-200"
        >
          <Avatar name="Zayd K" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-ink-900">
              Zayd K
            </p>
            <p className="truncate text-[10.5px] text-ink-400">
              Personal workspace
            </p>
          </div>
          <ChevronsUpDown size={13} className="text-ink-300" />
        </button>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-3">
        <NavList items={main} label="Main menu" pathname={pathname} />
        <div className="mt-6">
          <NavList items={prefs} label="Preference" pathname={pathname} />
        </div>
      </nav>

      <div className="m-3 overflow-hidden rounded-xl bg-ink-900 p-4 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-white/80" />
          <p className="text-[12px] font-semibold">Upgrade to Scale</p>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-white/65">
          Unlock 15 expert profiles, API access and team analytics.
        </p>
        <Link
          href="#"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-white py-1.5 text-[12px] font-semibold text-ink-900 hover:bg-white/95"
        >
          Upgrade plan
        </Link>
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { open, close } = useMobileMenu();

  return (
    <>
      {/* Desktop — always visible at lg+ */}
      <aside className="fixed inset-y-3 left-3 z-30 hidden w-60 flex-col rounded-2xl border border-[#E6E5E0] bg-white lg:flex lg:inset-y-4 lg:left-4">
        <SidebarBody pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-[1px] lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-110%' }}
              animate={{ x: 0 }}
              exit={{ x: '-110%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="fixed inset-y-3 left-3 z-50 flex w-60 flex-col rounded-2xl border border-[#E6E5E0] bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] lg:hidden"
            >
              <SidebarBody pathname={pathname} onClose={close} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
