import type { Request, Response, NextFunction } from "express";
import { body, validationResult, type ValidationChain } from "express-validator";

import { AppError } from "../middleware/errorHandler.js";


export const validate = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(err => err.msg).join(", ");
        return next(new AppError(msg, 400));
    }
    return next();
};

export const signupValidator:(ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] = [
    body("name")
        .trim()
        .notEmpty().withMessage("Username is required"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validate
];

export const signinValidator:(ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required").isEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required"),
    validate
];
