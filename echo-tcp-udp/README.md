# Echo TCP/UDP
This project is a TCP/UDP echo server and client.\
Wrote with pure golang

## Docker Compose
```shell
$ docker-compose up -d --build
```

## Manual Run
### TCP
```go
$ TYPE=server PROTOCOL=tcp go run .
$ TYPE=client PROTOCOL=tcp go run .
```

### UDP Unicast
```go
$ TYPE=server PROTOCOL=udpu go run .
$ TYPE=client PROTOCOL=udpu go run .
```

### UDP Multicast
```go
$ TYPE=server PROTOCOL=udpm go run .
$ TYPE=client PROTOCOL=udpm go run .
```

note that run UDP multicast on single machine is not supported\
You'll have to run it on on different machines\
or use docker instead