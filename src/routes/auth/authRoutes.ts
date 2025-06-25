// src/routes/auth/authRoutes.ts
import { Router } from "express";
import AuthController from "../../controllers/auth/authController";

const router = Router();
const controller = new AuthController();
router.post("/login", (req, res) => void controller.userLogin(req, res));
export default router;
