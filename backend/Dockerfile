FROM node:trixie-slim

WORKDIR /app
COPY ./package*.json /app/

RUN npm ci

COPY ./index.js /app

EXPOSE 10101

ENTRYPOINT ["npm", "run"]
CMD ["server"]
