import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: [
          'var(--font-instrument-serif)',
          'Instrument Serif',
          'Playfair Display',
          'Georgia',
          'serif',
        ],
      },
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        surface: {
          0: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
        },
        ink: {
          900: '#0F172A',
          700: '#1E293B',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(37, 99, 235, 0.15)',
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'typing-dot': 'typingDot 1.2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
    },
  },
  plugins: [],
};

export default config;
