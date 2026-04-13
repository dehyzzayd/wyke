'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when scrolling or resizing past mobile
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // When menu is open, force the navbar into "scrolled" visual state
  const opaque = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300',
        opaque
          ? 'border-b border-surface-100 bg-white/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6">
        <Logo variant={opaque ? 'light' : 'dark'} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-[13.5px] font-medium transition-colors',
                opaque
                  ? 'text-ink-500 hover:text-ink-900'
                  : 'text-white/90 hover:text-white'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/auth"
            className={cn(
              'inline-flex items-center px-3 py-2 text-[13.5px] font-medium transition-colors',
              opaque
                ? 'text-ink-500 hover:text-ink-900'
                : 'text-white/90 hover:text-white'
            )}
          >
            Sign in
          </Link>
          <Link
            href="/auth?tab=signup"
            className={cn(
              'inline-flex items-center rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 hover:scale-[1.03]',
              opaque
                ? 'bg-ink-900 text-white hover:bg-black'
                : 'bg-white text-ink-900 hover:bg-white/95'
            )}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            opaque
              ? 'text-ink-900 hover:bg-[#F4F4F1]'
              : 'text-white hover:bg-white/10'
          )}
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute inset-x-0 top-16 border-t border-surface-100 bg-white"
          >
            <nav className="flex flex-col p-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-700 hover:bg-[#F4F4F1] hover:text-ink-900"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 border-t border-surface-100 p-4">
              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#EBEAE6] py-3 text-[14px] font-medium text-ink-900 hover:bg-[#F4F4F1]"
              >
                Sign in
              </Link>
              <Link
                href="/auth?tab=signup"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 py-3 text-[14px] font-semibold text-white hover:bg-black"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
