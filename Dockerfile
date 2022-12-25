# FROM node:19.3.0-slim
FROM node:19.3.0-slim as node
FROM ubuntu:22.04 as base

RUN apt-get update \
    && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 3000

COPY --from=node /usr/local/include/ /usr/local/include/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/bin/ /usr/local/bin/

# reset symlinks
RUN corepack disable && corepack enable

# create node user and group, then create app dir
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node \
    && mkdir /app \
    && mkdir /app/node_modules \
    && chown -R node:node /app \
    && chown -R node:node /app/node_modules

WORKDIR /app
USER node
COPY --chown=node:node package*.json yarn*.lock ./
RUN npm ci --only=production && npm cache clean --force

FROM base as dev
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install --only=development && npm cache clean --force
