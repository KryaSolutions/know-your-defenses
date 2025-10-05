FROM node:trixie-slim

WORKDIR /app
COPY ./package*.json /app/

RUN npm ci

COPY ./index.js /app

ENTRYPOINT ["node", "index.js"]
