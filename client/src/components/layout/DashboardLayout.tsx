import type { ReactNode } from 'react';

interface DashboardLayout {
  children: ReactNode;
}


export const DashboardLayout = ({ children }: DashboardLayout) => {
  return (
    <div data-tid="dashboard-layout" className='max-w-7xl ml-auto mr-auto pt-4'>
      {children}
    </div>
  );
};