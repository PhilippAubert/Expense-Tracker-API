import type { 
    ResultSetHeader, 
    RowDataPacket 
} from "mysql2";

import type { Expense } from "../../types/expenseTypes.js";

import { pool } from "../connection.js";

export const getAllExpenses = async (userId: number): Promise<Expense[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM expenses WHERE userId = ?",
        [userId]
    );
    return rows as Expense[];
};

export const getExpenseById = async (expenseId: number, userId: number): Promise<Expense | null> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM expenses WHERE id = ? AND userId = ?",
        [expenseId, userId]
    );
    
    if (rows.length === 0) return null;
    return rows[0] as Expense;
};

export const updateExpense = async (expenseId: number, userId: number, data: Partial<Expense>) => {
    const [result] = await pool.query<ResultSetHeader>(
        "UPDATE expenses SET title = ?, category = ?, expense = ? WHERE id = ? AND userId = ?",
        [data.title, data.category, data.expense, expenseId, userId]
    );
    
    return result.affectedRows > 0;
};

export const deleteExpense = async (expenseId: number, userId: number) => {
    const [result] = await pool.query<ResultSetHeader>(
        "DELETE FROM expenses WHERE id = ? AND userId = ?",
        [expenseId, userId]
    );
    
    return result.affectedRows > 0;
};

