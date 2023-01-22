from src.models.connection import conn

CREATE_TABLES_QUERY = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(80),
        last_name VARCHAR(80),
        username VARCHAR(80),
        password VARCHAR(120),
        email VARCHAR(80) UNIQUE,
        description VARCHAR(2000),
        facebook VARCHAR(512),
        github VARCHAR(512),
        linkedin VARCHAR(512),
        instagram VARCHAR(512),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        title VARCHAR(80),
        content JSONB,
        tags TEXT[],
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(80),
        post_id INT REFERENCES posts(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT tag_post_unique UNIQUE (name, post_id)
    );

    CREATE INDEX IF NOT EXISTS tag_name_idx ON tags (name);
    
    ALTER TABLE users ADD COLUMN IF NOT EXISTS profile text;

    ALTER TABLE users ALTER COLUMN description TYPE VARCHAR(2000);
"""


async def create_tables():
    async with (conn.cursor()) as cursor:
        try:
            await cursor.execute(CREATE_TABLES_QUERY)
        except Exception as e:
            raise Exception from e
        print("Table creation done")
