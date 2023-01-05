from fastapi import APIRouter, Depends, status
from fastapi.responses import Response

from src.helpers import auth_handler as auth_controller
from src.helpers.auth_bearer import JWTBearer as Auth
from src.helpers.errors import HTTPConflict
from src.models.users import create_user, get_user
from src.models.schema.user import LoginBody, RegisterBody

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
async def get_session(token: dict = Depends(Auth())):
    token_data = auth_controller.decode_jwt(token)
    user = await get_user(email=token_data["email"])
    user.pop("password")
    return user
