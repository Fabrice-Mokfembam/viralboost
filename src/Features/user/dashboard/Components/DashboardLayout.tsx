import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, CheckSquare, Users, User,  Menu, Flag, LogOut } from 'lucide-react';
import { useLogout } from '../../auth/Hooks/useAuth';
// import { useTheme } from '../../../../Hooks/useTheme';

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { mutate: logoutMutation, isPending } = useLogout();
  // const {toggleTheme}= useTheme()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);



  const reportProblem = () => {
    navigate('/v/report-problem');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        navigate('/');
        setMenuOpen(false);
      },
      onError: () => {
        // Even if logout fails on server, navigate to login
        localStorage.clear();
        navigate('/');
        setMenuOpen(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col">
      {/* Main content */}
      <main className="flex-grow relative w-full max-w-3xl md:mx-auto bg-bg-main pt-6 pb-20 px-4">
        <header className="w-full h-[70px] bg-bg-main sticky top-0 z-50 flex items-center justify-between  py-3">
          <div className="text-cyan-500 font-bold text-xl">PIS</div>

          <div className="flex items-center gap-2 text-text-muted relative">
            {/* <Globe2 size={24} className="cursor-pointer hover:text-cyan-500" /> */}

            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="relative z-50"
            >
              <Menu size={28} className="cursor-pointer hover:text-cyan-500" />
            </button>

            {/* Dropdown Menu */}
            <div
              ref={menuRef}
              className={`absolute right-0 top-full mt-1 w-48 rounded-lg bg-bg-tertiary border border-gray-600 shadow-lg
                transform origin-top-right transition-all ease-in-out duration-200
                ${menuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}
              `}
            >
              {/* <button
                onClick={toggleTheme}
                className="flex items-center w-full px-2 py-3 text-text-secondary hover:bg-cyan-600 hover:text-text-primary rounded-t-lg"
              >
                <SunMoon size={20} className="mr-3" /> Toggle Theme
              </button> */}
              <button
                onClick={reportProblem}
                className="flex items-center w-full px-2 py-3 text-text-secondary hover:bg-cyan-600 hover:text-text-primary"
              >
                <Flag size={20} className="mr-3" /> Report a Problem
              </button>
            
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="flex items-center w-full px-2 py-3 text-red-500 hover:bg-red-600 hover:text-text-primary rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={20} className="mr-3" /> 
                {isPending ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Outlet / Children */}
        <Outlet />

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 w-full z-50">
          <nav className="max-w-3xl mx-auto px-4 bg-bg-main border-t border-gray-700 flex justify-around text-text-muted">
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
