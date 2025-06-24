import mysql, { PoolOptions } from 'mysql2';
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";

dotenv.config();
dotenvSafe.config();

/* interface PoolOptions {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    waitForConnections?: boolean;
    connectionLimit?: number;
    queueLimit?: number;
    }
*/

const access: PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const conn = mysql.createPool(access);

export default PoolOptions;