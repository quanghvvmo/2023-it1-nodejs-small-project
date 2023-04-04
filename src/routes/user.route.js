import express from "express";
import {
    addUserController,
    getUserDetailController,
    getListUsersController,
    updateUserController,
    activeUserController,
    inactiveUserController,
    hardDeleteUserController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/api/v1/users", getListUsersController);
userRouter.get("/api/v1/users/:id", getUserDetailController);

userRouter.post("/api/v1/users", addUserController);

userRouter.put("/api/v1/users/:id", updateUserController);

userRouter.patch("/api/v1/users/:id/active", activeUserController);
userRouter.patch("/api/v1/users/:id/inactive", inactiveUserController);

userRouter.delete("/api/v1/users/:id", hardDeleteUserController);

export default userRouter;
