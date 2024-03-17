#########################################
#   DEVELOPMENT STAGE
#########################################
FROM node:21-alpine as development

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci 

COPY --chown=node:node . .

USER node

ARG BACKEND_CONTAINER_PORT
ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG FRONTEND_HOST_DOMAIN

ENV NODE_ENV development
ENV BACKEND_CONTAINER_PORT=$BACKEND_CONTAINER_PORT
ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV FRONTEND_HOST_DOMAIN=$FRONTEND_HOST_DOMAIN

EXPOSE $BACKEND_CONTAINER_PORT

#########################################
#   BUILD STAGE
#########################################

FROM node:21-alpine as build

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --production && npm cache clean --force

USER node

#########################################
#   PRODUCTION STAGE
########################################

FROM node:21-alpine as production

WORKDIR /app

RUN apk add --no-cache libc6-compat

ARG BACKEND_CONTAINER_PORT
ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG FRONTEND_HOST_DOMAIN

ENV NODE_ENV production
ENV BACKEND_CONTAINER_PORT=$BACKEND_CONTAINER_PORT
ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV FRONTEND_HOST_DOMAIN=$FRONTEND_HOST_DOMAIN

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/main.js"]


