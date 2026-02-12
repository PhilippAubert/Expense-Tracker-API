import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import { registerUser } from "../db/users.js";

export const signup = async (req:Request, res:Response, __next:NextFunction) => {
    const {name, email, password} = req.body;
    const result = await registerUser(name, email, password);
    console.log(result);
    if (result) {
        res.status(200).json({"success":true})
    }
/*     try {
    } catch(e){
        console.error(e);
    } */
}

/* export const signin = async (req:Request, res:Response, next:NextFunction) => {}

export const signout = async (req:Request, res:Response, next:NextFunction) => {} */