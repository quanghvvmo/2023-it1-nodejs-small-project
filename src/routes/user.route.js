import express from "express";
import {
    loginController,
    addUserController,
    getUserDetailController,
    getListUsersController,
    updateUserController,
    activeUserController,
    inactiveUserController,
    hardDeleteUserController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", getListUsersController);
userRouter.get("/users/:id", getUserDetailController);

userRouter.post("/users/login", loginController);
userRouter.post("/users", addUserController);

userRouter.put("/users/:id", updateUserController);

userRouter.patch("/users/:id/active", activeUserController);
userRouter.patch("/users/:id/inactive", inactiveUserController);

userRouter.delete("/users/:id", hardDeleteUserController);

export default userRouter;
