import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    id: number, 
    name: string,
    email:string,
    password: string
}

import type { JwtPayload } from "jsonwebtoken";

export interface JwtUserPayload extends JwtPayload {
    userId: number;
}

