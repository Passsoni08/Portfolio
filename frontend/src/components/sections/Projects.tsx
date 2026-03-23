import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import ProjectCard from '../projects/ProjectCard';
import type { Project } from '../../types';
import '../../styles/projects.css';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="section container" id="projects">
      <SplitText as="h2" type="words" className="projects__heading">
        Projects
      </SplitText>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.id} delay={i * 0.1} y={40}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
