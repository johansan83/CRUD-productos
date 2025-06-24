import { Request, Response, NextFunction } from 'express';
import { timeStamp } from 'node:console';

const timestamp: string = new Date().toLocaleString();

const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${timestamp} ${req.method} ${req.url} - IP: ${req.ip} ]`);

    const start = Date.now();

    res.on('finish',() => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] Response: ${res.statusCode} - ${duration}ms`)
    })

    next();
};

export default LoggerMiddleware;