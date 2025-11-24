import { Outlet } from 'react-router-dom';


export const Layout = () => {
  return (
    <main className='w-full min-h-screen bg-[#F8F8F8]'>
      <Outlet />
    </main>
  );
};