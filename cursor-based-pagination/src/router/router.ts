import express from "express";

import controller from "../controller/controller";
import userController from "../controller/user";
import middleware from "../middleware/middleware";

export const router = express.Router();

router.get("/", controller.healthHandler);
router.get(
  "/users/page",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersPageOffset
);
router.get(
  "/users/cursor",
  middleware.cursor(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersCursor
);
// deferred join
router.get(
  "/users/page/order",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersPageOffsetOrderUsername
);
router.get(
  "/users/cursor/order",
  middleware.cursor(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersCursorOrderUsername
);
router.get(
  "/users/deferred/pi/order",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersDeferredJoinPiOrder
);
router.get(
  "/users/deferred/si/order",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersDeferredJoinSiOrder
);
// deferred join sub query
router.get(
  "/users/deferred/pi/subquery",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersDeferredJoinPiSubquery
);
router.get(
  "/users/deferred/si/subquery",
  middleware.pageNumber(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersDeferredJoinSiSubquery
);
// sorted fields
router.get(
  "/users/sort-name",
  middleware.username(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersSortUsername
);
router.get(
  "/users/sort-multi",
  middleware.username(),
  middleware.createdAt(),
  middleware.pageLimit(),
  middleware.validation,
  userController.getUsersSortMulti
);
