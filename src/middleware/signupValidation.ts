import { body } from "express-validator";
import { validate } from "./validate.js";

export const signupValidator = [
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
