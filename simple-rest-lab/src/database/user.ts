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
};