FROM nginx:stable-alpine
COPY deploy/docker/nginx.conf /etc/nginx/nginx.conf
COPY deploy/docker/default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
