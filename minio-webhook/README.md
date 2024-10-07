# MinIO Webhook
This project demonstrate how to use MinIO webhook feature and how to setup with MinIO Golang SDK

## Run Webhook Server
```shell
$ cd node
$ node server.js
```

Node Express server will listen on port 3000 by default, and now you can try to upload/delete file from MinIO `mybucket` bucket

## Run MinIO Server
```shell
$ docker-compose up -d
```

This command will start MinIO server with webhook feature enabled, 2 containers will be created, MinIO server and MinIO mc client, which will execute `mc` command to create bucket and register webhook event

### Register Webhook with MinIO Golang SDK
```shell
$ docker-compose up -d
```
> remember to comment out the mc section in `docker-compose.yml` file

```shell
$ cd golang
$ go run minio.go
```

The golang script will use MinIO Golang SDK to register webhook event with MinIO server\
and you can test with the Node Express webhook server to observe the event
