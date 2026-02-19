import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import type { JwtUserPayload } from "../types/userTypes.js";

import { 
    addExpenseToDb, 
    deleteExpenseFromDb, 
    getAllExpenses, 
    getExpenseById, 
    updateExpenseToDb 
} from "../db/queries/expenseQueries.js";

import { parseDBError } from "../middleware/dbErrorHandler.js";

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
        const user = req.user as JwtUserPayload; 
        const userId = user["id"];
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
        const userId = user["id"];
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

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = req.user as JwtUserPayload; 
        const userId = user["id"];
        await deleteExpenseFromDb(Number(id), userId);
        return res.status(204).end(); 
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const updateExpense = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = req.user as JwtUserPayload; 
        const userId = user["id"];
        const updatedExpense = await updateExpenseToDb(Number(id), userId, req.body);
        res.status(201).json({"updated": updatedExpense});
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}