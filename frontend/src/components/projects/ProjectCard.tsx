import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.github_url || project.live_url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
    >
      <div className="project-card__bg">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="project-card__bg-label">{project.title.charAt(0)}</div>
        )}
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.short_description}</p>

        <div className="project-card__footer">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech.id} className="project-card__tech">
              {tech.name}
            </span>
          ))}

          {project.github_url && (
            <span className="project-card__link">
              GitHub <span aria-hidden="true">&rarr;</span>
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
