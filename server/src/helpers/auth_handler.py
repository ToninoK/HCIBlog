from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from src.helpers.cache import Cache
from src.models.users import get_user
from src.helpers.errors import HTTPUnauthorized
from src.settings import config

ALGORITHM = "HS256"

bcrypt = CryptContext(schemes=["bcrypt"], deprecated="auto")

auth_cache = Cache(namespace="blacklisted_tokens")


def verify_password(plaintext: str, hashed_pass: str):
    """Compare plaintext password with hashed password

    :param plaintext: plaintext version of password
    :param hashed_pass: hashed version of password
    :rtype: boolean
    :return: True if arguments match, otherwise False
    """
    return bcrypt.verify(plaintext, hashed_pass)


def hash_password(password: str):
    """Hash the plaintext password

    :param password: plaintext password to hash
    :rtype: str
    :return: hashed version of plaintext password
    """
    return bcrypt.hash(password)


async def authenticate_user(email: str, password: str):
    """Compare the supplied email and password with data from db

    :param email: user email to authenticate
    :param password: user password to authenticate
    :rtype: User
    :return: returns dictionary containing user data if email-password combination is valid
    """
    user = await get_user(email=email)
    if not user or not verify_password(password, user["password"]):
        raise HTTPUnauthorized()
    return user


def create_access_token(data: dict, expires_delta: Optional[int] = 24 * 60 * 2):
    """Create an access token with an expiration timestamp

    :param data: dictionary containing data to encode in the token
    :param expires_delta: integer representing number of minutes the token should last
    :rtype: dict
    :return: dictionary containing access_token, token_type, and role
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=ALGORITHM)
    return {
        "access_token": encoded_jwt,
        "email": data["email"],
        "token_type": "bearer",
        "expires_at": expire,
        "user_id": data["sub"],
    }


def blacklist_token(token: str):
    """Add token to redis

    Adding the token to redis will serve as a means of blacklisting a token once a
    user requests a logout
    :param token: the token to blacklist
    :rtype: bool
    :returns: True if token was successfully blacklisted, otherwise False
    """
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[ALGORITHM])
        exp = datetime.fromtimestamp(payload.get("exp", 0))
        ttl = (datetime.utcnow() - exp).seconds
    except JWTError as ex:
        raise HTTPUnauthorized() from ex
    return auth_cache.set(token, "True", ttl=ttl)


def decode_jwt(token: str):
    """Decode the jwt token while raising exceptions for invalid tokens

    :param token: token to decode
    :rtype: dict
    :return: data decoded from the token
    """
    try:
        if auth_cache.get(token):
            raise HTTPUnauthorized("Token invalid, request a new one")

        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[ALGORITHM])
        exp = datetime.fromtimestamp(payload.get("exp", 0))
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPUnauthorized()
        if exp <= datetime.utcnow():
            raise HTTPUnauthorized("Token expired, request a new one")
    except JWTError as ex:
        raise HTTPUnauthorized() from ex

    return payload


async def get_current_user(token: str):
    """Return the currently logged in user

    :param token: token that belongs to the specific user
    :rtype: dict
    :return: currently logged in user
    """
    payload = decode_jwt(token)
    user = await get_user(user_id=payload.get("sub"))
    if user is None:
        raise HTTPUnauthorized()

    return user
