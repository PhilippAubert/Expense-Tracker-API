import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";
import { type StringValue } from "ms";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../env.js";

import { getUserByEmail, registerUser } from "../db/userQueries.js";
import { hashPw } from "../utils/authUtils.js";
import { parseDBError } from "../middleware/dbErrorHandler.js";
import { AppError } from "../middleware/errorHandler.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPw = await hashPw(password);
        const result = await registerUser(name, email, hashedPw);
        if (result) {
            const token = jwt.sign({ userId: result.insertId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as unknown as StringValue });
            return res.status(201).json({
                success: true,
                user: `User with id ${result.insertId} created`,
                token
            });
        }
    } catch (error) {
        const dbError = parseDBError(error);
        if (dbError) return next(dbError);
        return next(error);
    }
};


export const signin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError("Invalid password", 401);
        }
                
        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN as unknown as StringValue});
            return res.status(200)
                .json({ success:true, message: "User signed in successfully", data :{ token, user}});
    } catch (error) {
        return next(error);
    }
}

/*export const signout = async (req:Request, res:Response, next:NextFunction) => {} */