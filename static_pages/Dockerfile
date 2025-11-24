FROM node:trixie-slim AS builder
WORKDIR /app

COPY ./package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

FROM node:trixie-slim AS production
WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

ENV PORT=10201
ENV NODE_ENV=production
CMD [ "npm", "run", "prod" ]
