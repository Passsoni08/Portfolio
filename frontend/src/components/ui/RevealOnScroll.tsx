import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  start?: string;
  clipPath?: boolean;
}

export default function RevealOnScroll({
  children,
  className = '',
  y = 60,
  x = 0,
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  clipPath = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromProps: gsap.TweenVars = {
      y,
      x,
      opacity: 0,
    };

    if (clipPath) {
      fromProps.clipPath = 'inset(100% 0 0 0)';
    }

    gsap.set(el, fromProps);

    const toProps: gsap.TweenVars = {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    if (clipPath) {
      toProps.clipPath = 'inset(0% 0 0 0)';
    }

    gsap.to(el, toProps);

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [y, x, duration, delay, start, clipPath]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
