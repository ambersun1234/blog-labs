# PostgreSQL GIST vs. GIN Index Benchmark Testing
This project aims to benchmark the difference between GIST and GIN index in postgresql

## Benchmark Result
### 10w Rows of Unique Data
![](./benchmark/unique/benchmark-unique.png)

### 66w Rows of Unique Data
![](./benchmark/unique-large/benchmark-unique-large.png)

## Run
```shell
$ taskset 0x2 docker run -d --name gist-gin-benchmark \
    -p 5555:5432 \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=admin \
    -e POSTGRES_DB=benchmark \
    postgres
$ docker cp fakeData/unique.csv gist-gin-benchmark:/
$ docker cp fakeData/unique-large.csv gist-gin-benchmark:/
$ npm i
$ npx prisma migrate dev
```

## Benchmark
```shell
$ make benchmark-unique

$ make benchmark-unique-large
```

## License
+ This project is licensed under MIT License, see the [LICENSE](./LICENSE) file for more detail