// ─── src/config/db.ts

import mysql, { PoolOptions } from 'mysql2/promise';
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";

// Carga variables de entorno (.env) y asegura que todas estén presentes.
dotenv.config();
dotenvSafe.config();

interface MySqlPoolOptions extends mysql.PoolOptions {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    waitForConnections?: boolean;
    connectionLimit?: number;
    queueLimit?: number;
}

/*
 * Configuración de conexión al pool de MySQL.
 * Lee parámetros del entorno y define valores por defecto
 */

const access: MySqlPoolOptions  = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Crear pool de conexiones a MySQL
const conn = mysql.createPool(access);

export default conn;