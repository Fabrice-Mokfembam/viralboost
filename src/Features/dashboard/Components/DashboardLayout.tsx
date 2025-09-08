import { NavLink, Outlet } from 'react-router-dom';
import { Home, CheckSquare, Users, User, Globe2, Menu } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
     

      {/* Main content */}
      <main className="flex-grow relative w-full max-w-3xl md:mx-auto bg-gray-900 pt-6 pb-20 px-4">
         <header className="w-full bg-gray-900 sticky top-0 z-50 flex items-center justify-between px-6 py-3">
        <div className="text-cyan-500 font-bold text-xl">
          Viral Boost
        </div>
        <div className="flex items-center space-x-6 text-gray-400">
          <Globe2 size={24} className="cursor-pointer hover:text-cyan-500" />
          <Menu size={28} className="cursor-pointer hover:text-cyan-500" />
        </div>
      </header>
        
        <Outlet />
        <div className='fixed bottom-0 left-0 right-0 w-full'>
              <nav className=" max-w-3xl mx-auto px-4 bg-gray-900 border-t border-gray-700 flex justify-around text-gray-400">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'}`
            }
            end
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'}`
            }
          >
            <CheckSquare size={24} />
            <span className="text-xs mt-1">Tasks</span>
          </NavLink>
          <NavLink
            to="membership"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'}`
            }
          >
            <Users size={24} />
            <span className="text-xs mt-1">Membership</span>
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'}`
            }
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
        </nav>

        </div>
    
      </main>

    
   
    </div>
  );
};

export default DashboardLayout;
