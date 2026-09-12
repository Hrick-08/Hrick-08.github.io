from app.db.database import engine


def test_asyncpg_engine_uses_stale_connection_protection():
    assert engine.url.drivername == "postgresql+asyncpg"
    assert engine.pool._pre_ping is True
    assert engine.pool._recycle == 300