import express from "express";
import { Request, Response, Express } from "express";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";

import { EXPRESS_PORT } from "./env";
import { logger } from "./logger/logger";
import { router } from "./router/router";
import middleware from "./middleware/middleware";

const app: Express = express();
app.use(express.json());
app.use(middleware.httpInterceptor);
app.use("/", router);
app.all("*", (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send();
});

app.listen(EXPRESS_PORT, () => {
    logger.info("Server is running", { port: EXPRESS_PORT });
});
