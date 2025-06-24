import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;  // O tu tipo personalizado de usuario
        }
    }
}

export {};