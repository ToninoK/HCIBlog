from src.models.connection import conn

from src.helpers.common import dict_to_db_format


async def create_tag(data: dict):
    async with (conn.cursor()) as cursor:
        db_format = dict_to_db_format(data)
        q = f"""
            INSERT INTO tags({db_format["fields_str"]})
            VALUES ({db_format["identifiers"]})
            ON CONFLICT (name, post_id) DO NOTHING
        """
        await cursor.execute(q, db_format["values"])


async def get_tags():
    async with (conn.cursor()) as cursor:
        q = "SELECT * FROM tags"
        await cursor.execute(q)
        result = await cursor.fetchall()
        return [dict(item) for item in result]
