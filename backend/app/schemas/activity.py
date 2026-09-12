from pydantic import BaseModel, ConfigDict
from datetime import datetime
import uuid

class ActivityItem(BaseModel):
    id: uuid.UUID | str | None = None
    event_type: str
    repository: str
    repository_url: str
    branch: str | None = None
    commit_sha: str | None = None
    commit_message: str | None = None
    author: str | None = None
    timestamp: datetime
    url: str
    additions: int | None = None
    deletions: int | None = None

    model_config = ConfigDict(from_attributes=True)

class ActivityListResponse(BaseModel):
    items: list[ActivityItem]
    has_more: bool = False

class WebSocketEvent(BaseModel):
    event: str
    data: ActivityItem
