import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT } from "./env.js";

import { authRouter } from "./routes/authRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authorize } from "./middleware/authorize.js";
import userRouter from "./routes/userRouter.js";
import expenseRouter from "./routes/expenseRouter.js";

dotenv.config();

const port = PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

app.use("/", authRouter);
app.use("/users", authorize, userRouter);
app.use("/expenses/", authorize, expenseRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));