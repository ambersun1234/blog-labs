# Swagger
This repository contains the minimal reproducible swagger code of multiple yamls

# Run
```shell
$ make
```

You can check the swagger doc at [http://localhost:3000](http://localhost:3000)

## swagger-jsdoc
Toggle the following import path to see different result
```javascript
import { option } from "./swagger-jsdoc/config.js";
// import { option } from "./swagger-combine/config.js";
```

## swagger-combine
Toggle the following import path to see different result
```javascript
// import { option } from "./swagger-jsdoc/config.js";
import { option } from "./swagger-combine/config.js";
```
