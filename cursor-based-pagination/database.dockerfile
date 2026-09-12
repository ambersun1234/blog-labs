FROM mariadb:latest
COPY ./user.csv /
COPY ./post.csv /
COPY ./init.sql /docker-entrypoint-initdb.d/01.sql
COPY ./load.sql /docker-entrypoint-initdb.d/02.sql
