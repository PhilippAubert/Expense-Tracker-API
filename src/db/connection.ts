import mysql from "mysql2";
import { DB_HOST, DB_NAME, DB_USER } from "../env.js";

export const pool = mysql.createPool({
    host: DB_HOST ?? "",
    user: DB_USER ?? "",
    database: DB_NAME ?? "",
    password: "",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    multipleStatements: true
}).promise();
