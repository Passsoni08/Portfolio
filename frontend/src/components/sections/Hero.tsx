import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitText from '../ui/SplitText';

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

    // Scroll indicator breathing animation
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

    // Live clock
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
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 5vw',
      }}
    >
      {/* Grid decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px),
            linear-gradient(var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {visible && (
          <>
            <SplitText
              as="h1"
              type="chars"
              stagger={0.04}
              duration={1}
              trigger={false}
              delay={0.2}
              className=""
            >
              {name.toUpperCase()}
            </SplitText>

            <div style={{ marginTop: '1.5rem' }}>
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

      {/* Hero H1 style */}
      <style>{`
        section h1 {
          font-size: var(--text-hero);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 0.95;
        }
        section p {
          font-family: var(--font-mono);
          font-size: var(--text-h3);
          color: var(--color-accent);
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '5vw',
          right: '5vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <div>
          <span ref={timeRef}>--:--</span>
          <span style={{ marginLeft: '0.5rem' }}>BRT</span>
        </div>

        <div
          ref={scrollIndicatorRef}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}
        >
          <span>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="8" y1="0" x2="8" y2="20" />
            <polyline points="2,14 8,20 14,14" />
          </svg>
        </div>

        <div>
          Santa Rosa de Viterbo, BR
        </div>
      </div>
    </section>
  );
}
