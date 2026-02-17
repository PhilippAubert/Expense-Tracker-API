import type { Request, Response, NextFunction } from "express";

import { parseDBError } from "../middleware/dbErrorHandler.js";

export const getAllExpenses = async (_req:Request, res:Response, next:NextFunction) => {
    try {
        res.status(200).json("it worked!")
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const getExpenseById = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        res.status(200).json({"id": id});
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const addExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {body} = req;
        res.status(201).json(body)
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const deleteExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        res.status(204).json(`${id} deleted!`)
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}

export const updateExpense = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        res.status(201).json({"id": id, "value": body})
    } catch (e) {
        const dbError = parseDBError(e);
        if (dbError) return next(dbError);
        return next(e);
    }
}