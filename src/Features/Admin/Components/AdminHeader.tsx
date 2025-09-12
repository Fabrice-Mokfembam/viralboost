import React from 'react';
import type { AdminUser } from '../Types';

interface AdminHeaderProps {
  onMenuClick: () => void;
  admin: AdminUser | null;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, admin }) => {
  return (
    <header className="bg-bg-secondary border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu button and title */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-cyan"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-text-primary">
                Admin Dashboard
              </h1>
            </div>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center ">
            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-cyan relative"
            >
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12 7H4.828z" />
              </svg>
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent-cyan rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">3</span>
              </span>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-accent-cyan flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {admin?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-text-primary">
                  {admin?.name || 'Admin'}
                </div>
                <div className="text-xs text-text-secondary">
                  {admin?.role?.replace('_', ' ').toUpperCase() || 'ADMIN'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
