from datetime import date
from typing import Optional

from pydantic import BaseModel


class LoginBody(BaseModel):
    email: str
    password: str


class RegisterBody(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    username: str
    password: str
    email: str
    description: Optional[str]
    facebook: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    instagram: Optional[str]
