FROM node:trixie-slim

WORKDIR /app
COPY ./package*.json /app/

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 10101

ENTRYPOINT ["npm", "run"]
CMD ["server"]
