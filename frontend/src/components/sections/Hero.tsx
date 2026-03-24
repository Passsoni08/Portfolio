import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitText from '../ui/SplitText';
import '../../styles/hero.css';

interface HeroProps {
  name?: string;
  jobTitle?: string;
  visible: boolean;
}

export default function Hero({ name = 'Rafael Passoni', jobTitle = 'Software Developer', visible }: HeroProps) {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible) return;

    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        opacity: 0.4,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    const updateTime = () => {
      if (timeRef.current) {
        timeRef.current.textContent = new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        {visible && (
          <>
            <SplitText
              as="h1"
              type="chars"
              stagger={0.04}
              duration={1}
              trigger={false}
              delay={0.2}
              className="hero__title"
            >
              {name.toUpperCase()}
            </SplitText>

            <div className="hero__subtitle">
              <SplitText
                as="p"
                type="words"
                stagger={0.08}
                duration={0.6}
                trigger={false}
                delay={0.8}
              >
                {jobTitle}
              </SplitText>
            </div>
          </>
        )}
      </div>

      <div className="hero__bottom-bar" aria-hidden="true">
        <div>
          <span ref={timeRef}>--:--</span>
          <span className="hero__time-zone">BRT</span>
        </div>

        <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
          <span>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="8" y1="0" x2="8" y2="20" />
            <polyline points="2,14 8,20 14,14" />
          </svg>
        </div>

        <div>Santa Rosa de Viterbo, BR</div>
      </div>
    </section>
  );
}
