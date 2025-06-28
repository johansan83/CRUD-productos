// ─── src/middlewares/logger.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de registro de peticiones HTTP.
 * Registra método, ruta, IP del cliente, estado de respuesta y tiempo de ejecución.
 */
const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Timestamp al inicio de la petición para cada request
    const timestampStart = new Date().toLocaleString();

    console.log(`[${timestampStart}] → ${req.method} ${req.url} - IP: ${req.ip}`);

    // Marca de tiempo para medir duración
    const startMs = Date.now();

    // Se ejecuta cuando la respuesta termina (headers enviados)
    res.on('finish', () => {
        const duration = Date.now() - startMs;
        const status = res.statusCode;
        const timestampEnd = new Date().toLocaleString();

        console.log(`[${timestampEnd}] ← Response ${status} - ${duration}ms`);
    });

    next(); // Continuar al siguiente middleware o ruta
};

export default LoggerMiddleware;
