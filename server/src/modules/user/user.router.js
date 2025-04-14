import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();
console.log("login")
userRouter
  .get("/users", userController.getAllUsers)
  .post("/login", userController.createUser);

export default userRouter;
