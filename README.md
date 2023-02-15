# HCIBlog

This app is a personal blog. It will consist of a simple CMS and a public app which will serve as a blog.
What follows is a list of documentation created in the process of creating the app.

## Report

Notion HCI report for the application: [Report](https://sassy-wakeboard-90d.notion.site/HCIBlog-069748c83e3b4950a40d5446202ced13)

## Local Development

To run the project locally you first have to build the docker images. To do this simply run the following command

```bash
docker compose -f docker-compose.dev.yml build
```

Once the build is done you can run the containers.

```bash
docker compose -f docker-compose.dev.yml up
```

Contrary to what the logs say, the backend is not running at localhost:8000 and the frontend is not running at localhost:3000.
They are both proxied by the nginx server. Frontend is located at localhost:80 while backend is located at localhost:80/api.

To enter inside a docker container, IE the postgres container (to be able to change the data by hand for example) run the following command:

```bash
docker exec -it <docker_container> <command>
```

Example:

```bash
docker exec -it blog_db psql blog_db -U blogger
```

Hot reloads should be working both for frontend and backend.
