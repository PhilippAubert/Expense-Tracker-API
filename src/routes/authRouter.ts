import express from "express";

import { refresh, signin, signout, signup } from "../controllers/authController.js";
import { signinValidator, signupValidator } from "../validation/loginValidation.js";
import { authorize } from "../middleware/authorize.js";

export const authRouter = express.Router();

authRouter.route("/signup").post(signupValidator, signup);
authRouter.route("/signin").post(signinValidator, signin);
authRouter.post("/signout", authorize, signout);
authRouter.post("/refresh", refresh);

export default authRouter;