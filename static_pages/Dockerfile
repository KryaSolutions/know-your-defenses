FROM node:trixie-slim AS builder

WORKDIR /app

COPY ./package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "10201"]
