'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `value` over `duration` ms with ease-out cubic.
 * Pauses until the element is on screen.
 */
export function useCountUp(value: number, duration = 1500) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return { ref, display };
}
