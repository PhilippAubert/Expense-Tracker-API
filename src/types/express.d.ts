import type { User } from "../db/userQueries";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
