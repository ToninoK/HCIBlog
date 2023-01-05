from src.models.connection import conn

from src.helpers.common import dict_to_db_format


async def get_user(email: str = None):
    async with (conn.cursor()) as cursor:
        q = "SELECT * FROM users WHERE email=%s"
        await cursor.execute(q, (email,))
        result = await cursor.fetchone()
        return dict(result) if result else None


async def create_user(data: dict):
    async with (conn.cursor()) as cursor:
        db_format = dict_to_db_format(data)
        q = f"""INSERT INTO users({db_format["fields_str"]}) VALUES ({db_format["identifiers"]}) RETURNING *"""
        await cursor.execute(q, db_format["values"])
        result = await cursor.fetchone()
        return dict(result) if result else None
