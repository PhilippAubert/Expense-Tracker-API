import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import { getAllUsers } from "../db/userQueries.js";

import { parseDBError } from "../middleware/dbErrorHandler.js";

export const getAll = async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const allUsers = await getAllUsers();
        return res.status(200).json({
            users: allUsers
        });
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}