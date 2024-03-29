import asyncio
import json
from datetime import datetime
from typing import List, Optional

from fastapi import Depends, Query, Response


from src.helpers import auth_handler as auth_controller
from src.helpers.api_router import APIRouter
from src.helpers.auth_bearer import JWTBearer as Auth
from src.models.posts import create_post, get_post, get_posts, update_post, delete_post
from src.models.tags import create_tag
from src.models.schema.post import PostBody, PostBodyPartial

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("/")
async def create(data: PostBody, token: str = Depends(Auth())):
    payload = data.dict()

    token_data = auth_controller.decode_jwt(token)
    payload["user_id"] = int(token_data["sub"])
    if payload.get("content"):
        payload["content"] = json.dumps(payload["content"])

    post = await create_post(payload)

    tags = payload.get("tags") or []
    tag_creation_tasks = []
    for tag in tags:
        tag_creation_tasks.append(create_tag({"name": tag, "post_id": post["id"]}))

    await asyncio.gather(*tag_creation_tasks)

    return post


@router.get("/{post_id}")
async def get(post_id: int):
    post = await get_post(post_id)
    return post


@router.delete("/{post_id}", dependencies=[Depends(Auth())])
async def post_delete(post_id: int):
    await delete_post(post_id)
    return Response(None, status_code=204)


@router.get("/")
async def index(
    tags: Optional[List[str]] = Query(default=None),
    sort: Optional[str] = Query(default="desc", regex="asc|desc"),
    page: Optional[int] = Query(default=1, ge=1),
    per_page: Optional[int] = Query(default=10, ge=1, le=20),
):
    posts = await get_posts(tags=tags, sort=sort, page=page, per_page=per_page)
    data = {
        "data": posts,
        "page": page,
        "per_page": per_page,
    }
    return data


@router.put("/{post_id}", dependencies=[Depends(Auth())])
async def update(post_id: int, data: PostBodyPartial):
    payload = data.dict()
    payload["updated_at"] = datetime.now()
    if payload.get("content"):
        payload["content"] = json.dumps(payload["content"])

    updated_post = await update_post(post_id, payload)

    tags = payload.get("tags") or []
    tag_creation_tasks = []
    for tag in tags:
        tag_creation_tasks.append(create_tag({"name": tag, "post_id": post_id}))

    await asyncio.gather(*tag_creation_tasks)

    return updated_post
