import { connection } from "../database/database";
import { PrismaTransaction } from "../type/type";
import { UserResponse } from "./../type/response";
import userDB from "../database/user";
import { logger } from "../logger/logger";
import { Errors, SuccessMessages } from "../constant/constant";

export default {
    getUsersSlow: async (
        pageNumber: number,
        pageLimit: number
    ): Promise<UserResponse[]> => {
        let result: UserResponse[] = [];

        try {
            await connection.$transaction(async (tx: PrismaTransaction) => {
                result = await userDB.findUsersSlow(tx, pageNumber, pageLimit);
            });
            logger.info("Successfully get users");
        } catch (error) {
            logger.error("Rollback transaction, encounter error", {
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
            await connection.$transaction(async (tx: PrismaTransaction) => {
                result = await userDB.findUsersFast(tx, cursor, pageLimit);
                logger.info("Successfully get users");
            });
        } catch (error) {
            logger.error("Rollback transaction, encounter error", {
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
            await connection.$transaction(async (tx: PrismaTransaction) => {
                result = await userDB.findUsersSortUsername(
                    tx,
                    username,
                    pageLimit
                );
                logger.info("Successfully get users");
            });
        } catch (error) {
            logger.error("Rollback transaction, encounter error", {
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
            await connection.$transaction(async (tx: PrismaTransaction) => {
                result = await userDB.findUsersSortMulti(
                    tx,
                    username,
                    createdAt,
                    pageLimit
                );
                logger.info("Successfully get users");
            });
        } catch (error) {
            logger.error("Rollback transaction, encounter error", {
                error: error,
            });
            throw new Error(Errors.InternalServerError);
        }

        return result;
    },
};
