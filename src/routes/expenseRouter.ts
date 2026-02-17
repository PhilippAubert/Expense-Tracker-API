import express from "express";
import { deleteExpense, listExpenses, getOneExpense, updateExpense, addExpense } from "../controllers/expenseController.js";


export const expenseRouter = express.Router();

expenseRouter.route("/all").get(listExpenses);

expenseRouter.route("/add").post(addExpense);

expenseRouter.route("/:id")
    .get(getOneExpense)
    .delete(deleteExpense)
    .put(updateExpense);

export default expenseRouter;