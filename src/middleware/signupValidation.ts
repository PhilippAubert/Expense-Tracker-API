import type {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { AppError } from "./errorHandler.js";

export const signupValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 1 }).withMessage("Username cannot be empty"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email"),
  body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (req:Request, _res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(err => err.msg).join(", ");
        return next(new AppError(msg, 400));
    }
    return next();
    }
];
