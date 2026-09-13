import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../service/user";
import { SuccessMessages, Errors } from "../constant/constant";
import { logger } from "../logger/logger";
import { generateResponse } from "../share/share";
import { matchedData } from "express-validator";

export default {
  getUsersPageOffset: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersPageOffset(
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

  getUsersCursor: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersCursor(
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

  getUsersPageOffsetOrderUsername: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersPageOffsetOderUsername(
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

  getUsersCursorOrderUsername: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersCursorOrderUsername(
        data.lastId || 0,
        data.lastUsername || "",
        data.pageLimit
      );
      console.log(result);
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

  getUsersDeferredJoinPiOrder: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersDeferredJoinPiOrder(
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

  getUsersDeferredJoinSiOrder: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersDeferredJoinSiOrder(
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

  getUsersDeferredJoinPiSubquery: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersDeferredJoinPiSubquery(
        data.pageNumber,
        data.pageLimit,
        data.order
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

  getUsersDeferredJoinSiSubquery: async (req: Request, res: Response) => {
    try {
      const data = matchedData(req);

      const result = await userService.getUsersDeferredJoinSiSubquery(
        data.pageNumber,
        data.pageLimit,
        data.order
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
