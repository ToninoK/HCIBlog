from redis import Redis

from src.settings import config


class Cache:
    def __init__(self, namespace):
        self.namespace = namespace
        self.redis = Redis(host=config.REDIS_HOST, port=config.REDIS_PORT)
        self.ttl = 24 * 60 * 60

    def set(self, key, value, ttl):
        return self.redis.set(
            f"{self.namespace}:{key}", value, keepttl=(ttl or self.ttl)
        )

    def get(self, key):
        return self.redis.get(f"{self.namespace}:{key}")


acl_cache = Cache(namespace="acl")
mail_cache = Cache(namespace="mail")
