import { useTranslation } from 'react-i18next';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import { localize } from '../../lib/localize';
import type { Education as EducationType } from '../../types';
import '../../styles/education.css';

interface EducationProps {
  education: EducationType[];
}

function formatDate(dateStr: string | null, presentLabel: string, locale: string): string {
  if (!dateStr) return presentLabel;
  const [year, month] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1);
  return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
}

export default function Education({ education }: EducationProps) {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';

  return (
    <section className="section container" id="education">
      <SplitText as="h2" type="words" className="education__heading">
        {t('education.title')}
      </SplitText>

      <div className="education__grid">
        {education.map((edu, i) => {
          const degree = localize(edu.degree, i18n.language);
          const fieldOfStudy = localize(edu.field_of_study, i18n.language);
          const description = localize(edu.description, i18n.language);
          return (
            <RevealOnScroll key={edu.id} y={40} delay={i * 0.1}>
              <div className="education__item">
                <div className="education__date">
                  {formatDate(edu.start_date, t('education.present'), dateLocale)} — {formatDate(edu.end_date, t('education.present'), dateLocale)}
                </div>
                <h3 className="education__degree">{degree}</h3>
                <div className="education__institution">{edu.institution}</div>
                {fieldOfStudy && <div className="education__field">{fieldOfStudy}</div>}
                {description && <p className="education__description">{description}</p>}
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
