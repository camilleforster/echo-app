# Container Setup

If you need to recreate the image, you will need to create a file called `.env` in this directory with the MYSQL_ROOT_PASSWORD variable defined.
Contact David for the password in use in the current image.

## Building Docker Images

```
docker build -f Dockerfile-api -t api_image .
docker build -f Dockerfile-db -t db_image .
```

## Launching Containers

```
docker compose -f splunge.yml --env-file .env -p t23project up -d
```

## Interacting with MySQL

### Command Line

```
mysql -h localhost -P 53346 --protocol=TCP -u root -p
```

When prompted to enter password, use the root password listed in your `.env` file.

You can interact with the project database in the MySQL CLI with `use echo_db`.

