# Portfolio - Rafael V Passoni

Full-stack portfolio website built with Django REST Framework and React.

## Tech Stack

| Layer          | Technologies                                                                  |
| -------------- | ----------------------------------------------------------------------------- |
| **Backend**    | Django 6, Django REST Framework, PostgreSQL (prod) / SQLite (dev), WhiteNoise |
| **Frontend**   | React 19, TypeScript, Vite, GSAP, React Query, i18next                       |
| **Infra**      | Docker, Gunicorn, Nginx, GitHub Actions CI/CD                                |

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose (recommended path)
- Or, for running natively without Docker: Python 3.11+ and Node.js 20+

## Quick Start

```bash
git clone https://github.com/Passsoni08/Portfolio.git
cd Portfolio
docker compose up
```

- **Frontend:** <http://localhost:5173>
- **Backend API:** <http://localhost:8000/api/v1>
- **Admin:** <http://localhost:8000/admin>

### Production

```bash
docker compose -f docker-compose.prod.yml up --build
```

Uses Gunicorn + Nginx, with environment variables for secrets (see `docker-compose.prod.yml`).

## Project Structure

```text
Portfolio/
├── backend/                    # Django REST Framework API
│   ├── config/settings/        # Base, development, production settings
│   ├── portfolio/              # Models, views, serializers, admin
│   │   └── migrations/
│   ├── Dockerfile              # Development
│   ├── Dockerfile.prod         # Production (Gunicorn + collectstatic)
│   └── requirements.txt
├── frontend/                   # React + TypeScript SPA
│   ├── src/
│   │   ├── components/         # UI, layout, sections, projects, docs
│   │   ├── pages/              # HomePage, ProjectPage, DocsPage
│   │   ├── services/           # Axios API client
│   │   ├── lib/                # React Query client config
│   │   ├── contexts/           # Theme context
│   │   ├── styles/             # CSS modules
│   │   └── types/              # TypeScript interfaces
│   ├── Dockerfile              # Development
│   ├── Dockerfile.prod         # Production (multi-stage + Nginx)
│   └── nginx.conf              # Nginx config for SPA
├── data/                       # Seed data (profile.json)
├── .github/workflows/          # CI pipelines (backend + frontend)
├── docker-compose.yml          # Development
└── docker-compose.prod.yml     # Production
```

## API Endpoints

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| GET    | `/api/v1/portfolio/`       | All portfolio data (cached) |
| GET    | `/api/v1/projects/`        | Project list (paginated)    |
| GET    | `/api/v1/projects/<slug>/` | Project detail              |
| POST   | `/api/v1/contact/`         | Contact form (rate limited) |

## Development

Environment variables are documented in [backend/.env.example](backend/.env.example) and [frontend/.env.example](frontend/.env.example). Both services run with sensible defaults, so copying these files is optional for local development.

**Backend (without Docker):**

Uses SQLite by default — no Postgres required for local development. The database is created automatically on the first `migrate`.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser  # optional, required to log in at /admin
python manage.py runserver
```

**Frontend (without Docker):**

```bash
cd frontend
npm install
npm run dev
```

## CI/CD

GitHub Actions runs on push/PR to `main` and `develop`:

- **Backend:** pytest with 80% coverage threshold
- **Frontend:** TypeScript type check, Vitest, production build
