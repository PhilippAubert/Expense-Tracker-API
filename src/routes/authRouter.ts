import express from "express";

import { signin, signup } from "../controllers/authController.js";
import { signupValidator } from "../middleware/signupValidation.js";

export const authRouter = express.Router();

authRouter.route("/").get((req, res) => {
    console.log(req);
    res.json("this is the login route!");
});

authRouter.route("/signup").post(signupValidator, signup);
authRouter.route("/signin").post(signin);
/*authRouter.route("/signout").post(signout); */

export default authRouter;