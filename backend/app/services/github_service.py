import httpx
import time
from app.config import settings

try:
    import jwt
except ImportError:
    jwt = None

class GitHubService:
    def __init__(self, config=settings):
        self.config = config

    def _generate_jwt(self) -> str:
        if not jwt or not self.config.github_app_id or not self.config.github_private_key:
            return ""
        
        now = int(time.time())
        payload = {
            "iat": now - 60,
            "exp": now + (10 * 60),
            "iss": self.config.github_app_id
        }
        try:
            return jwt.encode(payload, self.config.github_private_key, algorithm="RS256")
        except Exception:
            return ""

    async def _get_installation_token(self) -> str:
        if not self.config.github_installation_id:
            return ""
        
        jwt_token = self._generate_jwt()
        if not jwt_token:
            return ""

        url = f"https://api.github.com/app/installations/{self.config.github_installation_id}/access_tokens"
        headers = {
            "Authorization": f"Bearer {jwt_token}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers)
            if response.status_code == 201:
                return response.json().get("token", "")
            return ""

    async def get_repos(self) -> list[dict]:
        token = await self._get_installation_token()
        if not token:
            return []

        url = "https://api.github.com/installation/repositories"
        headers = {
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                return response.json().get("repositories", [])
            return []

github_service = GitHubService()
