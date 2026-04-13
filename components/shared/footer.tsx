import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './logo';

const cols = [
  {
    title: 'Product',
    items: ['How it works', 'Pricing', 'Integrations', 'API Docs'],
  },
  {
    title: 'Company',
    items: ['About', 'Blog', 'Careers', 'Press'],
  },
  {
    title: 'Legal',
    items: ['Privacy', 'Terms', 'Security', 'Cookie Policy'],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#EFEEEA] bg-white pt-14 pb-10 sm:pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink-500">
              Institutional memory for the modern company.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#EBEAE6] text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
                  aria-label="social link"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-900">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <Link
                      href="#"
                      className="text-[13.5px] text-ink-500 transition-colors hover:text-ink-900"
                    >
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="mt-14 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3 border-t border-[#EFEEEA] pt-7 text-[12.5px] text-ink-400">
          <p>© 2026 WYKE. All rights reserved.</p>
          <p className="md:text-right">
            Built for the companies that move fast and remember everything.
          </p>
        </div>
      </div>
    </footer>
  );
}
