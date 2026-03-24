import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DocsArchitecture from '../components/docs/DocsArchitecture';
import DocsBackend from '../components/docs/DocsBackend';
import DocsFrontend from '../components/docs/DocsFrontend';
import DocsAnimations from '../components/docs/DocsAnimations';
import DocsCICD from '../components/docs/DocsCICD';
import DocsDeploy from '../components/docs/DocsDeploy';
import '../styles/docs.css';

const SECTIONS = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'animations', label: 'Animations' },
  { id: 'cicd', label: 'CI/CD & Tests' },
  { id: 'deploy', label: 'Deploy' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('architecture');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Documentation | Rafael Passoni Portfolio</title>
        <meta name="description" content="Technical documentation of the portfolio system architecture, built with Django REST API and React." />
      </Helmet>

      <div className="docs">
        <aside className="docs__sidebar">
          <div className="docs__sidebar-title">Documentation</div>
          <nav>
            <ul className="docs__sidebar-nav">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    className={`docs__sidebar-link ${activeSection === id ? 'docs__sidebar-link--active' : ''}`}
                    onClick={() => scrollToSection(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="docs__content">
          <Link to="/" className="docs__back">
            &larr; Back to Portfolio
          </Link>

          <h1>Technical Documentation</h1>
          <p>
            A detailed breakdown of every layer of this portfolio system — from the Django REST API
            to the React frontend, animation architecture, CI/CD pipeline, and deployment strategy.
          </p>

          <DocsArchitecture />
          <DocsBackend />
          <DocsFrontend />
          <DocsAnimations />
          <DocsCICD />
          <DocsDeploy />
        </main>
      </div>
    </>
  );
}
