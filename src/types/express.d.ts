// ─── src/types/express.d.ts

import { JwtPayload } from "jsonwebtoken";

/**
 * Extiende globalmente la interfaz `Request` de Express para incluir
 * una propiedad opcional `user`, donde almacenamos datos del token JWT decodificado.
 */
declare global {
  namespace Express {
    interface Request {
      /**
       * Información del usuario extraída del token JWT.
       * Puede ser un `JwtPayload` (objeto) o un string (en casos especiales).
       */
      user?: string | JwtPayload;
    }
  }
}
