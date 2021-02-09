FROM node:10-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN yarn && \
    yarn run build --aot --prod

FROM nginx:alpine

ARG APP_VERSION

RUN mkdir -p /dist

COPY --from=builder /app/dist/brandr /dist
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

RUN envsubst '$${APP_VERSION}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf.template

STOPSIGNAL SIGTERM
