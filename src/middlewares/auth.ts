// ─── src/middlewares/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Middleware para proteger rutas mediante autenticación JWT.
 *
 * - Extrae el token JWT del encabezado `Authorization: Bearer <token>`
 * - Si no existe o es inválido, responde con el código HTTP apropiado (401 o 403)
 * - Si es válido, decodifica el token y lo añade al objeto `req.user` como `JwtPayload`
 * - Llama a `next()` para continuar al siguiente handler
 *
 * @param req Objeto de petición de Express
 * @param res Objeto de respuesta de Express
 * @param next Función para pasar al siguiente middleware o controlador
 */
export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Recuperar token del header Authorization
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token no suministrado" });
    return;
  }

  // Verificar token usando la clave secreta del entorno
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || typeof decoded !== "object") {
      res.status(403).json({ error: "Token inválido" });
      return;
    }

    // Adjuntar payload decodificado a la petición
    req.user = decoded as JwtPayload;

    // Continuar con la siguiente función
    next();
  });
}
