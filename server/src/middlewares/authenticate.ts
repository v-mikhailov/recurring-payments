import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';
import type { CustomJwtPayload } from '../utils/types';


export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    console.log('authHeader:', authHeader);
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (typeof decoded === 'string' || !decoded || typeof decoded !== 'object') {
      res.status(401).json({ error: 'Invalid token format' });
      return;
    }
    const payload = decoded as CustomJwtPayload;

    if (!payload.userId || !payload.login) {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    req.user = {
      userId: decoded.userId,
      login: decoded.login,
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }

}