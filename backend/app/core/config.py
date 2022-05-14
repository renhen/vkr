from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

PROJECT_NAME = "dashboard"
VERSION = "0.0.1"
API_PREFIX = "/api/v1"


SECRET_KEY = config("SECRET_KEY", cast=Secret)
ACCESS_TOKEN_EXPIRE_MINUTES = config("ACCESS_TOKEN_EXPIRE_MINUTES", cast=int, default=7 * 24 * 60)  # one week
JWT_ALGORITHM = config("JWT_ALGORITHM", cast=str, default="HS256")
JWT_AUDIENCE = config("JWT_AUDIENCE", cast=str, default="dashboard:auth")
JWT_TOKEN_PREFIX = config("JWT_TOKEN_PREFIX", cast=str, default="Bearer")


MYSQL_USER = config("MYSQL_USER", cast=str)
MYSQL_PASSWORD = config("MYSQL_PASSWORD", cast=Secret)
MYSQL_SERVER = config("MYSQL_SERVER", cast=str, default="db")
MYSQL_PORT = config("MYSQL_PORT", cast=str, default="3306")
MYSQL_DB = config("MYSQL_DB", cast=str)

DATABASE_URL = config(
    "DATABASE_URL",
    cast=DatabaseURL,
    default=f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_SERVER}:{MYSQL_PORT}/{MYSQL_DB}",
)
