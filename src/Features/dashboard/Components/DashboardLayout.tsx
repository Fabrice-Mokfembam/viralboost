import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
     
      <main className="w-full min-h-screen max-w-3xl md:mx-auto bg-gray-900" >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;