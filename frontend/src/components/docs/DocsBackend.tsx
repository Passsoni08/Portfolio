import CodeBlock from './CodeBlock';

export default function DocsBackend() {
  return (
    <section id="backend">
      <h2>Backend — Django REST API</h2>

      <h3>Stack</h3>
      <ul>
        <li><strong>Django 6</strong> — Web framework</li>
        <li><strong>Django REST Framework</strong> — API serialization and views</li>
        <li><strong>django-cors-headers</strong> — Cross-origin requests for React frontend</li>
        <li><strong>WhiteNoise</strong> — Static file serving in production</li>
        <li><strong>SQLite</strong> (dev) / <strong>PostgreSQL</strong> (prod)</li>
      </ul>

      <h3>Settings Architecture</h3>
      <p>
        Settings are split into three modules: <code>base.py</code> (shared),
        <code>development.py</code> (DEBUG, SQLite, CORS allow all), and
        <code>production.py</code> (PostgreSQL, env-based secrets, WhiteNoise).
        <code>manage.py</code> defaults to development; <code>wsgi.py</code> defaults to production.
      </p>

      <h3>Data Models</h3>
      <p>8 models with relational structure:</p>
      <CodeBlock language="python" code={`
# Key relationships:
Skill → SkillCategory (ForeignKey)
Project ↔ Skill (ManyToMany via technologies)

# Models: Profile, SkillCategory, Skill, Project,
#         Experience, Education, Language, ContactMessage

# All content models have an 'order' field for
# admin-controlled sorting.
      `} />

      <h3>API Endpoints</h3>
      <CodeBlock language="bash" code={`
GET  /api/v1/portfolio/        # Aggregated payload (all data)
GET  /api/v1/projects/         # Project list
GET  /api/v1/projects/:slug/   # Project detail
POST /api/v1/contact/          # Contact form (5/hour rate limit)
      `} />

      <h3>Serializers</h3>
      <p>
        Nested serialization: <code>SkillCategorySerializer</code> includes its skills,
        <code>ProjectSerializer</code> includes technology skills. The
        <code>ContactMessageSerializer</code> only exposes writable fields (name, email, subject, message).
      </p>

      <h3>Seed Command</h3>
      <p>
        <code>python manage.py seed_data</code> reads <code>data/profile.json</code> and populates all models.
        Uses <code>update_or_create</code> for idempotency — running it twice won't duplicate data.
      </p>
    </section>
  );
}
