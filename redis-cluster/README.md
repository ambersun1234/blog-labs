# Redis Cluster
This repo contains a simple Redis Cluster/Redis Sentinel setup using Docker Compose.

## Master-Slave & Sentinel
### Run
```shell
$ cd sentinel-master-slave
$ make up
```

### Log
To see the full log of how Redis Sentinel works, please refer to [log](sentinel-master-slave/log).\
or run manually by yourself

## Cluster Mode
### Run
```shell
$ cd cluster
$ make up
```
