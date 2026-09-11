from fastapi import APIRouter, Header, Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_session
from app.config import settings
from app.core.webhook_security import verify_webhook_signature
from app.services.activity_service import activity_service
from app.services.realtime_service import manager
from app.schemas.activity import ActivityItem
from datetime import datetime, timezone

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

@router.post("/github")
async def github_webhook(
    request: Request,
    x_hub_signature_256: str = Header(None),
    x_github_event: str = Header(None),
    session: AsyncSession = Depends(get_session)
):
    payload = await request.body()
    
    if not verify_webhook_signature(payload, x_hub_signature_256, settings.github_webhook_secret):
        raise HTTPException(status_code=401, detail="Invalid signature")
        
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    if x_github_event == "push":
        repository_name = data.get("repository", {}).get("full_name", "")
        repository_url = data.get("repository", {}).get("html_url", "")
        ref = data.get("ref", "")
        branch = ref.replace("refs/heads/", "") if ref.startswith("refs/heads/") else None
        
        commits = data.get("commits", [])
        for commit in commits:
            ts_str = commit.get("timestamp", "")
            try:
                timestamp = datetime.fromisoformat(ts_str.replace("Z", "+00:00")) if ts_str else datetime.now(timezone.utc)
            except (ValueError, AttributeError):
                timestamp = datetime.now(timezone.utc)
            
            activity_data = {
                "event_type": "push",
                "repository": repository_name,
                "repository_url": repository_url,
                "branch": branch,
                "commit_sha": commit.get("id"),
                "commit_message": commit.get("message"),
                "author": commit.get("author", {}).get("name", ""),
                "timestamp": timestamp,
                "url": commit.get("url", ""),
                "additions": len(commit.get("added", [])),
                "deletions": len(commit.get("removed", []))
            }
            
            activity = await activity_service.create_activity(session, activity_data)
            if activity:
                item = ActivityItem.model_validate(activity)
                await manager.broadcast({
                    "event": "new_activity",
                    "data": item.model_dump(mode="json")
                })
                
    elif x_github_event in ["create", "delete", "pull_request", "issues"]:
        # Basic handler for other events
        repository_name = data.get("repository", {}).get("full_name", "")
        repository_url = data.get("repository", {}).get("html_url", "")
        
        activity_data = {
            "event_type": x_github_event,
            "repository": repository_name,
            "repository_url": repository_url,
            "branch": None,
            "commit_sha": None,
            "commit_message": data.get("action", f"{x_github_event} event"),
            "author": data.get("sender", {}).get("login", ""),
            "timestamp": datetime.now(timezone.utc),
            "url": data.get("repository", {}).get("html_url", ""),
            "additions": 0,
            "deletions": 0
        }
        activity = await activity_service.create_activity(session, activity_data)
        if activity:
            item = ActivityItem.model_validate(activity)
            await manager.broadcast({
                "event": "new_activity",
                "data": item.model_dump(mode="json")
            })

    return {"status": "ok"}
