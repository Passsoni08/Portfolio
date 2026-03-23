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
        <meta name="description" content="Portfolio of Rafael V Passoni - Software Developer from Brazil. Built with Django REST API and React." />
      </Helmet>

      <Loader onComplete={() => setLoaderDone(true)} />

      {loaderDone && <Navbar />}

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
