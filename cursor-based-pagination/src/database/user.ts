import { PrismaClient } from "@prisma/client";

import { PrismaTransaction } from "../type/type";
import { UserResponse } from "../type/response";

export default {
  findUsersSlow: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;
    return conn.$queryRaw<UserResponse[]>`
            SELECT * FROM User LIMIT ${pageLimit} OFFSET ${startPoint};
        `;
  },

  findUsersFast: async (
    conn: PrismaClient,
    cursor: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    return conn.$queryRaw`
            SELECT * FROM User WHERE id > ${cursor} LIMIT ${pageLimit}
        `;
  },

  findUsersSortUsername: async (
    conn: PrismaClient,
    cursor: string,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    return conn.$queryRaw`
            SELECT * FROM User WHERE username > ${cursor} ORDER BY username LIMIT ${pageLimit}
        `;
  },

  findUsersSortMulti: async (
    conn: PrismaClient,
    username: string,
    createdAt: Date,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    return conn.$queryRaw`
            SELECT * FROM User
            WHERE (created_at < ${createdAt} OR 
                (created_at = ${createdAt} AND username > ${username})
            )
            ORDER BY created_at DESC, username
            LIMIT ${pageLimit}
        `;
  },
};
