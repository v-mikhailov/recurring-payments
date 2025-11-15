import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        login: string;
      };
    }
  }
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  login: string;
}