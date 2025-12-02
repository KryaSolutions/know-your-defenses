FROM node:trixie-slim AS builder
WORKDIR /app

COPY ./package*.json /app/
RUN npm install -g bun

COPY . /app/
RUN bun ci
RUN bun run build

FROM node:trixie-slim AS production
WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

RUN npm install -g bun

ENV PORT=10201
ENV NODE_ENV=production
CMD [ "bun", "run", "prod" ]
