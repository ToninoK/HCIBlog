from src.helpers.api_router import APIRouter
from src.models.tags import get_tags

router = APIRouter(prefix="/tags", tags=["tags"])


@router.get("/")
async def index():
    tags = await get_tags()
    return tags
