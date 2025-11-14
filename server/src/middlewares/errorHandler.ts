import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ERROR_CODES, ERROR_MESSAGES } from '../utils/errors';

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export const errorHandler = (error:  Error | AppError, req: Request, res: Response, next: NextFunction): void => {
  let statusCode = 500;
  let errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';
  let details: any = undefined;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION_FAILED;
    message = ERROR_MESSAGES[ERROR_CODES.VALIDATION_FAILED];
    details = Object.values((error as any).errors).map((err: any) => err.message);
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION_FAILED;
    message = 'Invalid ID format';
  }

  // MongoDB duplicate key errors
  if ((error as any).code === 11000) {
    statusCode = 400;
    errorCode = ERROR_CODES.DUPLICATE_ENTRY;
    message = ERROR_MESSAGES[ERROR_CODES.DUPLICATE_ENTRY];
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = ERROR_CODES.TOKEN_INVALID;
    message = ERROR_MESSAGES[ERROR_CODES.TOKEN_INVALID];
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    errorCode = ERROR_CODES.TOKEN_EXPIRED;
    message = ERROR_MESSAGES[ERROR_CODES.TOKEN_EXPIRED];
  }

  // Log errors for debugging
  console.error(`Error: ${error.message}`);
  if (error.stack) {
    console.error(error.stack);
  }

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details })
    }
  };

  res.status(statusCode).json(errorResponse);
}