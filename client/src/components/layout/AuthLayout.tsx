import type { ReactNode } from 'react';

interface AuthLayout {
  children: ReactNode;
}


export const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <div className='bg-white max-w-[480px] w-full flex flex-col p-8 rounded-lg shadow-lg'>
        {children}
      </div>
    </div>
  );
};