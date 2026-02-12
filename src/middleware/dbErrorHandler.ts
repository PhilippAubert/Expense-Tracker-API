import { AppError } from "./errorHandler.js";

export const parseDBError = (error: any): AppError | null => {
    if (error?.code !== "ER_DUP_ENTRY") return null;
    const msg = error.sqlMessage || "";
    if (msg.includes("users.username")) {
        return new AppError("Username already exists.", 409);
    }
    if (msg.includes("users.email")) {
        return new AppError("Email already registered.", 409);
    }
    return new AppError("Duplicate value exists.", 409);
}