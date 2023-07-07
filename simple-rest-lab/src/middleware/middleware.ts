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
            res.status(StatusCodes.BAD_REQUEST).send(
                generateResponse(errors.array()[0].msg)
            );
            return;
        }
        next();
    },

    pageNumber: () =>
        query("pageNumber")
            .isString()
            .trim()
            .custom((pageNumber) => {
                if (pageNumber <= 0) {
                    logger.error(Errors.InvalidPageNumber, {
                        pageNumber: pageNumber,
                    });
                    throw new Error(Errors.InvalidPageNumber);
                }
                return true;
            }),

    cursor: () => query("cursor").optional(),

    pageLimit: () =>
        query("pageLimit")
            .isString()
            .trim()
            .custom((pageLimit) => {
                if (pageLimit <= 0) {
                    logger.error(Errors.InvalidPageLimit, {
                        pageLimit: pageLimit,
                    });
                    throw new Error(Errors.InvalidPageLimit);
                }
                return true;
            }),
};
