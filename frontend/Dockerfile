FROM node:trixie-slim AS builder

WORKDIR /app

COPY ./package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

FROM nginx AS production
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
