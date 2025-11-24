export interface LoginCredentials {
  login: string;
  password: string;
  email?: string;
}

export interface RegisterCredentials {
  login: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  user: {
    login: string;
    email?: string;
  };
  token: string;
}

export interface AuthError {
  error?: string;
  errors?: Record<string, string>;
}

export interface DecodedToken {
  userId: string;
  login: string;
  exp: number;
  iat: number;
}

export interface User {
  id: string;
  login: string;
}