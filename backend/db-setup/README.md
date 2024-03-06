# Database Setup

If you need to recreate the image, you will need to create a file called
`t23image.env` in this directory with the MYSQL_ROOT_PASSWORD variable defined.
Contact David for the password in use in the current image.

## Building Docker Image

```
docker build -t t23image .
```

## Launching Container

```
docker compose -f splunge.yml --env-file t23image.env -p t23image_1 up -d
```

## Interacting with MySQL

### Command Line

```
mysql -h localhost -P 53316 --protocol=TCP -u root -p
```

When prompted to enter password, use the root password listed in your `t23image.env` file.

You can interact with the project database in the MySQL CLI with `use echo_db`.
