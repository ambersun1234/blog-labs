# Cursor Based Pagination

This repo contains the minimal Node.js Backend RESTful API

## Prerequisites

```shell
$ make docker-create
$ make docker-start
```

## Benchmark

![](./benchmark.png)

```shell
$ make benchmark
$ eog ./benchmark.png
```

![](./benchmark-sort.png)

```shell
$ make benchmark-sort
$ eog ./benchmark-sort.png
```

## Test
```shell
$ make docker-start
$ make test
```

Total coverage report

File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s      
----------------|---------|----------|---------|---------|------------------------
All files       |   81.48 |       75 |   84.37 |   80.76 |                        
 src            |     100 |      100 |     100 |     100 |                        
  env.ts        |     100 |      100 |     100 |     100 |                        
 src/constant   |     100 |      100 |     100 |     100 |                        
  constant.ts   |     100 |      100 |     100 |     100 |                        
 src/database   |   92.85 |      100 |   88.88 |    92.3 |                        
  database.ts   |      75 |      100 |       0 |   66.66 | 4                      
  user.ts       |     100 |      100 |     100 |     100 |                        
 src/logger     |      75 |    66.66 |     100 |      75 |                        
  logger.ts     |      75 |    66.66 |     100 |      75 | 9-10                   
 src/middleware |   61.11 |        0 |   71.42 |   61.11 |                        
  middleware.ts |   61.11 |        0 |   71.42 |   61.11 | 11-23                  
 src/service    |   80.48 |      100 |     100 |   80.48 |                        
  user.ts       |   80.48 |      100 |     100 |   80.48 | ...2,39-42,63-66,89-92 
 src/share      |   66.66 |      100 |       0 |      50 |                        
  share.ts      |   66.66 |      100 |       0 |      50 | 6,13                   
 src/util       |     100 |      100 |     100 |     100 |                        
  util.ts       |     100 |      100 |     100 |     100 |                        
 unittest       |     100 |      100 |     100 |     100 |                        
  constant.ts   |     100 |      100 |     100 |     100 |                        
----------------|---------|----------|---------|---------|------------------------



## Unit test
```shell
$ make unit-test
```

## Integration Test
```shell
$ make docker-start
$ make integration-test
```