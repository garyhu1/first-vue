FROM nginx
 
COPY dist/  /usr/share/nginx/html/
ADD nginx/default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *