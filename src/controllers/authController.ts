import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import type { JwtUserPayload } from "../types/userType.js";

import { JWT_SECRET_REFRESH } from "../env.js";

import {
    getUserByEmail, 
    refreshSession, 
    registerUser, 
    updateToken
} from "../db/queries/userQueries.js";

import { parseDBError } from "../middleware/dbErrorHandler.js";
import { AppError } from "../middleware/errorHandler.js";

import { 
    generateRefreshToken, 
    generateToken, 
    hashPw 
} from "../utils/authUtils.js";

const cookieOptions = {
    httpOnly: true,
    sameSite: "strict" as const,
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPw = await hashPw(password);
        const createdUser = await registerUser(name, email, hashedPw);
        
        if (createdUser) {
            const accessToken = generateToken(createdUser.insertId);
            
            res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

            return res.status(201).json({
                success: true,
                user: `User with id ${createdUser.insertId} created`
            });
        }
    } catch (error) {
        const dbError = parseDBError(error);
        if (dbError) return next(dbError);
        return next(error);
    }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) throw new AppError("Invalid email or password", 401);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new AppError("Invalid password", 401);

        const accessToken = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await updateToken(refreshToken, expiresAt, user.id);

        res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({ 
            success: true,
            message: "User signed in successfully", 
            data: { user: userWithoutPassword }
        });
    } catch (error) {
        return next(error);
    }
}

export const signout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (userId) {
            await updateToken(null, null, userId);
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        res.status(200).json({ 
            success: true, 
            message: "User signed out successfully" 
        });
    } catch (e) {
        next(e);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies["refreshToken"];

        if (!refreshToken) {
            throw new AppError("Refresh Token required", 400);
        }

        const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH) as JwtUserPayload;
        const isValid = await refreshSession(decoded.userId, refreshToken);
        
        if (!isValid) {
            throw new AppError("Invalid or expired refresh token", 403);
        }

        const newAccessToken = generateToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await updateToken(newRefreshToken, expiresAt, decoded.userId);

        res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        res.cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ success: true });
    } catch (error) {
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return next(new AppError("Session expired, please login again", 403));
    }
};
