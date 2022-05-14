import os
from fastapi import FastAPI
from databases import Database
from backend.app.core.config import DATABASE_URL
import logging

logger = logging.getLogger(__name__)


async def connect_to_db(app: FastAPI) -> None:
    DB_URL = f"{DATABASE_URL}_test" if os.environ.get("TESTING") else DATABASE_URL
    database = Database(DB_URL, min_size=2, max_size=10)

    try:
        await database.connect()
        app.state._db = database
    except Exception as e:
        logger.warning("--- DB CONNECTION ERROR ---")
        logger.warning(e)
        logger.warning("--- DB CONNECTION ERROR ---")


async def close_db_connection(app: FastAPI) -> None:
    try:
        await app.state._db.disconnect()
    except Exception as e:
        logger.warning("--- DB DISCONNECT ERROR ---")
        logger.warning(e)
        logger.warning("--- DB DISCONNECT ERROR ---")

