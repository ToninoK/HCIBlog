from src.models.connection import conn

from src.helpers.common import dict_to_db_format


async def create_post(data: dict):
    async with (conn.cursor()) as cursor:
        db_format = dict_to_db_format(data)
        q = f"""INSERT INTO posts({db_format["fields_str"]}) VALUES ({db_format["identifiers"]}) RETURNING *"""
        await cursor.execute(q, db_format["values"])
        result = await cursor.fetchone()
        return dict(result) if result else None


async def get_post(post_id: int):
    async with (conn.cursor()) as cursor:
        q = "SELECT * FROM posts WHERE id=%s"
        await cursor.execute(q, (post_id,))
        result = await cursor.fetchone()
        return dict(result) if result else None


async def get_posts(tags=None, sort=None):
    async with (conn.cursor()) as cursor:
        q = "SELECT * FROM posts"
        if tags:
            tag_conditions = [f"'{tag}'=ANY(tags)" for tag in tags]
            q += f" WHERE {' AND '.join(tag_conditions)}"
        if sort:
            q += f" ORDER BY updated_at {sort}"
        await cursor.execute(q)
        result = await cursor.fetchall()
        return [dict(item) for item in result]


async def update_post(post_id: int, data: dict):
    async with (conn.cursor()) as cursor:
        update_fields = [f"{key}='{val}'" for key, val in data.items() if val is not None]
        q = f"UPDATE posts SET {','.join(update_fields)} WHERE id=%s RETURNING *"
        await cursor.execute(q, (post_id,))
        result = await cursor.fetchone()
        return dict(result) if result else None
