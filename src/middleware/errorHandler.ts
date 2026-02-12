import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error"
        });
    } catch (e) {
        next(e);
    }
};

export const isDuplicateError = (error: any): boolean => {
    return error?.code === "ER_DUP_ENTRY";
};

export const getDuplicateMessage = (error: any): string => {
    const msg = error?.sqlMessage || "";

    if (msg.includes("users.username")) {
        return "Username already exists.";
    }
    if (msg.includes("users.email")) {
        return "Email already registered.";
    }

    return "Duplicate value exists.";
};


export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}