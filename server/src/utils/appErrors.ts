import { Response } from 'express';
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string>;
}

export class AppError extends Error {
  public statusCode: number;
  public errors?: Record<string, string>;

  constructor(statusCode: number, message: string, errors?: Record<string, string>) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
  }
}

export const sendError = (res: Response, error: any) => {
  if (error instanceof AppError) {
    const response: any = { error: error.message};

    if (error.errors) {
      response.errors = error.errors;
    }
    return res.status(error.statusCode).json(response);
  }

  // MongoDB errors
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (error.name === 'ValidationError') {
    const errors: Record<string, string> = {};

    Object.values(error.errors).forEach((err: any) => {
      errors[err.path] = err.message;
    });
    return res.status(400).json({ error: 'Validation failed', errors });
  }

  console.log(error);
  return res.status(500).json({ error: 'Internal server error' });
}

export const ErrorTypes = {
  CONFLICT: (errors: Record<string, string>) =>
    new AppError(409, 'Conflict', errors),

  UNAUTHORIZED: (message = 'Invalid credentials') =>
    new AppError(401, message),

  NOT_FOUND: (message = 'Payment not found') =>
    new AppError(404, message),
};