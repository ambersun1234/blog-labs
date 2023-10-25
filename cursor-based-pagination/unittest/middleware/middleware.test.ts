import { describe, expect, it } from "@jest/globals";
import { createRequest } from "node-mocks-http";
import { validationResult } from "express-validator";

import { testExpressValidatorMiddleware } from "../../src/util/util";
import middleware from "../../src/middleware/middleware";
import { RequestErrorTemplate } from "../constant";
import { Errors } from "../../src/constant/constant";

describe("Middleware", () => {
  describe("pageNumber", () => {
    const validators = [middleware.pageNumber()];

    it("should pass if pageNumber is valid", async () => {
      const validValues = [1, 1e3];

      for (const value of validValues) {
        const request = createRequest({ query: { pageNumber: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([]);
      }
    });

    it("should return error if pageNumber is invalid", async () => {
      const invalidValues = ["abc", -100];

      for (const value of invalidValues) {
        const request = createRequest({ query: { pageNumber: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);
        expect(result.array()).toEqual([
          {
            ...RequestErrorTemplate,
            value,
            msg: Errors.InvalidPageNumber,
            path: "pageNumber",
            location: "query",
          },
        ]);
      }
    });
  });

  describe("pageLimit", () => {
    const validators = [middleware.pageLimit()];

    it("should pass if pageLimit is valid", async () => {
      const validValues = [1, 1e3];

      for (const value of validValues) {
        const request = createRequest({ query: { pageLimit: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([]);
      }
    });

    it("should return error if pageLimit is invalid", async () => {
      const invalidValues = ["abc", -100];

      for (const value of invalidValues) {
        const request = createRequest({ query: { pageLimit: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);
        expect(result.array()).toEqual([
          {
            ...RequestErrorTemplate,
            value,
            msg: Errors.InvalidPageLimit,
            path: "pageLimit",
            location: "query",
          },
        ]);
      }
    });
  });

  describe("cursor", () => {
    const validators = [middleware.cursor()];

    it("should pass if cursor is valid", async () => {
      const validValues = [1, 1e3];

      for (const value of validValues) {
        const request = createRequest({ query: { cursor: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([]);
      }
    });

    it("should return error if cursor is invalid", async () => {
      const invalidValues = ["abc", -100];

      for (const value of invalidValues) {
        const request = createRequest({ query: { cursor: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);
        expect(result.array()).toEqual([
          {
            ...RequestErrorTemplate,
            value,
            msg: Errors.InvalidCursor,
            path: "cursor",
            location: "query",
          },
        ]);
      }
    });
  });

  describe("username", () => {
    const validators = [middleware.username()];

    it("should pass if username is valid", async () => {
      const validValues = ["ambersun", "ambersun1234"];

      for (const value of validValues) {
        const request = createRequest({ query: { username: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([]);
      }
    });

    it("should return error if username is invalid", async () => {
      const invalidValues = ["", 1];

      for (const value of invalidValues) {
        const request = createRequest({ query: { username: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([
          {
            ...RequestErrorTemplate,
            value,
            msg: Errors.InvalidUsername,
            path: "username",
            location: "query",
          },
        ]);
      }
    });
  });

  describe("createdAt", () => {
    const validators = [middleware.createdAt()];

    it("should pass if createdAt is valid", async () => {
      const validValues = [1, 1e3];

      for (const value of validValues) {
        const request = createRequest({ query: { createdAt: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([]);
      }
    });

    it("should return error if createdAt is invalid", async () => {
      const invalidValues = [0, "apple", "2020-01-01"];

      for (const value of invalidValues) {
        const request = createRequest({ query: { createdAt: value } });
        await testExpressValidatorMiddleware(request, validators);
        const result = validationResult(request);

        expect(result.array()).toEqual([
          {
            ...RequestErrorTemplate,
            value,
            msg: Errors.InvalidDate,
            path: "createdAt",
            location: "query",
          },
        ]);
      }
    });
  });
});
