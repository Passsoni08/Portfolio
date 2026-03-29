# Portfolio - Rafael V Passoni

Full-stack portfolio website built with Django REST Framework and React.

## Tech Stack

**Backend:** Django 6 / Django REST Framework, SQLite (dev) / PostgreSQL (prod), WhiteNoise
**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
**Infrastructure:** Docker, GitHub Actions CI/CD

## Quick Start

Prerequisites: [Docker](https://www.docker.com/) and Docker Compose.

```bash
git clone https://github.com/Passsoni08/Portfolio.git
cd Portfolio
docker compose up
```

- **Frontend:** <http://localhost:5173>
- **Backend API:** <http://localhost:8000/api/v1>

## Project Structure

```text
Portfolio/
├── backend/               # Django REST Framework API
│   ├── config/settings/   # Base, development, production settings
│   ├── portfolio/         # Models, views, serializers, tests
│   └── Dockerfile
├── frontend/              # React + TypeScript SPA
│   ├── src/
│   │   ├── components/    # UI, layout, sections, projects
│   │   ├── pages/         # HomePage, DocsPage
│   │   ├── services/      # Axios API client
│   │   └── hooks/         # Custom React hooks
│   └── Dockerfile
├── data/                  # Seed data (profile.json)
├── .github/workflows/     # CI pipelines
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| GET    | `/api/v1/portfolio/`       | All portfolio data          |
| GET    | `/api/v1/projects/`        | Project list                |
| GET    | `/api/v1/projects/<slug>/` | Project detail              |
| POST   | `/api/v1/contact/`         | Contact form (rate limited) |

## Development

**Backend (without Docker):**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
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
