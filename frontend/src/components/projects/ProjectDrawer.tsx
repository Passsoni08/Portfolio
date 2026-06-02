import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { localize } from '../../lib/localize';
import type { Project } from '../../types';
import '../../styles/project-drawer.css';

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const image = project ? project.thumbnail || project.thumbnail_url : '';
  const title = localize(project?.title, lang);
  const description = localize(project?.description, lang);

  return (
    <>
      <div
        className={`project-drawer__backdrop ${isOpen ? 'project-drawer__backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`project-drawer ${isOpen ? 'project-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Project details'}
      >
        <button
          className="project-drawer__close"
          onClick={onClose}
          aria-label={t('projectDetail.close')}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {project && (
          <div className="project-drawer__content">
            <div className="project-drawer__hero">
              {image ? (
                <img src={image} alt={title} className="project-drawer__thumbnail" />
              ) : (
                <div className="project-drawer__thumbnail-fallback">{title.charAt(0)}</div>
              )}
            </div>

            <h2 className="project-drawer__title">{title}</h2>

            {project.technologies.length > 0 && (
              <div className="project-drawer__techs">
                {project.technologies.map((tech) => (
                  <span key={tech.id} className="project-drawer__tech">
                    {tech.icon_url && (
                      <img src={tech.icon_url} alt="" className="project-drawer__tech-icon" />
                    )}
                    {localize(tech.name, lang)}
                  </span>
                ))}
              </div>
            )}

            <div className="project-drawer__description">
              {description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="project-drawer__actions">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-drawer__btn project-drawer__btn--primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  {t('projectDetail.viewGithub')}
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-drawer__btn project-drawer__btn--secondary"
                >
                  {t('projectDetail.liveDemo')} <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
