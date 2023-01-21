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


async def delete_post(post_id: int):
    async with (conn.cursor()) as cursor:
        q = "DELETE FROM posts WHERE id=%s"
        try:
            await cursor.execute(q, (post_id,))
        except Exception as e:
            print(e)


async def get_posts(sort, page, per_page, tags=None):
    async with (conn.cursor()) as cursor:
        q = "SELECT * FROM posts"
        if tags:
            tag_conditions = [f"'{tag}'=ANY(tags)" for tag in tags]
            q += f" WHERE {' AND '.join(tag_conditions)}"
        q += f" ORDER BY updated_at {sort}"
        offset = (page-1) * per_page
        q += f" LIMIT {per_page} OFFSET {offset}"

        await cursor.execute(q)
        result = await cursor.fetchall()
        return [dict(item) for item in result]


async def update_post(post_id: int, data: dict):
    async with (conn.cursor()) as cursor:
        update_fields = [f"{key}=%s" for key, val in data.items() if val is not None]
        q = f"UPDATE posts SET {','.join(update_fields)} WHERE id=%s RETURNING *"
        await cursor.execute(q, (*[val for _, val in data.items() if val is not None], post_id))
        result = await cursor.fetchone()
        return dict(result) if result else None
