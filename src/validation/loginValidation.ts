import type { Request, Response, NextFunction } from "express";
import { body, type ValidationChain } from "express-validator";

import { validate } from "../middleware/validation.js";

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
