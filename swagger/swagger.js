import express from "express";
import swaggerUi from "swagger-ui-express";

// import { option } from "./swagger-jsdoc/config.js";
import { option } from "./swagger-combine/config.js";

const uiOption = {
  swaggerOptions: {
    docExpansion: false,
  },
};

const app = express();
app.use("/", swaggerUi.serve, swaggerUi.setup(option, uiOption));
app.listen(3000);
