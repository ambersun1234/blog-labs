import { createResponse } from "node-mocks-http";
import { Request } from "express";

import { Middleware } from "../type/type";

export async function testExpressValidatorMiddleware(
  req: Request,
  middlewares: Middleware[]
) {
  await Promise.all(
    middlewares.map(async (middleware: Middleware) => {
      await middleware(req, createResponse(), () => undefined);
    })
  );
}
