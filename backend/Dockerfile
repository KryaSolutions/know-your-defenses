FROM oven/bun:latest

WORKDIR /app
COPY ./package*.json /app/

RUN bun ci

COPY . .

RUN bun run build

ENTRYPOINT ["bun", "run"]
CMD ["server"]
