FROM nginx:1.19.1-alpine
WORKDIR /usr/share/nginx/html
COPY ./application/build ./
EXPOSE 80
