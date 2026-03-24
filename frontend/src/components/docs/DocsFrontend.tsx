import CodeBlock from './CodeBlock';

export default function DocsFrontend() {
  return (
    <section id="frontend">
      <h2>Frontend — React + TypeScript</h2>

      <h3>Stack</h3>
      <ul>
        <li><strong>React 19</strong> + <strong>TypeScript 5.9</strong></li>
        <li><strong>Vite 8</strong> — Build tool with HMR and API proxy</li>
        <li><strong>React Router 7</strong> — Client-side routing</li>
        <li><strong>Axios</strong> — HTTP client with typed responses</li>
        <li><strong>react-helmet-async</strong> — SEO meta tags</li>
      </ul>

      <h3>Component Architecture</h3>
      <CodeBlock code={`
src/components/
├── layout/     # Navbar, Footer, SmoothScroll
├── ui/         # SplitText, RevealOnScroll, ParallaxImage, MagneticButton
├── sections/   # Hero, About, Skills, Projects, Experience, Contact, Loader
├── projects/   # ProjectCard
└── docs/       # Documentation page components
      `} />

      <p>
        Components follow a clear hierarchy: <strong>layout</strong> (structural wrappers),
        <strong>ui</strong> (reusable animation primitives), <strong>sections</strong> (page content blocks),
        and <strong>domain-specific</strong> (ProjectCard, docs).
      </p>

      <h3>Design System</h3>
      <p>
        CSS custom properties define the entire design language. Fluid typography uses <code>clamp()</code>
        for responsive scaling without media queries. Three font families provide visual hierarchy:
      </p>
      <CodeBlock language="css" code={`
:root {
  --color-bg: #0a0a0a;
  --color-accent: #00ff88;
  --font-display: 'Space Grotesk';    /* Headings */
  --font-body: 'Inter';               /* Body */
  --font-mono: 'JetBrains Mono';      /* Code + accents */
  --text-hero: clamp(3rem, 8vw, 8rem);
}
      `} />

      <h3>State Management</h3>
      <p>
        No Redux or external state library. A single <code>useApi</code> hook fetches all data from
        <code>/api/v1/portfolio/</code> on mount. The <code>HomePage</code> distributes data as props
        to each section. This works because the entire dataset is &lt;10KB.
      </p>

      <h3>API Layer</h3>
      <p>
        Centralized Axios instance in <code>services/api.ts</code> with environment-based URL configuration.
        TypeScript interfaces in <code>types/index.ts</code> mirror Django serializer output exactly.
      </p>
    </section>
  );
}
