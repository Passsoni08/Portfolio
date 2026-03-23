import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import { useMousePosition } from '../../hooks/useMousePosition';
import type { SkillCategory } from '../../types';
import '../../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  const mouse = useMousePosition();
  const skillNamesRef = useRef<Map<number, HTMLSpanElement>>(new Map());
  const barsRef = useRef<HTMLDivElement>(null);

  // Animate proficiency bars on scroll
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;

    const bars = el.querySelectorAll<HTMLDivElement>('.skills__bar');
    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width') || '0';
      gsap.to(bar, {
        width: `${width}%`,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => el.contains(st.trigger as Element))
        .forEach((st) => st.kill());
    };
  }, [categories]);

  // Mouse proximity font-weight effect
  useEffect(() => {
    skillNamesRef.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY);
      const maxDist = 200;
      const weight = distance < maxDist
        ? Math.round(300 + (400 * (1 - distance / maxDist)))
        : 300;
      el.style.fontWeight = String(weight);
    });
  }, [mouse]);

  return (
    <section className="section container" id="skills" ref={barsRef}>
      <SplitText as="h2" type="words" className="skills__heading">
        Skills
      </SplitText>

      <div className="skills__grid">
        {categories.map((cat, catIdx) => (
          <RevealOnScroll key={cat.id} delay={catIdx * 0.1} clipPath>
            <div className="skills__card">
              <div className="skills__card-title">{cat.name}</div>

              {cat.category_type === 'hard' ? (
                <div className="skills__list">
                  {cat.skills.map((skill) => (
                    <div key={skill.id} className="skills__item">
                      <span
                        className="skills__name"
                        ref={(el) => {
                          if (el) skillNamesRef.current.set(skill.id, el);
                        }}
                      >
                        {skill.name}
                      </span>
                      <div className="skills__bar-container">
                        <div
                          className="skills__bar"
                          data-width={skill.proficiency}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="skills__tags">
                  {cat.skills.map((skill) => (
                    <span key={skill.id} className="skills__tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
