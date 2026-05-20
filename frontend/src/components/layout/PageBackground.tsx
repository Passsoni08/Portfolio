import { useEffect, useRef } from 'react';
import '../../styles/page-bg.css';

export default function PageBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgEl = bgRef.current;
    if (!bgEl) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        bgEl.style.setProperty('--mouse-x-page', `${x}px`);
        bgEl.style.setProperty('--mouse-y-page', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="page-bg" ref={bgRef} aria-hidden="true">
      <div className="page-bg__grid" />
      <div className="page-bg__glow" />
      <div className="page-bg__spotlight" />
    </div>
  );
}
