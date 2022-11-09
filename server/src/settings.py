from os import environ


class Config:
    # Server
    SECRET_KEY = environ.get("SECRET_KEY")
    DEBUG = bool(environ.get("DEBUG", True))

    # Database
    POSTGRES_HOST = environ.get("POSTGRES_HOST")
    POSTGRES_DB = environ.get("POSTGRES_DB", "student_projects")
    POSTGRES_USER = environ.get("POSTGRES_USER", "admin")
    POSTGRES_PASSWORD = environ.get("POSTGRES_PASSWORD", "")

    # Redis
    REDIS_HOST = environ.get("REDIS_HOST", "students_projects_redis")
    REDIS_PORT = int(environ.get("REDIS_PORT", 6379))


config = Config()
