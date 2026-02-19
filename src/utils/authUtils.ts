import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { type StringValue } from "ms";

import { JWT_EXPIRES_IN, JWT_SECRET, JWT_SECRET_REFRESH } from "../env.js";

export const hashPw = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const generateToken = (id: number) => {
    return jwt.sign({userId: id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN as unknown as StringValue});
}

export const generateRefreshToken = (id: number) => {
    return jwt.sign({userId: id}, JWT_SECRET_REFRESH, {expiresIn: JWT_EXPIRES_IN as unknown as StringValue});
}

export const cookieOptions = {
    httpOnly: true,
    sameSite: "strict" as const,
};