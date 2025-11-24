import { api } from './api';
import { jwtDecode } from 'jwt-decode';
import type { AuthResponse, LoginCredentials, RegisterCredentials, DecodedToken} from '../types/auth';

const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const authService = {
  login: (credentials: LoginCredentials): Promise<AuthResponse>  => {
    return api.post<AuthResponse, LoginCredentials>('/auth/login', credentials);
  },

  register: (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return api.post<AuthResponse, RegisterCredentials>('/auth/register', credentials);
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  saveToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getUserFromToken: () => {
    const token = authService.getToken();
    if (!token) return null;
    
    const payload = decodeToken(token);
    if (!payload) return null;

    return {
      id: payload.userId,
      login: payload.login,
    };
  },

  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    if (!token) return false;

    const payload = decodeToken(token);
    if (!payload || !payload.exp) return false;

    return payload.exp * 1000 > Date.now();
  }
}