import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";



import { registerUser } from "../db/users.js";
import { AppError, hashPw } from "../utils/authUtils.js";
import { getDuplicateMessage, isDuplicateError } from "../middleware/errorHandler.js";


export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPw = await hashPw(password);
        const result = await registerUser(name, email, hashedPw);
        if (result) {
            return res.status(201).json({ success: true });
        }
    } catch (error) {
        if (isDuplicateError(error)) {
            return next(new AppError(getDuplicateMessage(error), 409));
        }
        return next(error);
    }
};


/* export const signin = async (req:Request, res:Response, next:NextFunction) => {}

export const signout = async (req:Request, res:Response, next:NextFunction) => {} */