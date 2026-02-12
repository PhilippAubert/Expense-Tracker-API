import { config } from "dotenv";

config();

const requireEnv = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const PORT = requireEnv("PORT", process.env["PORT"]);
export const JWT_SECRET = requireEnv("JWT_SECRET", process.env["JWT_SECRET"]);
export const JWT_EXPIRES_IN = requireEnv("JWT_EXPIRES_IN", process.env["JWT_EXPIRES_IN"]);
export const DB_NAME = requireEnv("DB_NAME", process.env["DB_NAME"]);
export const DB_HOST = requireEnv("DB_HOST", process.env["DB_HOST"]);
export const DB_USER = requireEnv("DB_USER", process.env["DB_USER"]);
export const TEST_TOKEN = requireEnv("TEST_TOKEN", process.env["TEST_TOKEN"]);
export const TEST_ID = requireEnv("TEST_TOKEN", process.env["TEST_ID"]);