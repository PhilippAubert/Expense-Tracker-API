import express from "express";

import { signin, signup } from "../controllers/authController.js";
import { signinValidator, signupValidator } from "../validation/loginValidation.js";

export const authRouter = express.Router();

authRouter.route("/").get((_req, res) => {
    res.json("this is the login route!");
});

authRouter.route("/signup").post(signupValidator, signup);
authRouter.route("/signin").post(signinValidator, signin);
/*authRouter.route("/signout").post(signout); */

export default authRouter;