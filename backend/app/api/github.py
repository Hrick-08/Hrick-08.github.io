from fastapi import APIRouter
from app.services.github_service import github_service

router = APIRouter(prefix="/api/github", tags=["github"])

@router.get("/repos")
async def get_repos():
    repos = await github_service.get_repos()
    return {"repositories": repos}

@router.get("/health", include_in_schema=False)
async def health_check():
    return {"status": "healthy", "service": "portfolio-api"}
