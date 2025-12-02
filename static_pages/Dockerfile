FROM oven/bun:latest AS builder
WORKDIR /app

COPY ./package*.json /app/

COPY . /app/
RUN bun ci
RUN bun run build

FROM oven/bun:latest AS production
WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

ENV PORT=10201
ENV NODE_ENV=production
CMD [ "bun", "run", "prod" ]
