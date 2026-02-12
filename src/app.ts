import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { PORT } from "./env.js";
import { authRouter } from "./routes/authRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const port = PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.use("/", authRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));