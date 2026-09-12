from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_session
from app.services.activity_service import activity_service
from app.schemas.activity import ActivityListResponse, ActivityItem
from app.services.realtime_service import manager
from datetime import datetime

router = APIRouter(prefix="/api/activity", tags=["activity"])

@router.get("", response_model=ActivityListResponse)
async def get_activities(
    limit: int = Query(4, ge=1, le=100),
    offset: int = Query(0, ge=0),
    repository: str | None = None,
    branch: str | None = None,
    since: datetime | None = None,
    session: AsyncSession = Depends(get_session)
):
    activities = await activity_service.get_activities(
        session, limit + 1, repository, branch, since, offset
    )
    return ActivityListResponse(
        items=[ActivityItem.model_validate(a) for a in activities[:limit]],
        has_more=len(activities) > limit,
    )

@router.get("/latest", response_model=ActivityItem)
async def get_latest_activity(session: AsyncSession = Depends(get_session)):
    activity = await activity_service.get_latest(session)
    if not activity:
        raise HTTPException(status_code=404, detail="No activity found")
    return ActivityItem.model_validate(activity)

ws_router = APIRouter()

@ws_router.websocket("/ws/activity")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # keep-alive loop
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
