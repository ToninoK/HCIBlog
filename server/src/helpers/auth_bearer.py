from typing import Union

from fastapi import HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.helpers.auth_handler import decode_jwt
from src.models.users import get_user


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        """Method which is called when the class is invoked
        Checks if the credentials passed in during the course of invoking the class are valid
        """
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            if credentials.scheme != "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            token_data = self.verify_jwt(credentials.credentials)
            if not token_data:
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            return credentials.credentials
        raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, token: str) -> Union[dict, bool]:
        """Verify if the token is valid"""
        try:
            token_data = decode_jwt(token)
        except:
            return False
        return token_data
