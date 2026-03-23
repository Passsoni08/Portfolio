import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean; // true = scroll-triggered, false = animate on mount
  y?: number;
}

export default function SplitText({
  children,
  className = '',
  as: Tag = 'div',
  type = 'words',
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  trigger = true,
  y = 40,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const elements = el.querySelectorAll('.split-item');
    if (elements.length === 0) return;

    gsap.set(elements, { y, opacity: 0 });

    const animationProps = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    };

    if (trigger) {
      gsap.to(elements, {
        ...animationProps,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(elements, animationProps);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [children, duration, stagger, delay, trigger, y]);

  const splitContent = () => {
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="split-item" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}>
          {char}
        </span>
      ));
    }

    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="split-item" style={{ display: 'inline-block', marginRight: '0.3em' }}>
          {word}
        </span>
      ));
    }

    // lines
    return children.split('\n').map((line, i) => (
      <span key={i} className="split-item" style={{ display: 'block' }}>
        {line}
      </span>
    ));
  };

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={{ overflow: 'hidden' }}>
      {splitContent()}
    </Tag>
  );
}
