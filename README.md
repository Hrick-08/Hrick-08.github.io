# Hrick — Developer Portfolio

A production-quality personal developer portfolio built as a monorepo.

**Frontend**: Next.js · TypeScript · Tailwind CSS · Framer Motion  
**Backend**: FastAPI · PostgreSQL · WebSocket · GitHub App

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your values

# Run
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local if needed

npm run dev
```

The frontend runs at [http://localhost:3000](http://localhost:3000)  
The backend runs at [http://localhost:8000](http://localhost:8000)

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `GITHUB_APP_ID` | GitHub App ID |
| `GITHUB_PRIVATE_KEY` | GitHub App private key (PEM) |
| `GITHUB_WEBHOOK_SECRET` | Webhook secret for signature validation |
| `GITHUB_INSTALLATION_ID` | GitHub App installation ID |
| `DATABASE_URL` | PostgreSQL connection string |
| `CORS_ORIGINS` | Comma-separated allowed origins |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (default: `http://localhost:8000`) |

## GitHub App Setup

1. Go to **GitHub Settings → Developer Settings → GitHub Apps → New GitHub App**
2. Set the webhook URL to `https://api.hrick.in/webhooks/github` (or use [smee.io](https://smee.io) for local development)
3. Generate a webhook secret and set it in `GITHUB_WEBHOOK_SECRET`
4. Subscribe to events: `push`, `create`, `delete`, `pull_request`, `issues`
5. Generate a private key and save the PEM content to `GITHUB_PRIVATE_KEY`
6. Install the app on your account/repos
7. Note the installation ID and set it in `GITHUB_INSTALLATION_ID`

## Architecture

```
GitHub
   │
   │ repository events
   ▼
GitHub App Webhook
   │
   ▼
FastAPI backend (api.hrick.in)
   │
   ├── validate webhook signature
   ├── parse & normalize events
   ├── persist to PostgreSQL
   └── broadcast via WebSocket
           │
           ▼
       Next.js frontend (hrick.in)
```

## Production Deployment

### Frontend

```env
NEXT_PUBLIC_API_URL=https://api.hrick.in
```

### Backend

```env
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/portfolio
CORS_ORIGINS=https://hrick.in
```

Both applications have Dockerfiles and can be deployed independently.

## License

MIT
