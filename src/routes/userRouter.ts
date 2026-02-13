import express from "express";

import { getAll, getOneUser } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/get").get(getAll);
userRouter.route("/get/:id").get(getOneUser);

export default userRouter;