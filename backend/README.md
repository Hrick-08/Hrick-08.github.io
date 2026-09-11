# Portfolio Backend API

FastAPI backend for developer portfolio, tracking GitHub activity in realtime.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```

3. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## Docker

```bash
docker build -t portfolio-backend .
docker run -p 8000:8000 --env-file .env portfolio-backend
```
