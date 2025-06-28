// ─── src/controllers/auth/authController.ts

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import conn from "../../../config/db";  // Conexión a MySQL

const secret = process.env.JWT_SECRET as string;

/**
 * Controlador para manejar autenticación a través de login.
 */
export default class AuthController {

  /**
   * POST /auth/login
   * - Verifica que el usuario exista en la base de datos por su email.
   * - Compara la contraseña recibida con el hash almacenado.
   * - Genera un JWT válido por 1 hora.
   * - Responde con el token o con mensajes de error claros.
   */
  public async userLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Buscar usuario por email
      const [rows] = await conn.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const user = Array.isArray(rows) && rows.length > 0 ? (rows[0] as any) : null;

      // Si no encuentra el usuario, error 401
      if (!user) {
        res.status(401).json({ message: "Usuario no encontrado" });
        return;
      }

      // Validar la contraseña usando bcrypt
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(403).json({ message: "Contraseña incorrecta" });
        return;
      }

      // Generar token JWT (payload: id y email)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: "1h" }
      );

      // Retornar el token como JSON
      res.json({ token });

    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
