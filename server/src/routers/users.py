from datetime import datetime

from fastapi import APIRouter, Depends, status
from fastapi.responses import Response

from src.helpers import auth_handler as auth_controller
from src.helpers.auth_bearer import JWTBearer as Auth
from src.helpers.errors import HTTPConflict
from src.models.users import create_user, get_user, update_user
from src.models.schema.user import LoginBody, RegisterBody, UserBodyPartial
from src.settings import config

router = APIRouter(prefix="/users", tags=["auth"])


@router.post("/login")
async def login(data: LoginBody):
    payload = data.dict()
    user = await auth_controller.authenticate_user(
        email=payload["email"], password=payload["password"]
    )

    token_data = {
        "sub": str(user["id"]),
        "email": user["email"],
    }
    access_token = auth_controller.create_access_token(data=token_data)
    return access_token


@router.post("/register")
async def register(data: RegisterBody):
    if not config.DEBUG:
        return Response(None, status.HTTP_403_FORBIDDEN)

    payload = data.dict()

    user_exists = await get_user(payload["email"])
    if user_exists:
        raise HTTPConflict("User with the given email already exists")

    payload["password"] = auth_controller.hash_password(payload["password"])
    user = await create_user(payload)
    token_data = {
        "sub": str(user["id"]),
        "email": user["email"],
    }
    access_token = auth_controller.create_access_token(data=token_data)
    return access_token


@router.get("/logout", tags=["auth"])
async def logout(token: str = Depends(Auth())):
    auth_controller.blacklist_token(token)
    return Response(None, status.HTTP_204_NO_CONTENT)


@router.get("/session")
async def get_session(token: str = Depends(Auth())):
    token_data = auth_controller.decode_jwt(token)
    user = await get_user(email=token_data["email"])
    user.pop("password")
    return user


@router.put("/{user_id}", dependencies=[Depends(Auth())])
async def update(user_id: int, data: UserBodyPartial):
    payload = data.dict()
    payload["updated_at"] = datetime.now()
    updated_user = await update_user(user_id, payload)
    return updated_user
