import { newConnection } from "../database/database";
import { UserResponse } from "./../type/response";
import userDB from "../database/user";
import { logger } from "../logger/logger";
import { Errors } from "../constant/constant";

export default {
  getUsersPageOffset: async (
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    let connection;
    try {
      connection = newConnection();
      result = await userDB.findUsersPageOffset(connection, pageNumber, pageLimit);
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
      throw new Error(Errors.InternalServerError);
    } finally {
      await connection?.$disconnect()
    }

    return result;
  },

  getUsersCursor: async (
    cursor: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    let connection;
    try {
      connection = newConnection();
      result = await userDB.findUsersCursor(connection, cursor, pageLimit);
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
      throw new Error(Errors.InternalServerError);
    } finally {
      await connection?.$disconnect()
    }

    return result;
  },

  getUsersSortUsername: async (
    username: string,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    let connection;
    try {
      connection = newConnection();
      result = await userDB.findUsersSortUsername(
        connection,
        username,
        pageLimit
      );
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
      throw new Error(Errors.InternalServerError);
    } finally {
      await connection?.$disconnect()
    }

    return result;
  },

  getUsersSortMulti: async (
    username: string,
    createdAt: Date,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    let result: UserResponse[] = [];

    let connection;
    try {
      connection = newConnection();
      result = await userDB.findUsersSortMulti(
        connection,
        username,
        createdAt,
        pageLimit
      );
      logger.info("Successfully get users");
    } catch (error) {
      logger.error("Encounter error, abort", {
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
      throw new Error(Errors.InternalServerError);
    } finally {
      await connection?.$disconnect()
    }

    return result;
  },
};
