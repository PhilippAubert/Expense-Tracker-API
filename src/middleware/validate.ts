import type { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

import { AppError } from "./errorHandler.js";

export const validate = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(err => err.msg).join(", ");
        return next(new AppError(msg, 400));
    }
    return next();
};
