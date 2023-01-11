from typing import List, Optional

from pydantic import BaseModel, Field, validator


class PostBody(BaseModel):
    title: str = Field(...)
    content: dict = Field(..., )
    tags: Optional[List[str]]

    @validator('content')
    def dict_not_empty(cls, v):
        if not v:
            raise ValueError('Dictionary must not be empty')
        return v



class PostBodyPartial(BaseModel):
    title: Optional[str]
    content: Optional[dict]
    tags: Optional[List[str]]
