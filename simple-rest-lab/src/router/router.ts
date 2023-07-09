import express from "express";

import controller from "../controller/controller";
import userController from "../controller/user";
import middleware from "../middleware/middleware";

export const router = express.Router();

router.get("/", controller.healthHandler);
router.get(
    "/users/slow",
    middleware.pageNumber(),
    middleware.pageLimit(),
    middleware.validation,
    userController.getUsersSlow
);
router.get(
    "/users/fast",
    middleware.cursor(),
    middleware.pageLimit(),
    middleware.validation,
    userController.getUsersFast
);
router.get(
    "/users/sort-name",
    middleware.username(),
    middleware.pageLimit(),
    middleware.validation,
    userController.getUsersSortUsername
);
