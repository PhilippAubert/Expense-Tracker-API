import bcrypt from "bcrypt";


export const hashPw = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    return hashedPw;
}

export const parseDuplicateEntry = () => {

}

export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
