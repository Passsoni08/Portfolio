import { useTranslation } from 'react-i18next';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import type { Education as EducationType } from '../../types';
import '../../styles/education.css';

interface EducationProps {
  education: EducationType[];
}

function formatDate(dateStr: string | null, presentLabel: string): string {
  if (!dateStr) return presentLabel;
  const [year, month] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Education({ education }: EducationProps) {
  const { t } = useTranslation();

  return (
    <section className="section container" id="education">
      <SplitText as="h2" type="words" className="education__heading">
        {t('education.title')}
      </SplitText>

      <div className="education__grid">
        {education.map((edu, i) => (
          <RevealOnScroll key={edu.id} y={40} delay={i * 0.1}>
            <div className="education__item">
              <div className="education__date">
                {formatDate(edu.start_date, t('education.present'))} — {formatDate(edu.end_date, t('education.present'))}
              </div>
              <h3 className="education__degree">{edu.degree}</h3>
              <div className="education__institution">{edu.institution}</div>
              {edu.field_of_study && (
                <div className="education__field">{edu.field_of_study}</div>
              )}
              {edu.description && (
                <p className="education__description">{edu.description}</p>
              )}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
