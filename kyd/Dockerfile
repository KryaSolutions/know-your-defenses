FROM oven/bun:latest AS builder

WORKDIR /app

COPY ./package*.json /app/

COPY . /app/
RUN bun ci
RUN bun run build

FROM oven/bun:latest AS production
WORKDIR /app

COPY --from=builder /app/dist dist/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

RUN bun add -g serve

ENV PORT=10200
ENV NODE_ENV=production
CMD ["serve", "-s", "dist", "-l", "10200"]
