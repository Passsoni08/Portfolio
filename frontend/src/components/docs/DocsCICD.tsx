import CodeBlock from './CodeBlock';

export default function DocsCICD() {
  return (
    <section id="cicd">
      <h2>CI/CD &amp; Testing</h2>

      <h3>Branch Strategy</h3>
      <ul>
        <li><strong>main</strong> — Production code, protected</li>
        <li><strong>develop</strong> — Integration branch, PRs merge here first</li>
      </ul>

      <h3>GitHub Actions</h3>
      <p>
        Two separate pipelines trigger on push/PR to <code>main</code> and <code>develop</code>,
        scoped to their respective directories via <code>paths</code> filters:
      </p>

      <h4>Backend Pipeline</h4>
      <CodeBlock language="yaml" code={`
# .github/workflows/backend-ci.yml
- Setup Python 3.12
- pip install -r requirements.txt
- python manage.py migrate
- pytest --cov=portfolio --cov-fail-under=80
      `} />

      <h4>Frontend Pipeline</h4>
      <CodeBlock language="yaml" code={`
# .github/workflows/frontend-ci.yml
- Setup Node 22
- npm ci
- tsc --noEmit          # Type check
- vitest run            # Unit tests
- npm run build         # Production build
      `} />

      <h3>Backend Tests — pytest + Django</h3>
      <p>
        43 tests covering models, serializers, views, and the seed command.
        Uses <strong>Factory Boy</strong> for test data generation with proper FK/M2M relationships.
        Rate limiting is mocked in contact endpoint tests.
      </p>
      <ul>
        <li><strong>test_models.py</strong> — CRUD, __str__, ordering, relationships</li>
        <li><strong>test_serializers.py</strong> — Field presence, nested relations, validation</li>
        <li><strong>test_views.py</strong> — Status codes, payloads, error handling</li>
        <li><strong>test_seed_command.py</strong> — Data import, idempotency</li>
      </ul>

      <h3>Frontend Tests — Vitest + Testing Library</h3>
      <p>
        12 tests covering API service, custom hooks, and key components.
        Axios is mocked at the module level. Components are rendered with React Router context.
      </p>
    </section>
  );
}
