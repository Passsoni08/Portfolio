export default function DocsArchitecture() {
  return (
    <section id="architecture">
      <h2>Architecture Overview</h2>

      <p>
        The portfolio is built as a decoupled fullstack application: a <strong>Django REST API</strong> serves
        data through versioned endpoints, and a <strong>React SPA</strong> consumes it on the frontend.
        This separation allows independent deployment, testing, and scaling of each layer.
      </p>

      {/* Architecture Diagram */}
      <div className="docs__diagram">
        <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Boxes */}
          <rect x="20" y="60" width="150" height="80" rx="8" stroke="var(--color-accent)" strokeWidth="2" fill="var(--color-bg-card)" />
          <text x="95" y="95" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-display)" fontSize="14" fontWeight="600">React SPA</text>
          <text x="95" y="115" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)" fontSize="10">Vite + TypeScript</text>

          <rect x="250" y="60" width="150" height="80" rx="8" stroke="var(--color-accent)" strokeWidth="2" fill="var(--color-bg-card)" />
          <text x="325" y="95" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-display)" fontSize="14" fontWeight="600">Django API</text>
          <text x="325" y="115" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)" fontSize="10">DRF + v1</text>

          <rect x="480" y="60" width="150" height="80" rx="8" stroke="var(--color-accent)" strokeWidth="2" fill="var(--color-bg-card)" />
          <text x="555" y="95" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-display)" fontSize="14" fontWeight="600">Database</text>
          <text x="555" y="115" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)" fontSize="10">SQLite / PostgreSQL</text>

          {/* Arrows */}
          <line x1="170" y1="100" x2="250" y2="100" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="400" y1="100" x2="480" y2="100" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead)" />

          <text x="210" y="90" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-mono)" fontSize="9">JSON</text>
          <text x="440" y="90" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-mono)" fontSize="9">ORM</text>

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      <h3>Key Design Decision</h3>
      <p>
        A single <code>/api/v1/portfolio/</code> endpoint returns the entire portfolio payload (~10KB JSON)
        in one request. This eliminates client-side waterfall requests — the React app makes one fetch on mount
        and distributes data via props. Individual endpoints exist for project detail pages and future features.
      </p>
    </section>
  );
}
