import express from "express";
import { 
    deleteExpense, 
    listExpenses, 
    getOneExpense, 
    updateExpense, 
    addExpense 
} from "../controllers/expenseController.js";

import { 
    listExpensesValidator, 
    expenseSchemaValidator 
} from "../validation/expenseValidation.js"


export const expenseRouter = express.Router();

expenseRouter.route("/all").get(listExpensesValidator, listExpenses);

expenseRouter.route("/add").post(expenseSchemaValidator, addExpense);

expenseRouter.route("/:id")
    .get(getOneExpense)
    .delete(deleteExpense)
    .put(expenseSchemaValidator, updateExpense);

export default expenseRouter;