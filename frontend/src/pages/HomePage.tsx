import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi';
import { fetchPortfolioData } from '../services/api';
import Navbar from '../components/layout/Navbar';
import Loader from '../components/sections/Loader';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  const { data } = useApi(fetchPortfolioData);
  const [loaderDone, setLoaderDone] = useState(false);

  const skillCount = data?.skill_categories?.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  ) ?? 0;

  return (
    <>
      <Helmet>
        <title>Rafael Passoni | Software Developer</title>
        <meta name="description" content="Portfolio of Rafael V Passoni - Software Developer from Brazil. Fullstack engineer building with Django, React, TypeScript, and GSAP." />
        <link rel="canonical" href="https://rafaelpassoni.dev" />

        {/* Open Graph */}
        <meta property="og:title" content="Rafael Passoni | Software Developer" />
        <meta property="og:description" content="Fullstack portfolio built with Django REST API and React. Featuring scroll-driven animations, CI/CD pipeline, and technical documentation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rafaelpassoni.dev" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rafael Passoni | Software Developer" />
        <meta name="twitter:description" content="Fullstack portfolio built with Django REST API and React." />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Rafael V Passoni',
          jobTitle: 'Software Developer',
          url: 'https://rafaelpassoni.dev',
          email: 'passonirafael08@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Santa Rosa de Viterbo',
            addressRegion: 'SP',
            addressCountry: 'BR',
          },
          sameAs: ['https://github.com/Passsoni08'],
          knowsAbout: ['Python', 'Django', 'React', 'TypeScript', 'JavaScript', 'AWS'],
        })}</script>
      </Helmet>

      <a href="#about" className="skip-to-content">Skip to content</a>

      <Loader onComplete={() => setLoaderDone(true)} />

      {loaderDone && <Navbar />}

      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-bg__blob" />
      </div>

      <main>
        <Hero
          name={data?.profile?.name}
          jobTitle={data?.profile?.job_title}
          visible={loaderDone}
        />

        <About
          bio={data?.profile?.bio}
          projectCount={data?.projects?.length ?? 0}
          skillCount={skillCount}
        />

        <Skills categories={data?.skill_categories ?? []} />

        <Projects projects={data?.projects ?? []} />

        <Experience experiences={data?.experience ?? []} />

        <Education education={data?.education ?? []} />

        <Contact
          email={data?.profile?.email}
          phone={data?.profile?.phone}
          githubUrl={data?.profile?.github_url}
          linkedinUrl={data?.profile?.linkedin_url}
        />
      </main>

      <Footer
        githubUrl={data?.profile?.github_url}
        linkedinUrl={data?.profile?.linkedin_url}
        email={data?.profile?.email}
      />
    </>
  );
}
