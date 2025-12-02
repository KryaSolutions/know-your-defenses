FROM node:trixie-slim

WORKDIR /app
COPY ./package*.json /app/

RUN npm install -g bun
RUN bun ci

COPY . .

RUN bun run build

ENTRYPOINT ["bun", "run"]
CMD ["server"]
