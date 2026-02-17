import type { Request, Response, NextFunction } from "express";

import { parseDBError } from "../middleware/dbErrorHandler.js";
import { addExpenseToDb, deleteExpenseFromDb, getAllExpenses, getExpenseById, updateExpenseToDb } from "../db/queries/expenseQueries.js";
import type { JwtUserPayload } from "../types/userTypes.js";


export const listExpenses = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.user?.id;
        const allExpenses = await getAllExpenses(userId);
        res.status(200).json({"expenses": allExpenses});
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const getOneExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const userId = req.user?.id;
        const expense = await getExpenseById(Number(id), userId);
        res.status(200).json({"expense": expense});
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}
export const addExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as JwtUserPayload; 
        const userId = user.userId;
        const insertId = await addExpenseToDb(userId, req.body);
        res.status(201).json({
            id: insertId,
            userId,
            ...req.body
        });
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const deleteExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const {userId} = req.user as JwtUserPayload; 

        const deletedExpense = await deleteExpenseFromDb(Number(id), userId)
        res.status(204).json(`${deletedExpense} deleted!`);
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const updateExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const { userId } = req.user as JwtUserPayload; 
        const { body } = req.body;
        const updatedExpense = updateExpenseToDb(Number(id), userId, body);
        res.status(201).json({"updated": updatedExpense});
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}