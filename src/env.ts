import { config } from "dotenv";

config();

export const {
    PORT, 
    JWT_SECRET,
    JWT_EXPIRES_IN,
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASS
} = process.env;