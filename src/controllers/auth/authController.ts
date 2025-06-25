// src/controllers/auth/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import conn from "../../../config/db";

const secret = process.env.JWT_SECRET as string;

export default class AuthController {
  public async userLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const [rows] = await conn.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const user = Array.isArray(rows) && rows.length > 0
        ? (rows[0] as any)
        : null;
      if (!user) {
        res.status(401).json({ message: "Usuario no encontrado" });
        return;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(403).json({ message: "Contraseña incorrecta" });
        return;
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
