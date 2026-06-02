import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import ProjectCard from '../projects/ProjectCard';
import ProjectDrawer from '../projects/ProjectDrawer';
import type { Project } from '../../types';
import '../../styles/projects.css';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();
  // `selected` drives the open/closed state; `displayed` keeps the content
  // mounted through the slide-out animation so it doesn't vanish abruptly.
  const [selected, setSelected] = useState<Project | null>(null);
  const [displayed, setDisplayed] = useState<Project | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProject = useCallback((project: Project) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setDisplayed(project);
    setSelected(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelected(null);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    // Matches --duration-medium (0.6s) used for the drawer transition.
    clearTimer.current = setTimeout(() => setDisplayed(null), 600);
  }, []);

  return (
    <section className="section container" id="projects">
      <SplitText as="h2" type="words" className="projects__heading">
        {t('projects.title')}
      </SplitText>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.id} delay={i * 0.1} y={40}>
            <ProjectCard project={project} onSelect={openProject} />
          </RevealOnScroll>
        ))}
      </div>

      <ProjectDrawer
        project={displayed}
        isOpen={selected !== null}
        onClose={closeProject}
      />
    </section>
  );
}
