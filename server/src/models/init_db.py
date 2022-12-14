from src.models.connection import conn

CREATE_TABLES_QUERY = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(80),
        last_name VARCHAR(80),
        username VARCHAR(80),
        password VARCHAR(120),
        email VARCHAR(80) UNIQUE,
        description VARCHAR(512),
        facebook VARCHAR(512),
        github VARCHAR(512),
        linkedin VARCHAR(512),
        instagram VARCHAR(512),
        created_at DATE NOT NULL DEFAULT NOW(),
        updated_at DATE NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        title VARCHAR(80),
        content JSONB,
        tags TEXT[],
        created_at DATE NOT NULL DEFAULT NOW(),
        updated_at DATE NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(80) UNIQUE,
        post_id INT REFERENCES posts(id),
        created_at DATE NOT NULL DEFAULT NOW(),
        updated_at DATE NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS tag_name_idx ON tags (name);
"""


async def create_tables():
    async with (conn.cursor()) as cursor:
        try:
            await cursor.execute(CREATE_TABLES_QUERY)
        except Exception as e:
            raise Exception from e
        print("Table creation done")
