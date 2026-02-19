import { query, body} from "express-validator";
import { validate } from "../middleware/validation.js";

export const listExpensesValidator = [
    query("filter")
        .optional()
        .isIn(["past_week", "past_month", "last_3_months", "custom"])
        .withMessage("Invalid filter type"),
    query("start")
        .if(query("filter").equals("custom"))
        .notEmpty().withMessage("Start date is required for custom filter")
        .isISO8601().withMessage("Start date must be a valid date (YYYY-MM-DD)"),
    
    query("end")
        .if(query("filter").equals("custom"))
        .notEmpty().withMessage("End date is required for custom filter")
        .isISO8601().withMessage("End date must be a valid date (YYYY-MM-DD)"),
    
    validate
];

export const expenseSchemaValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 100 }),
    body("category")
        .trim()
        .notEmpty().withMessage("Category is required"),
    body("expense")
        .isNumeric().withMessage("Expense must be a number")
        .custom((val) => val > 0).withMessage("Expense must be greater than 0"),
    validate
];
