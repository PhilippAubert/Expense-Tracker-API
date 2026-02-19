import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

import { AppError } from "./errorHandler.js";

export const validate = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(err => err.msg).join(", ");
        return next(new AppError(msg, 400));
    }
    return next();
};
