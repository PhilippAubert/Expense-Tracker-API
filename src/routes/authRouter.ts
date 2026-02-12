import express from "express";

import { signin, signout, signup } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.route("/").get((req, res) => {
    console.log(req);
    res.json("this is the login route!");
});

authRouter.route("/signup").post(signup);
authRouter.route("/sigin").post(signin);
authRouter.route("/signout").post(signout);

export default authRouter;