import express from "express";
import { deleteExpense, getAllExpenses, getExpenseById, updateExpense, addExpense } from "../controllers/expenseController.js";


export const expenseRouter = express.Router();

expenseRouter.route("/all")
    .get(getAllExpenses);

expenseRouter.route("/add").
    post(addExpense)

expenseRouter.route("/:id")
    .get(getExpenseById)
    .delete(deleteExpense)
    .put(updateExpense)

export default expenseRouter;