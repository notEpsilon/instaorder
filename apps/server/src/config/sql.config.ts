import { config } from "mssql";
import dotenv from "dotenv";

/** Configure environment variables */
dotenv.config();

/**
 * MSSQL Server configuration
 */
export const SQLConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST!,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};
