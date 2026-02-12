import jwt from "jsonwebtoken";
import { type StringValue } from "ms";

import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../env.js";

import { registerUser } from "../db/userQueries.js";
import { hashPw } from "../utils/authUtils.js";
import { AppError, getDuplicateMessage, isDuplicateError } from "../middleware/errorHandler.js";


export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPw = await hashPw(password);
        const result = await registerUser(name, email, hashedPw);
        if (result) {
            const token = jwt.sign({userId:result.insertId}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN  as unknown as StringValue})
            return res
                .status(201)
                .json({ success: true, user: `User with id ${result.insertId} created`, token });
        }
    } catch (error) {
        if (isDuplicateError(error)) {
            return next(new AppError(getDuplicateMessage(error), 409));
        }
        return next(error);
    }
};


export const signin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (req.body) {
            return res.status(200);
        }
    } catch (error) {
        return next(error);
    }
}

/*export const signout = async (req:Request, res:Response, next:NextFunction) => {} */