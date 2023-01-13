from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.models.init_db import create_tables
from src.routers import users, posts, tags
from src.settings import config

ROOT_PATH = "/api" if config.DEBUG else "/"

app = FastAPI(root_path=ROOT_PATH)

routers = [
    posts,
    tags,
    users,
]

for router in routers:
    app.include_router(router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost"],
    allow_origin_regex='https://hci-blog(-.*-)?((matejkozica)|(toninok))?\.vercel\.app',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await create_tables()


@app.get("/ping")
def ping():
    return {"pong": "ok"}
