import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import { 
    getAllUsers, 
    getUserById 
} from "../db/userQueries.js";

import { parseDBError } from "../middleware/dbErrorHandler.js";
import { AppError } from "../middleware/errorHandler.js";

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

export const getOneUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        if (id != req.user.id) throw new AppError("Forbidden", 403);
        const user = await getUserById(Number(id));
        return res.status(200).json({
            user: user
        });
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}