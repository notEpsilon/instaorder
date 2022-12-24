import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __cookie_ttl__ = 1000 * 60 * 60 * 24 * 7;
export const __session_secret__ = process.env.SESSION_SECRET!;
