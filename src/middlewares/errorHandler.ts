// ─── src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";

// Cargamos variables de entorno (si no se usan en este archivo,
// podrías remover estas líneas para evitar recarga innecesaria)
dotenv.config();
dotenvSafe.config();

/**
 * Middleware global de manejo de errores para Express.
 *
 * Este middleware:
 * 1. Determina el código de estado por `err.statusCode` o usa 500 por defecto.
 * 2. Registra el error con timestamp y pila de errores en consola.
 * 3. Envía una respuesta JSON con estructura uniforme:
 *    {
 *      status: "error",
 *      statusCode: number,
 *      message: string,
 *      stack?: string // solo en desarrollo
 *    }
 *
 * @param err Objeto de error capturado o pasado con next(err)
 * @param req Objeto de petición de Express
 * @param res Objeto de respuesta de Express
 * @param next Función para delegar al siguiente middleware (no se usa aquí)
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Código HTTP (Error personalizado o Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocurrió un error inesperado";

  // Registro del error en consola con fecha y detalles
  console.error(
    `[ERROR] ${new Date().toLocaleString()} - ${statusCode} - ${message}`
  );

  if (err.stack) {
    console.error(err.stack);
  }

  // Responder al cliente
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Mostrar pila de errores solo en entorno de desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
