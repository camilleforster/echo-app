FROM mysql/mysql-server:latest
ADD init-db.sql /docker-entrypoint-initdb.d/init-db.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d
