import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [shouldShow] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  useEffect(() => {
    if (!shouldShow) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasLoaded', 'true');
        onComplete();
      },
    });

    tl.set(nameRef.current, {
      clipPath: 'inset(0 50% 0 50%)',
    })
      .to(nameRef.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1.2,
        ease: 'expo.out',
      })
      .from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        loaderRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          ease: 'expo.inOut',
        },
        '+=0.3'
      );

    return () => {
      tl.kill();
    };
  }, [shouldShow, onComplete]);

  if (!shouldShow) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loader)' as unknown as number,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      <div
        ref={nameRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          textTransform: 'uppercase',
        }}
      >
        Rafael Passoni
      </div>
      <div
        ref={subtitleRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-small)',
          color: 'var(--color-accent)',
          marginTop: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Software Developer
      </div>
    </div>
  );
}
