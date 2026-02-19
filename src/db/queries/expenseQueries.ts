import type { 
    ResultSetHeader, 
    RowDataPacket 
} from "mysql2";

import type { CreateExpenseInput, Expense } from "../../types/expenseTypes.js";

import { pool } from "../connection.js";

export const addExpenseToDb = async (userId: number, expenseData: CreateExpenseInput): Promise<number> => {
    const { title, category, expense } = expenseData;
    const values = [userId, title, category, expense];
    const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO expenses (userId, title, category, expense) VALUES (?, ?, ?, ?)",
        values
    );

    return result.insertId;
};

export const getAllExpenses = async (userId: number, startDate?: string, endDate?: string): Promise<Expense[]> => {
    let query = "SELECT * FROM expenses WHERE userId = ?";
    const params: any[] = [userId];

    if (startDate && endDate) {
        query += " AND createdAt BETWEEN ? AND ?";
        params.push(startDate, endDate);
    } else if (startDate) {
        query += " AND createdAt >= ?";
        params.push(startDate);
    }

    query += " ORDER BY createdAt DESC";

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
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

export const updateExpenseToDb = async (expenseId: number, userId: number, data: CreateExpenseInput) => {
    const { title, category, expense } = data;
    const [result] = await pool.query<ResultSetHeader>(
        "UPDATE expenses SET title = ?, category = ?, expense = ? WHERE id = ? AND userId = ?",
        [title, category, expense, expenseId, userId]
    );
    
    return result.affectedRows > 0;
};

export const deleteExpenseFromDb = async (expenseId: number, userId: number) => {
    const [result] = await pool.query<ResultSetHeader>(
        "DELETE FROM expenses WHERE id = ? AND userId = ?",
        [expenseId, userId]
    );
    return result.affectedRows > 0;
};

