// ─── src/routes/auth/authRoutes.ts

import { Router } from "express";
import AuthController from "../../controllers/auth/authController";

const router = Router();
const controller = new AuthController();

/**
 * POST /auth/login
 * Endpoint para autenticación de usuario.
 * Recibe { email, password } en el body.
 * Responde con un token JWT en caso de credenciales válidas.
 */
router.post("/login", (req, res) =>
  void controller.userLogin(req, res)
);

export default router;
