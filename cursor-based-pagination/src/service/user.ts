import { newConnection } from "../database/database";
import { UserResponse } from "./../type/response";
import userDB from "../database/user";
import { logger } from "../logger/logger";
import { Errors } from "../constant/constant";

export default {
  getUsersSlow: async (
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    try {
      const connection = newConnection();
      result = await userDB.findUsersSlow(connection, pageNumber, pageLimit);
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: error,
      });
      throw new Error(Errors.InternalServerError);
    }

    return result;
  },

  getUsersFast: async (
    cursor: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    try {
      const connection = newConnection();
      result = await userDB.findUsersFast(connection, cursor, pageLimit);
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: error,
      });
      throw new Error(Errors.InternalServerError);
    }

    return result;
  },

  getUsersSortUsername: async (
    username: string,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    try {
      const connection = newConnection();
      result = await userDB.findUsersSortUsername(
        connection,
        username,
        pageLimit
      );
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: error,
      });
      throw new Error(Errors.InternalServerError);
    }

    return result;
  },

  getUsersSortMulti: async (
    username: string,
    createdAt: Date,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    try {
      const connection = newConnection();
      result = await userDB.findUsersSortMulti(
        connection,
        username,
        createdAt,
        pageLimit
      );
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: error,
      });
      throw new Error(Errors.InternalServerError);
    }

    return result;
  },
};
