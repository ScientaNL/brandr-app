FROM node:10-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN yarn && \
    yarn run build --aot --prod

FROM nginx:alpine

ARG APP_VERSION

ENV APP_VERSION=$APP_VERSION

RUN mkdir -p /dist

COPY --from=builder /app/dist/brandr /dist
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

STOPSIGNAL SIGTERM
