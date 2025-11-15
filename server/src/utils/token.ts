import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = '24h';

if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required');
  process.exit(1);
}

export interface UserPayload {
  userId: string;
  login: string;
}

export const signToken = (payload:UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
}

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
}