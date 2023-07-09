import { PrismaTransaction } from "../type/type";
import { UserResponse } from "../type/response";

export default {
    findUsersSlow: async (
        tx: PrismaTransaction,
        pageNumber: number,
        pageLimit: number
    ): Promise<UserResponse[]> => {
        const startPoint = (pageNumber - 1) * pageLimit;
        return tx.$queryRaw<UserResponse[]>`
            SELECT * FROM User LIMIT ${pageLimit} OFFSET ${startPoint};
        `;
    },

    findUsersFast: async (
        tx: PrismaTransaction,
        cursor: number,
        pageLimit: number
    ): Promise<UserResponse[]> => {
        return tx.$queryRaw`
            SELECT * FROM User WHERE id > ${cursor} LIMIT ${pageLimit}
        `;
    },

    findUsersSortUsername: async (
        tx: PrismaTransaction,
        cursor: string,
        pageLimit: number
    ): Promise<UserResponse[]> => {
        return tx.$queryRaw`
            SELECT * FROM User WHERE username > ${cursor} ORDER BY username LIMIT ${pageLimit}
        `;
    },

    findUsersSortMulti: async (
        tx: PrismaTransaction,
        username: string,
        createdAt: Date,
        pageLimit: number
    ): Promise<UserResponse[]> => {
        return tx.$queryRaw`
            SELECT * FROM User
            WHERE (created_at < ${createdAt} OR 
                (created_at = ${createdAt} AND username > ${username})
            )
            ORDER BY created_at DESC, username
            LIMIT ${pageLimit}
        `;
    },
};
