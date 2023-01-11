from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.models.init_db import create_tables
from src.routers import users, posts, tags

app = FastAPI(root_path="/api")

routers = [
    posts,
    tags,
    users,
]

for router in routers:
    app.include_router(router)

origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
