FROM node:trixie-slim AS builder

WORKDIR /app

COPY ./package*.json /app/
RUN npm install -g bun

COPY . /app/
RUN bun ci
RUN bun run build

FROM nginx AS production
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
