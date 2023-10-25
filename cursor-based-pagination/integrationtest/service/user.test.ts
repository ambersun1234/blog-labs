import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { PrismaClient } from "@prisma/client";

import * as database from "../../src/database/database";
import userService from "../../src/service/user";
import { logger } from "../../src/logger/logger";

describe("Users", () => {
  beforeEach(() => {
    logger.silent = true;
  });

  describe("test getUsersSlow", () => {
    let conn: PrismaClient;

    beforeEach(async () => {
      jest.resetAllMocks();
      conn = new PrismaClient();
      jest.spyOn(database, "newConnection").mockReturnValue(conn);
    });

    afterEach(async () => {
      await conn.$disconnect();
    });

    it("should get 2 users from page 1", async () => {
      const result = await userService.getUsersSlow(1, 2);
      const expectedResult = [
        {
          id: 1,
          username: "fZAxGMLFJU",
          created_at: new Date("2024-04-26T03:39:52.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 2,
          username: "LnJhEZFRlu",
          created_at: new Date("2025-06-07T01:21:27.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should get 2 users from page 100", async () => {
      const result = await userService.getUsersSlow(100, 2);
      const expectedResult = [
        {
          id: 199,
          username: "wqWZcakUZL",
          created_at: new Date("2024-05-21T15:07:14.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 200,
          username: "LfyzoKqnTT",
          created_at: new Date("2023-12-03T00:24:17.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("test getUsersFast", () => {
    let conn: PrismaClient;

    beforeEach(async () => {
      jest.resetAllMocks();
      conn = new PrismaClient();
      jest.spyOn(database, "newConnection").mockReturnValue(conn);
    });

    afterEach(async () => {
      await conn.$disconnect();
    });

    it("should get 2 users with cursor is 0", async () => {
      const result = await userService.getUsersFast(0, 2);
      const expectedResult = [
        {
          id: 1,
          username: "fZAxGMLFJU",
          created_at: new Date("2024-04-26T03:39:52.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 2,
          username: "LnJhEZFRlu",
          created_at: new Date("2025-06-07T01:21:27.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should get 2 users with cursor is 198", async () => {
      const result = await userService.getUsersFast(198, 2);
      const expectedResult = [
        {
          id: 199,
          username: "wqWZcakUZL",
          created_at: new Date("2024-05-21T15:07:14.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 200,
          username: "LfyzoKqnTT",
          created_at: new Date("2023-12-03T00:24:17.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("test getUsersSortUsername", () => {
    let conn: PrismaClient;

    beforeEach(async () => {
      jest.resetAllMocks();
      conn = new PrismaClient();
      jest.spyOn(database, "newConnection").mockReturnValue(conn);
    });

    afterEach(async () => {
      await conn.$disconnect();
    });

    it("should return 2 users without username", async () => {
      const result = await userService.getUsersSortUsername("", 2);
      const expectedResult = [
        {
          id: 9002,
          username: "AACqzEhoHp",
          created_at: new Date("2024-10-13T15:43:55.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 5321,
          username: "aACudPqXjB",
          created_at: new Date("2025-01-28T20:50:51.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should return 2 users with username equal to 'enRakcznil'", async () => {
      const result = await userService.getUsersSortUsername("enRakcznil", 2);
      const expectedResult = [
        {
          id: 2884,
          username: "eNrVMqImAg",
          created_at: new Date("2024-11-27T19:50:53.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 5108,
          username: "enwfBZYess",
          created_at: new Date("2025-02-19T14:20:34.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("test getUsersSortMulti", () => {
    let conn: PrismaClient;

    beforeEach(async () => {
      jest.resetAllMocks();
      conn = new PrismaClient();
      jest.spyOn(database, "newConnection").mockReturnValue(conn);
    });

    afterEach(async () => {
      await conn.$disconnect();
    });

    it("should return 2 users if username equal to 'enRakcznil' but created_at is empty", async () => {
      const result = await userService.getUsersSortMulti(
        "enRakcznil",
        new Date("3020-01-01T00:00:00"),
        2
      );
      const expectedResult = [
        {
          id: 905,
          username: "QSeEdMNqcg",
          created_at: new Date("2025-07-08T18:44:58.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 665,
          username: "MyhDTezztk",
          created_at: new Date("2025-07-08T17:44:32.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should return 2 users if username equal to 'enRakcznil' and created_at is '2025-07-08T18:00:00.000Z'", async () => {
      const result = await userService.getUsersSortMulti(
        "enRakcznil",
        new Date("2025-07-08T18:00:00.000Z"),
        2
      );
      const expectedResult = [
        {
          id: 665,
          username: "MyhDTezztk",
          created_at: new Date("2025-07-08T17:44:32.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
        {
          id: 9691,
          username: "WaKQouEEHM",
          created_at: new Date("2025-07-08T16:25:58.000Z"),
          updated_at: new Date("2023-10-23T09:58:36.034Z"),
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });
});
