// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token no suministrado" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || typeof decoded !== "object") {
      res.status(403).json({ error: "Token inválido" });
      return;
    }
    req.user = decoded as JwtPayload;
    next();
  });
}
