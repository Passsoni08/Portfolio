import { useTranslation } from 'react-i18next';
import { localize } from '../../lib/localize';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const title = localize(project.title, lang);
  const shortDescription = localize(project.short_description, lang);

  const image = project.thumbnail || project.thumbnail_url;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
    >
      <div className="project-card__bg">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="project-card__bg-label">{title.charAt(0)}</div>
        )}
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{shortDescription}</p>

        <div className="project-card__footer">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech.id} className="project-card__tech">
              {localize(tech.name, lang)}
            </span>
          ))}

          <span className="project-card__link">
            {t('projects.viewProject')} <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}
