FROM python:3.10-alpine

WORKDIR "/app"

COPY ./requirements.txt ./

RUN apk update && apk add git &&\
    pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . /app

RUN pip install -e .

CMD ["gunicorn", "src.app:app", "--config=config/gunicorn_config.py", "--forwarded-allow-ips='*'", "--bind=:8000", "--preload"]
