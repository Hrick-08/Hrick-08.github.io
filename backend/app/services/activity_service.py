from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from sqlalchemy.exc import IntegrityError
from app.models.activity import Activity
from datetime import datetime

class ActivityService:
    async def create_activity(self, session: AsyncSession, data: dict) -> Activity | None:
        activity = Activity(**data)
        session.add(activity)
        try:
            await session.commit()
            await session.refresh(activity)
            return activity
        except IntegrityError:
            await session.rollback()
            # If commit_sha conflicts, return existing or None
            if "commit_sha" in data and data["commit_sha"]:
                stmt = select(Activity).where(Activity.commit_sha == data["commit_sha"])
                result = await session.execute(stmt)
                return result.scalar_one_or_none()
            return None

    async def get_activities(
        self,
        session: AsyncSession,
        limit: int = 20,
        repository: str | None = None,
        branch: str | None = None,
        since: datetime | None = None,
        offset: int = 0,
    ) -> list[Activity]:
        stmt = select(Activity).order_by(desc(Activity.timestamp))
        if repository:
            stmt = stmt.where(Activity.repository == repository)
        if branch:
            stmt = stmt.where(Activity.branch == branch)
        if since:
            stmt = stmt.where(Activity.timestamp >= since)
        stmt = stmt.offset(offset).limit(limit)
        
        result = await session.execute(stmt)
        return list(result.scalars().all())

    async def get_latest(self, session: AsyncSession) -> Activity | None:
        stmt = select(Activity).order_by(desc(Activity.timestamp)).limit(1)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

activity_service = ActivityService()
