from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    github_app_id: str = ""
    github_private_key: str = ""
    github_webhook_secret: str = ""
    github_installation_id: str = ""
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio"
    cors_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

settings = Settings()
