import { UserResponse } from "./../type/response";
import { PrismaClient } from "@prisma/client";
import { PrismaTransaction } from "../type/type";

export default {
  findUsersPageOffset: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;
    return conn.$queryRaw<UserResponse[]>`
            SELECT * FROM User LIMIT ${pageLimit} OFFSET ${startPoint};
        `;
  },

  findUsersCursor: async (
    conn: PrismaClient,
    cursor: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    return conn.$queryRaw`
            SELECT * FROM User WHERE id > ${cursor} LIMIT ${pageLimit}
        `;
  },

  findUsersPageOffsetOrderUsername: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;
    return conn.$queryRaw<UserResponse[]>`
            SELECT * FROM User
            ORDER BY username DESC, id DESC
            LIMIT ${pageLimit} OFFSET ${startPoint}
        `;
  },

  findUsersCursorOrderUsername: async (
    conn: PrismaClient,
    lastUsername: string,
    lastId: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    if (lastUsername === "" && lastId === 0) {
      return conn.$queryRaw`
            SELECT * FROM User
            ORDER BY username DESC, id DESC
            LIMIT ${pageLimit}
        `;
    }
    return conn.$queryRaw`
            SELECT * FROM User 
            WHERE (username, id) < (${lastUsername}, ${lastId})
            ORDER BY username DESC, id DESC
            LIMIT ${pageLimit}
        `;

    // [{"id":"1","select_type":"SIMPLE","table":"User","type":"index","possible_keys":null,"key":"ci_username_id_key","key_len":"770","ref":null,"rows":"1000","Extra":"Using where"}]
  },

  findUsersDeferredJoinPiOrder: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;
    return conn.$queryRaw<UserResponse[]>`
      SELECT u.* FROM User AS u JOIN (
        SELECT id FROM User
        ORDER BY username DESC, id DESC
        LIMIT ${pageLimit} OFFSET ${startPoint}
      ) AS temp ON u.id = temp.id
      ORDER BY username DESC, id DESC
    `;

    // [{"id":"1","select_type":"PRIMARY","table":"<derived2>","type":"ALL","possible_keys":null,"key":null,"key_len":null,"ref":null,"rows":"11000","Extra":"Using temporary; Using filesort"},{"id":"1","select_type":"PRIMARY","table":"u","type":"eq_ref","possible_keys":"PRIMARY","key":"PRIMARY","key_len":"4","ref":"temp.id","rows":"1","Extra":""},{"id":"2","select_type":"DERIVED","table":"User","type":"index","possible_keys":null,"key":"ci_username_id_key","key_len":"770","ref":null,"rows":"199875","Extra":"Using index"}]
  },

  findUsersDeferredJoinSiOrder: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;
    return conn.$queryRaw<UserResponse[]>`
      SELECT u.* 
      FROM (
          SELECT username, id 
          FROM User
          ORDER BY username DESC, id DESC
          LIMIT ${pageLimit} OFFSET ${startPoint}
      ) AS temp 
      STRAIGHT_JOIN User AS u FORCE INDEX (si_username_key)
      ON u.username = temp.username AND u.id = temp.id
      ORDER BY username DESC, id DESC
    `;

    // [{"id":"1","select_type":"PRIMARY","table":"<derived2>","type":"ALL","possible_keys":null,"key":null,"key_len":null,"ref":null,"rows":"11000","Extra":"Using temporary; Using filesort"},{"id":"1","select_type":"PRIMARY","table":"u","type":"eq_ref","possible_keys":"si_username_key","key":"si_username_key","key_len":"766","ref":"temp.username","rows":"1","Extra":"Using index condition"},{"id":"2","select_type":"DERIVED","table":"User","type":"index","possible_keys":null,"key":"ci_username_id_key","key_len":"770","ref":null,"rows":"199875","Extra":"Using index"}]
  },

  findUsersDeferredJoinPiSubquery: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number,
    order: string
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;

    switch (order) {
      case "sa":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (PRIMARY)
            ORDER BY id ASC, postname ASC
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
          ORDER BY id ASC, postname ASC
        `;
      case "sd":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (PRIMARY)
            ORDER BY id DESC, postname DESC
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
          ORDER BY id DESC, postname DESC
        `;
      case "n":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (PRIMARY)
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
        `;
      default:
        return Promise.resolve() as unknown as UserResponse[];
    }
  },

  findUsersDeferredJoinSiSubquery: async (
    conn: PrismaClient,
    pageNumber: number,
    pageLimit: number,
    order: string
  ): Promise<UserResponse[]> => {
    const startPoint = (pageNumber - 1) * pageLimit;

    switch (order) {
      case "sa":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (si_postname_key)
            ORDER BY id ASC, postname ASC
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
          ORDER BY id ASC, postname ASC
        `;
      case "sd":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (si_postname_key)
            ORDER BY id DESC, postname DESC
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
          ORDER BY id DESC, postname DESC
        `;
      case "n":
        return conn.$queryRaw<UserResponse[]>`
          SELECT p.* FROM Post p JOIN (
            SELECT id FROM Post
            FORCE INDEX (si_postname_key)
            LIMIT ${pageLimit} OFFSET ${startPoint}
          ) temp ON p.id = temp.id
        `;
      default:
        return Promise.resolve() as unknown as UserResponse[];
    }
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
