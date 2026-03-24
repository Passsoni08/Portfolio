import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../../styles/loader.css';

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
    <div ref={loaderRef} className="loader" role="status" aria-label="Loading portfolio">
      <div ref={nameRef} className="loader__name">Rafael Passoni</div>
      <div ref={subtitleRef} className="loader__subtitle">Software Developer</div>
    </div>
  );
}
