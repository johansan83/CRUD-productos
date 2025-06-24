import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";
dotenv.config();
dotenvSafe.config();

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Occurrio un error inesperado';

    console.error(
        `[ERROR] ${new Date().toLocaleString()} - ${statusCode} - ${message}`
    );

    if (err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

export default errorHandler;