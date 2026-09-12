from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db.database import dispose_db, init_db
from app.config import settings

from app.api.webhooks import router as webhooks_router
from app.api.activity import router as activity_router
from app.api.activity import ws_router
from app.api.github import router as github_router

import logging

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.warning(
            "Database initialization failed; persistence may be unavailable (%s)",
            type(e).__name__,
        )
    try:
        yield
    finally:
        try:
            await dispose_db()
            logger.info("Database connections disposed")
        except Exception as e:
            logger.warning("Database shutdown cleanup failed (%s)", type(e).__name__)

app = FastAPI(title="Hrick Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("CORS origins:", settings.cors_origins_list)

app.include_router(webhooks_router)
app.include_router(activity_router)
app.include_router(github_router)
app.include_router(ws_router)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "portfolio-api"}
