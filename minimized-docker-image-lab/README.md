# Minimized Docker Image Lab
This repo contains the experiment code of minimize docker image

## Minimize layer
This lab want to prove that reducing the docker image layer will truly decrease the file size\
By using `docker inspect` to see the actual layer of the image to make oneself have a deep understanding on how it works

```shell
$ cd minimize-layer
$ make
$ docker image inspect --format "{{json .RootFS.Layers}}" xxxx
```
> where xxxx represent the docker image name 

### Result
||origin|optimized|
|:--|:--:|:--:|
|Size|527 MB|522 MB|
|Layer|8|3|

## Multi-stage Build with Echo server
This lab provide a minimum example of how multi-stage build work

```shell
$ cd multi-stage
$ make
$ docker image inspect --format "{{json .RootFS.Layers}}" xxxx
```

### Result
||optimized|
|:--|:--:|
|Size|17.6 MB|
|Layer|2|

## Non-optimized with Echo server
This shows how big the image is with normal non-optimized dockerfile

```shell
$ cd non-optimized
$ make
$ docker image inspect --format "{{json .RootFS.Layers}}" xxxx
```

### Result
||non-optimized|
|:--|:--:|
|Size|1.18 GB|
|Layer|10|

## License
This project is licensed under MIT License, see the [LICENSE](./LICENSE) file for more detail
