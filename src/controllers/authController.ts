import bcrypt from "bcrypt";

import type { 
    Request,
    Response,
    NextFunction
} from "express";


import { 
    getUserByEmail, 
    registerUser 
} from "../db/queries/userQueries.js";

import { parseDBError } from "../middleware/dbErrorHandler.js";
import { AppError } from "../middleware/errorHandler.js";

import { generateRefreshToken, generateToken, hashPw } from "../utils/authUtils.js";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPw = await hashPw(password);
        const createdUser = await registerUser(name, email, hashedPw);
        if (createdUser) {
            const token = generateToken(createdUser.insertId);
            return res.status(201).json({
                success: true,
                user: `User with id ${createdUser.insertId} created`,
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
                
        const accessToken = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        //ADD REFRESH TOKEN TO USER IN DB!

        return res.status(200).json({ success: true, message: "User signed in successfully", data : { accessToken, refreshToken, user}});
    } catch (error) {
        return next(error);
    }
}

export const signout = async (req:Request, res:Response, next:NextFunction) => {
    // TODO
    // 

    try {
        console.log(req.headers);

        ///DELETE REFERESH TOKEN! 
        res.status(200).json({message: "Trying to logout"})
    } catch (e) {
        next(e);
    }
}