import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";

import { logger } from "./../logger/logger";
import { generateResponse, parseRequestBody } from "../share/share";
import { Errors } from "../constant/constant";

export default {
  httpInterceptor: (req: Request, res: Response, next: NextFunction) => {
    logger.http("Income request", parseRequestBody(req));
    next();
  },

  validation: (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(generateResponse(errors.array()[0].msg));
      return;
    }
    next();
  },

  pageNumber: () =>
    query("pageNumber").isInt({ min: 1 }).withMessage(Errors.InvalidPageNumber),

  cursor: () =>
    query("cursor")
      .optional()
      .isInt({ min: 1 })
      .withMessage(Errors.InvalidCursor),

  username: () =>
    query("username")
      .optional()
      .isString()
      .bail()
      .withMessage(Errors.InvalidUsername)
      .isLength({ min: 1 })
      .withMessage(Errors.InvalidUsername),

  createdAt: () =>
    query("createdAt")
      .optional()
      .isInt({ min: 1 })
      .withMessage(Errors.InvalidDate),

  pageLimit: () =>
    query("pageLimit").isInt({ min: 1 }).withMessage(Errors.InvalidPageLimit),
};
