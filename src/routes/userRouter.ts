import express from "express";

import { getAll } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/getAll").get(getAll);

export default userRouter;