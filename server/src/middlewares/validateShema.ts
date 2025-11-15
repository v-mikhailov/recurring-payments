import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError, sendError } from '../utils/appErrors';

export const validateShema = (shema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = shema.safeParse(req.body);
  if (!result.success) {
    const errors: Record<string, string> = {};
    
    result.error.errors.forEach((err) => {
      const field = err.path.join('.');
      errors[field] = err.message;
    });
    sendError(res, new AppError(400, 'Validation failed', errors));
    return;
  }

  req.body = result.data;
  next();
}