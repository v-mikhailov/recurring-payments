import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useAuth } from '../../hooks/useAuth';


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
}