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
    userController.getUsers
);