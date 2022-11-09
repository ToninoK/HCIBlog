timeout = 60
worker_class = "uvicorn.workers.UvicornWorker"
graceful_timeout = 40
keepalive = 80  # nginx upstream_keepalive_timeout + 20
accesslog = "-"  # send access log to stdout
