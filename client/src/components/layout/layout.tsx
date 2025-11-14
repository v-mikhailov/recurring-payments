import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='w-full min-h-screen bg-[#F8F8F8]'>
      {children}
    </main>
  );
};