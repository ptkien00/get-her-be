# Base Layer
FROM node:16.13.2 AS base
WORKDIR /get-her
COPY package*.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --non-interactive --frozen-lockfile
COPY . .

# Build Layer
FROM base AS builder
WORKDIR /get-her
COPY --from=base /get-her ./
ENV NODE_ENV="production"
RUN yarn build

# Package install Layer
FROM node:16.13.2-slim As node_modules
WORKDIR /get-her
COPY package*.json ./
COPY prisma ./prisma/
RUN npm set-script prepare ""
RUN yarn install --non-interactive --frozen-lockfile --prod

# Production Run Layer
FROM node:16.13.2 AS production
WORKDIR /get-her
COPY --from=base /get-her/docker-entrypoint.sh ./
COPY --from=builder /get-her/dist ./dist
COPY --from=node_modules /get-her/prisma ./prisma
COPY --from=node_modules /get-her/node_modules ./node_modules
EXPOSE 3000
RUN npx prisma generate
CMD node dist/src/main

# https://zenn.dev/necocoa/articles/nestjs-docker
# https://zenn.dev/kazumax4395/articles/427cc791f6145b
# https://qiita.com/taquaki-satwo/items/f8fbe8b1efc4b2323ae7
