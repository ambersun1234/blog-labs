import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../service/user";
import { SuccessMessages, Errors } from "../constant/constant";
import { logger } from "../logger/logger";
import { generateResponse } from "../share/share";
import { matchedData } from "express-validator";

export default {
    getUsers: async (req: Request, res: Response) => {
        try {
            const data = matchedData(req);

            const result = await userService.getUsersSlow(
                data.pageNumber,
                data.pageLimit
            );
            res.status(StatusCodes.OK).send(
                generateResponse(SuccessMessages.GetUsers, result)
            );
        } catch (error) {
            logger.error(Errors.InternalServerError, { error: error });
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
                generateResponse(Errors.InternalServerError)
            );
        }
    },
};
