// ─── src/app.ts

import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";
import cors from "cors";

import productRouter from "./routes/products/productsRoutes"; // Rutas para CRUD de productos
import authRouter from "./routes/auth/authRoutes"; // Rutas de autenticación (login)
import LoggerMiddleware from "./middlewares/logger"; // Registro de peticiones
import authenticateToken from "./middlewares/auth"; // Validación JWT
import errorHandler from "./middlewares/errorHandler"; // Captura y formatea errores

dotenv.config(); // Carga variables de entorno desde .env
dotenvSafe.config(); // Verifica que las variables obligatorias estén definidas

const app = express();
const port = parseInt(process.env.PORT as string, 10) || 3000;

// Configuración CORS
const corsOptionsEnv = process.env.CORS_OPTIONS || "";
const allowedOrigins = corsOptionsEnv.split(",").map((o) => o.trim());

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, ok?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Permitir si es Postman o frontend en lista blanca
    } else {
      callback(new Error(`CORS: origen ${origin} no permitido`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Habilita CORS con configuración personalizada

// Middlewares globales
app.use(LoggerMiddleware); // Log de peticiones (método, URL, tiempo, etc.)
app.use(express.json()); // Parseo automático de JSON en el body

// Rutas principales
app.use("/products", productRouter); // CRUD productos: GET, POST, PUT, DELETE
app.use("/auth", authRouter); // Autenticación: login

// Ruta para generación intencional de error (testing de errorHandler)
app.get("/error", (req, res, next) => {
  next(new Error("Error intencional"));
});

// Ruta protegida: devuelve perfil del usuario si el token JWT es válido
app.get("/profile", authenticateToken, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

// Ruta raíz pública
app.get("/", (req, res) => {
  res.send("Imprimir en pantalla");
});

// Manejador de errores al final de todas las rutas
app.use(errorHandler);

// Arranque del servidor
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
