import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../service/user";
import { SuccessMessages, Errors } from "../constant/constant";
import { logger } from "../logger/logger";
import { generateResponse } from "../share/share";
import { matchedData } from "express-validator";

export default {
  getUsersSlow: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersSlow(
        data.pageNumber,
        data.pageLimit
      );
      res
        .status(StatusCodes.OK)
        .send(generateResponse(SuccessMessages.GetUsers, result));
    } catch (error) {
      logger.error(Errors.InternalServerError, { error: error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(generateResponse(Errors.InternalServerError));
    }
  },

  getUsersFast: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersFast(
        data.cursor || 0,
        data.pageLimit
      );
      res
        .status(StatusCodes.OK)
        .send(generateResponse(SuccessMessages.GetUsers, result));
    } catch (error) {
      logger.error(Errors.InternalServerError, { error: error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(generateResponse(Errors.InternalServerError));
    }
  },

  getUsersSortUsername: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersSortUsername(
        data.username || "",
        data.pageLimit
      );
      res
        .status(StatusCodes.OK)
        .send(generateResponse(SuccessMessages.GetUsers, result));
    } catch (error) {
      logger.error(Errors.InternalServerError, { error: error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(generateResponse(Errors.InternalServerError));
    }
  },

  getUsersSortMulti: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersSortMulti(
        data.username || "",
        data.createdAt || new Date("3020-01-01T00:00:00"),
        data.pageLimit
      );
      res
        .status(StatusCodes.OK)
        .send(generateResponse(SuccessMessages.GetUsers, result));
    } catch (error) {
      logger.error(Errors.InternalServerError, { error: error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(generateResponse(Errors.InternalServerError));
    }
  },
};
