import type { Request, Response, NextFunction } from "express";


export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email, password, name} = req.body;
        res.json({"email": email, "password":password, "name":name})
    } catch(e){
        console.error(e);
    }
}

export const signin = async (req:Request, res:Response, next:NextFunction) => {}

export const signout = async (req:Request, res:Response, next:NextFunction) => {}