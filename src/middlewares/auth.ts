import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as dotenvSafe from 'dotenv-safe';

dotenv.config();
dotenvSafe.config();

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token no suministrado' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (error, decodedToken) => {
        if (error) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        // Asegúrate de que decodedToken sea un JwtPayload y no una cadena
        if (typeof decodedToken !== 'object' || !decodedToken) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        // Aquí estamos asegurando que decodedToken es un JwtPayload
        req.user = decodedToken as JwtPayload;

        next(); // Llamar al siguiente middleware
    });
}

export default authenticateToken;
