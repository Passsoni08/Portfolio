import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import '../../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  bio?: string;
  projectCount: number;
  skillCount: number;
}

export default function About({ bio, projectCount, skillCount }: AboutProps) {
  const { t } = useTranslation();
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const counters = el.querySelectorAll('.about__stat-number');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          counter.textContent = Math.round(obj.val).toString() + '+';
        },
      });
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => el.contains(st.trigger as Element))
        .forEach((st) => st.kill());
    };
  }, [projectCount, skillCount]);

  return (
    <section className="section container" id="about">
      <div className="about">
        <RevealOnScroll clipPath>
          <div className="about__image">
            <img
              src="/profile-photo.jpg"
              alt="Rafael Passoni"
              loading="lazy"
              className="about__photo"
            />
          </div>
        </RevealOnScroll>

        <div className="about__content">
          <SplitText as="h2" type="words">
            {t('about.title')}
          </SplitText>

          <RevealOnScroll delay={0.2}>
            <p className="about__bio">
              {bio || t('about.fallbackBio')}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="about__stats" ref={statsRef}>
              <div>
                <div className="about__stat-number" data-target="1">0+</div>
                <div className="about__stat-label">{t('about.yearsExp')}</div>
              </div>
              <div>
                <div className="about__stat-number" data-target={projectCount}>0+</div>
                <div className="about__stat-label">{t('about.projects')}</div>
              </div>
              <div>
                <div className="about__stat-number" data-target={skillCount}>0+</div>
                <div className="about__stat-label">{t('about.technologies')}</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
