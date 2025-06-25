// app.ts
import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import * as dotenvSafe from "dotenv-safe";
import cors from "cors";
import productRouter from "./routes/products/productsRoutes";
import LoggerMiddleware from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routes/auth/authRoutes";
import authenticateToken from './middlewares/auth';

dotenv.config();
dotenvSafe.config();

const port = parseInt(process.env.PORT as string, 10) || 3000;
const apiKey = process.env.API_KEY as string;
const app = express();
//const options: = process.env.CORS_OPTIONS;

//app.use(cors(CORS_OPTIONS));
// Middlewares
app.use(LoggerMiddleware);
app.use(express.json());

// Rutas
app.use('/products', productRouter);

// Ruta de prueba para generar un error intencional
app.get('/error',(req, res, next) => {
  // Aquí usamos next() para pasar el error al siguiente middleware (el manejador de errores)
  next(new Error('Error intencional'))
});

app.use("/auth", authRouter);

app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Ruta principal
app.get("/", (req, res) => {
  res.send("Imprimir en pantalla");
});

// Middleware de manejo de errores (al final, después de todas las rutas)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});