import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import type { LoginCredentials, RegisterCredentials, AuthError, User } from '../types/auth';
import { ApiError } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setUser(authService.getUserFromToken());
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (token: string) => {
    authService.saveToken(token);
    setUser(authService.getUserFromToken());
    navigate('/dashboard');
  };

  const handleAuthError = (err: unknown) => {
    if (err instanceof ApiError) {
      const errorData = err.data as AuthError;
      if (errorData?.errors) {
        setError(Object.values(errorData.errors).join(', '));
      } else {
        setError(errorData?.error || 'Authentication failed');
      }
    } else {
      setError('A network error occurred');
    }
    throw err;
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      handleAuthSuccess(response.token);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(credentials);
      handleAuthSuccess(response.token);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return {
    user,
    isAuthenticated: authService.isAuthenticated(),
    login,
    register,
    logout,
    loading,
    error,
  };
};