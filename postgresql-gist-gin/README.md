# PostgreSQL GIST vs. GIN Index Benchmark Testing
This project aims to benchmark the difference between GIST and GIN index in postgresql

## Benchmark Result
### 10w Rows of Unique Data
![](./benchmark/unique/benchmark-unique.png)

### 66w Rows of Unique Data
![](./benchmark/unique-large/benchmark-unique-large.png)

### 10w Rows of String Array with Size 10
![](./benchmark/string-array/benchmark-string-array.png)

### 10w Rows of String Array with Size 20
![](./benchmark/string-array-large/benchmark-string-array-large.png)

## Run
```shell
$ make init
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