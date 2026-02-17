import jwt from "jsonwebtoken"

import type { Request, Response, NextFunction } from "express";
import type { JwtUserPayload } from "../types/userTypes.js";

import { JWT_SECRET } from "../env.js";
import { AppError } from "./errorHandler.js";
import { getUserById } from "../db/queries/userQueries.js";

export const authorize = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.["accessToken"];

        if (!token) {
            throw new AppError("No Token found", 401);
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
        const user = await getUserById(decoded.userId);
        
        if (!user) {
            throw new AppError("User not found", 401);
        }
        
        req.user = user;
        next();
    } catch (e) {
        return next(new AppError("Unauthorized", 401));
    }
}

