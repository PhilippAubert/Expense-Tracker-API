import type { RowDataPacket } from "mysql2";
import type { JwtPayload } from "jsonwebtoken";

export interface User extends RowDataPacket {
    id: number, 
    name: string,
    email: string,
    password: string
}

export interface JwtUserPayload extends JwtPayload {
    userId: number;
}