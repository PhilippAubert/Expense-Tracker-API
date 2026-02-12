import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler.js";
import { JWT_SECRET } from "../env.js";
import { getUserById } from "../db/userQueries.js";
import type { JwtUserPayload } from "../types/userType.js";

export const authorize = async (req:Request, _res:Response, next:NextFunction) => {
    try {
        let token; 
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token) throw new AppError("Unauthorized!", 401);
        const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
        const user = await getUserById(decoded.userId);
        if (!user) throw new AppError("Unauthorized", 401);
        req.user = user;
    } catch (e) {
        return next(e);
    }
}