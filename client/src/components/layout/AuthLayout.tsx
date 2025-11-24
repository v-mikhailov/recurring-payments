import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/providers/auth/useAuthContext';


export const AuthLayout = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <div className='bg-white max-w-[480px] w-full flex flex-col p-8 rounded-lg shadow-lg'>
        <Outlet /> 
      </div>
    </div>
  );
};