import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateShema = (shema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = shema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map((err)=> {
      return {
        message: err.message,
        field: err.path.join('.'),
      }
    });
    res.status(400).json({ errors });
    return;
  }

  req.body = result.data;
  next();
}