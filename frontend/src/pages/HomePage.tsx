import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi';
import { fetchPortfolioData } from '../services/api';
import Loader from '../components/sections/Loader';
import Hero from '../components/sections/Hero';

export default function HomePage() {
  const { data } = useApi(fetchPortfolioData);
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Helmet>
        <title>Rafael Passoni | Software Developer</title>
        <meta name="description" content="Portfolio of Rafael V Passoni - Software Developer from Brazil" />
      </Helmet>

      <Loader onComplete={() => setLoaderDone(true)} />

      <main>
        <Hero
          name={data?.profile?.name}
          jobTitle={data?.profile?.job_title}
          visible={loaderDone}
        />

        {/* Placeholder sections - will be built in Phase 2 & 3 */}
        <section className="section container" id="about">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '2rem' }}>About</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', lineHeight: 1.8 }}>
            {data?.profile?.bio || 'Section coming soon.'}
          </p>
        </section>

        <section className="section container" id="skills">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '2rem' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {data?.skill_categories?.map((cat) =>
              cat.skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {skill.name}
                </span>
              ))
            )}
          </div>
        </section>

        <section className="section container" id="projects">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '2rem' }}>Projects</h2>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {data?.projects?.map((project) => (
              <div
                key={project.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  background: 'var(--color-bg-elevated)',
                }}
              >
                <h3 style={{ fontSize: 'var(--text-h3)', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-small)', marginBottom: '1rem' }}>
                  {project.short_description}
                </p>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-small)',
                    }}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section container" id="experience">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '2rem' }}>Experience</h2>
          {data?.experience?.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: 'var(--text-h3)' }}>{exp.title}</h3>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)' }}>
                {exp.company} · {exp.start_date} - {exp.end_date || 'Present'}
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </section>

        <section className="section container" id="contact" style={{ paddingBottom: 'var(--section-padding)' }}>
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '2rem' }}>Contact</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            {data?.profile?.email} · {data?.profile?.phone}
          </p>
        </section>
      </main>
    </>
  );
}
