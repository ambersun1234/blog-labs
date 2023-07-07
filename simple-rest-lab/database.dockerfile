FROM mariadb:latest
COPY ./user.csv /
COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./load.sql /docker-entrypoint-initdb.d/