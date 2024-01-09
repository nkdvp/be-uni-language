# syntax = docker/dockerfile:1.3
FROM node:18.17-alpine3.18
# FROM docker.io/nkdvp/be-uni-language:v1.0
RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --production

RUN rm -rf src

ENV NODE_ENV=production

CMD ["npm","start"]