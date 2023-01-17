# Step 1/2
FROM node:18-alpine as builder

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./

RUN npm run build

# Step 2/2
FROM nginx
EXPOSE 3000
COPY --from=builder /home/node/app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/build /usr/share/nginx/html
