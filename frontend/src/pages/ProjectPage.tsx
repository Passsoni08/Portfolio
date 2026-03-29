import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks/useApi';
import { fetchProjectBySlug } from '../services/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import SplitText from '../components/ui/SplitText';
import '../styles/project-detail.css';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const fetcher = useCallback(() => fetchProjectBySlug(slug!), [slug]);
  const { data: project, loading, error } = useApi(fetcher);

  if (loading) {
    return (
      <div className="project-detail__loading">
        <span>{t('projectDetail.loading')}</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail__loading">
        <span>{t('projectDetail.notFound')}</span>
        <Link to="/" className="project-detail__back">&larr; {t('projectDetail.back')}</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Rafael Passoni</title>
        <meta name="description" content={project.short_description} />
        <link rel="canonical" href={`https://rafaelpassoni.dev/projects/${project.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${project.title} | Rafael Passoni`} />
        <meta property="og:description" content={project.short_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://rafaelpassoni.dev/projects/${project.slug}`} />
        {project.thumbnail && <meta property="og:image" content={project.thumbnail} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content={project.thumbnail ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={`${project.title} | Rafael Passoni`} />
        <meta name="twitter:description" content={project.short_description} />
        {project.thumbnail && <meta name="twitter:image" content={project.thumbnail} />}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.short_description,
          url: `https://rafaelpassoni.dev/projects/${project.slug}`,
          ...(project.github_url && { codeRepository: project.github_url }),
          author: {
            '@type': 'Person',
            name: 'Rafael V Passoni',
          },
          programmingLanguage: project.technologies.map((t) => t.name),
        })}</script>
      </Helmet>

      <Navbar />

      <main className="project-detail">
        <div className="container--narrow project-detail__container">
          <Link to="/" className="project-detail__back">
            &larr; {t('projectDetail.back')}
          </Link>

          <div className="project-detail__hero">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="project-detail__thumbnail"
              />
            ) : (
              <div className="project-detail__thumbnail-fallback">
                {project.title.charAt(0)}
              </div>
            )}
          </div>

          <RevealOnScroll y={30}>
            <SplitText as="h1" type="words" className="project-detail__title">
              {project.title}
            </SplitText>
          </RevealOnScroll>

          {project.technologies.length > 0 && (
            <RevealOnScroll y={20} delay={0.1}>
              <div className="project-detail__techs">
                {project.technologies.map((tech) => (
                  <span key={tech.id} className="project-detail__tech">
                    {tech.icon_url && (
                      <img
                        src={tech.icon_url}
                        alt=""
                        className="project-detail__tech-icon"
                      />
                    )}
                    {tech.name}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          )}

          <RevealOnScroll y={20} delay={0.2}>
            <div className="project-detail__description">
              {project.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll y={20} delay={0.3}>
            <div className="project-detail__actions">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__btn project-detail__btn--primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  {t('projectDetail.viewGithub')}
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__btn project-detail__btn--secondary"
                >
                  {t('projectDetail.liveDemo')} <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </main>

      <Footer />
    </>
  );
}
