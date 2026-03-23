import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import type { Experience as ExperienceType } from '../../types';
import '../../styles/experience.css';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  experiences: ExperienceType[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience({ experiences }: ExperienceProps) {
  const lineRef = useRef<SVGLineElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const timeline = timelineRef.current;
    if (!line || !timeline) return;

    gsap.to(line, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === timeline)
        .forEach((st) => st.kill());
    };
  }, [experiences]);

  return (
    <section className="section container" id="experience">
      <SplitText as="h2" type="words" className="experience__heading">
        Experience
      </SplitText>

      <div className="timeline" ref={timelineRef}>
        <svg className="timeline__line" style={{ width: '2px', height: '100%' }}>
          <line
            className="timeline__line-bg"
            x1="1" y1="0" x2="1" y2="100%"
            strokeWidth="2"
          />
          <line
            ref={lineRef}
            className="timeline__line-progress"
            x1="1" y1="0" x2="1" y2="100%"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {experiences.map((exp, i) => (
          <RevealOnScroll
            key={exp.id}
            x={i % 2 === 0 ? -40 : 40}
            y={0}
            delay={i * 0.1}
          >
            <div className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__date">
                {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
              </div>
              <h3 className="timeline__title">{exp.title}</h3>
              <div className="timeline__company">{exp.company}</div>
              <p className="timeline__description">{exp.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
