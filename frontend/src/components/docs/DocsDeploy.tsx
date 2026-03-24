export default function DocsDeploy() {
  return (
    <section id="deploy">
      <h2>Deploy &amp; Infrastructure</h2>

      <h3>Frontend</h3>
      <p>
        Static build via <code>npm run build</code> produces optimized assets in <code>dist/</code>.
        Deploy to <strong>Vercel</strong> or <strong>Netlify</strong> with zero configuration —
        just point to the <code>frontend</code> directory and set the build command.
      </p>

      <h3>Backend</h3>
      <p>
        Django serves the API via <strong>Gunicorn</strong> in production. Deploy to
        <strong>Railway</strong>, <strong>Render</strong>, or any container platform.
        Static files are served by <strong>WhiteNoise</strong> middleware (no separate CDN needed for admin assets).
      </p>

      <h3>Database</h3>
      <ul>
        <li><strong>Development</strong>: SQLite — zero config, file-based, perfect for local dev</li>
        <li><strong>Production</strong>: PostgreSQL — configured via environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)</li>
      </ul>

      <h3>Environment Variables</h3>
      <p>
        Both frontend and backend use <code>.env.example</code> files documenting all required variables.
        The frontend uses <code>VITE_API_URL</code> for the API base URL. The backend uses
        standard Django settings plus database connection parameters.
      </p>

      <h3>CORS</h3>
      <p>
        Development: <code>CORS_ALLOW_ALL_ORIGINS = True</code>.
        Production: explicit allowlist via <code>CORS_ALLOWED_ORIGINS</code> environment variable.
      </p>
    </section>
  );
}
