import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    _req: Request,
    res: Response,
    next:NextFunction
) => {
    try {
        res.status(error.statusCode || 500).json({
            success:false, 
            error:error.message || "Server Error"
        });
    } catch(e) {
        next(e);
    }
}