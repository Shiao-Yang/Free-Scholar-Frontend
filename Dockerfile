FROM nginx:latest
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone
COPY ./dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/free_scholar.conf