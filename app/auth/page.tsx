'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/base-path';

type Tab = 'signin' | 'signup';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().min(2, 'Required'),
  password: z.string().min(8, 'At least 8 characters'),
});

function AuthInner() {
  const params = useSearchParams();
  const initial: Tab = params.get('tab') === 'signup' ? 'signup' : 'signin';
  const [tab, setTab] = useState<Tab>(initial);

  useEffect(() => {
    setTab(params.get('tab') === 'signup' ? 'signup' : 'signin');
  }, [params]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_0.85fr]">
      {/* LEFT — form */}
      <section className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <Link
            href="/"
            className="mb-10 inline-flex text-[20px] font-black uppercase tracking-[-0.02em] leading-none text-ink-900"
            aria-label="WYKE home"
          >
            WYKE
          </Link>

          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
            {tab === 'signin' ? 'Welcome back.' : 'Create your account.'}
          </h1>
          <p className="mt-2 text-[14px] text-ink-500">
            {tab === 'signin'
              ? 'Sign in to query your team’s cognitive twins.'
              : 'Free for your first expert. No credit card required.'}
          </p>

          {/* Segmented tab control */}
          <div
            role="tablist"
            className="mt-7 grid grid-cols-2 rounded-full bg-[#F4F4F1] p-1"
          >
            <SegBtn active={tab === 'signin'} onClick={() => setTab('signin')}>
              Sign In
            </SegBtn>
            <SegBtn active={tab === 'signup'} onClick={() => setTab('signup')}>
              Sign Up
            </SegBtn>
          </div>

          <div className="mt-7">
            {tab === 'signin' ? <SignInForm /> : <SignUpForm />}
          </div>

          {/* OR divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#EBEAE6]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-300">
              Or
            </span>
            <span className="h-px flex-1 bg-[#EBEAE6]" />
          </div>

          <div className="space-y-2.5">
            <SsoButton variant="dark">
              <AppleIcon /> Continue with Apple
            </SsoButton>
            <SsoButton variant="light">
              <GoogleIcon /> Continue with Google
            </SsoButton>
          </div>

          <p className="mt-10 text-center text-[11px] text-ink-300">
            © 2026 WYKE · Unauthorized use is prohibited. See our{' '}
            <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      {/* RIGHT — visual */}
      <aside className="relative hidden overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/hero-sky.jpg')}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink-900/30 via-transparent to-ink-900/10"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-12 xl:p-16 text-white">
          <div /> {/* spacer */}
          <div className="max-w-md">
            <p className="font-sans text-[28px] xl:text-[34px] font-semibold leading-[1.2] tracking-[-0.015em] drop-shadow-[0_2px_24px_rgba(15,23,42,0.25)]">
              The most expensive thing in your company isn’t your
              infrastructure. It’s the knowledge that walks out the door.
            </p>
            <p className="mt-6 text-[13px] text-white/80">
              Join 47 companies preserving institutional knowledge.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function SegBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'rounded-full py-2 text-[13.5px] font-medium transition-all',
        active
          ? 'bg-ink-900 text-white shadow-sm'
          : 'text-ink-500 hover:text-ink-900'
      )}
    >
      {children}
    </button>
  );
}

function SignInForm() {
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 600));
      })}
      className="space-y-3.5"
    >
      <FieldGroup
        Icon={Mail}
        type="email"
        placeholder="Enter your email"
        register={register('email')}
        error={errors.email?.message}
      />

      <FieldGroup
        Icon={Lock}
        type={showPw ? 'text' : 'password'}
        placeholder="Enter your password"
        register={register('password')}
        error={errors.password?.message}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="p-1 text-ink-300 hover:text-ink-700"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 text-[12.5px] text-ink-500">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-[#D4D3CE] text-ink-900 focus:ring-1 focus:ring-ink-900"
          />
          Remember me
        </label>
        <Link
          href="#"
          className="text-[12.5px] font-medium text-ink-700 hover:text-ink-900"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 w-full rounded-full bg-ink-900 py-3 text-[14px] font-semibold text-white transition-all hover:bg-black hover:scale-[1.01] disabled:opacity-60"
      >
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

function SignUpForm() {
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 600));
      })}
      className="space-y-3.5"
    >
      <FieldGroup
        Icon={User}
        type="text"
        placeholder="Full name"
        register={register('fullName')}
        error={errors.fullName?.message}
      />
      <FieldGroup
        Icon={Mail}
        type="email"
        placeholder="Work email"
        register={register('email')}
        error={errors.email?.message}
      />
      <FieldGroup
        Icon={Building2}
        type="text"
        placeholder="Company"
        register={register('company')}
        error={errors.company?.message}
      />
      <FieldGroup
        Icon={Lock}
        type={showPw ? 'text' : 'password'}
        placeholder="Choose a password"
        register={register('password')}
        error={errors.password?.message}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="p-1 text-ink-300 hover:text-ink-700"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 w-full rounded-full bg-ink-900 py-3 text-[14px] font-semibold text-white transition-all hover:bg-black hover:scale-[1.01] disabled:opacity-60"
      >
        {isSubmitting ? 'Creating account…' : 'Create Free Account'}
      </button>

      <p className="pt-1 text-center text-[11px] text-ink-300">
        By signing up, you agree to our{' '}
        <Link href="#" className="underline">Terms</Link> and{' '}
        <Link href="#" className="underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function FieldGroup({
  Icon,
  type,
  placeholder,
  register,
  error,
  rightSlot,
}: {
  Icon: React.ElementType;
  type: string;
  placeholder: string;
  register: ReturnType<ReturnType<typeof useForm>['register']>;
  error?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors',
          error
            ? 'border-[#EBD2D2] focus-within:border-[#B91C1C]'
            : 'border-[#EBEAE6] focus-within:border-ink-700 focus-within:ring-2 focus-within:ring-ink-100'
        )}
      >
        <Icon size={15} strokeWidth={1.75} className="text-ink-300" />
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="flex-1 bg-transparent text-[14px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
        />
        {rightSlot}
      </div>
      {error && (
        <p className="mt-1 pl-1 text-[11.5px] text-[#B91C1C]">{error}</p>
      )}
    </div>
  );
}

function SsoButton({
  variant,
  children,
}: {
  variant: 'dark' | 'light';
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex w-full items-center justify-center gap-2.5 rounded-full py-3 text-[13.5px] font-medium transition-colors',
        variant === 'dark'
          ? 'bg-ink-900 text-white hover:bg-black'
          : 'border border-[#EBEAE6] bg-white text-ink-900 hover:bg-[#FBFBF9]'
      )}
    >
      {children}
    </button>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.43 2.27-1.18 3.05-.78.83-2.04 1.46-3.05 1.38-.13-1.1.43-2.25 1.13-3 .8-.85 2.16-1.5 3.1-1.43zM20.5 17.46c-.55 1.27-.81 1.84-1.52 2.97-.99 1.57-2.39 3.53-4.12 3.55-1.54.02-1.94-1-4.04-.99-2.1.01-2.54 1.01-4.08.99-1.74-.02-3.06-1.79-4.05-3.36C-.07 16.11-.4 11.06 1.62 8.27c1.43-1.97 3.69-3.13 5.81-3.13 2.16 0 3.52 1.19 5.31 1.19 1.74 0 2.8-1.19 5.31-1.19 1.9 0 3.91 1.04 5.34 2.83-4.7 2.58-3.94 9.36-2.89 9.49z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40.5 36.4 44 30.7 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthInner />
    </Suspense>
  );
}
