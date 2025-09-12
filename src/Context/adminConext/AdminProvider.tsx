import { useEffect, useState, type ReactNode } from "react";
import type { AdminLoginCredentials, AdminUser } from "../../Features/Admin/Types";
import { AdminAuthContext } from "./admincontext";

interface AdminAuthProviderProps {
    children: ReactNode;
  }
  
  export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = () => {
      const isLoggedIn = localStorage.getItem('admin_logged_in');
      const adminEmail = localStorage.getItem('admin_email');
      
      if (isLoggedIn === 'true' && adminEmail) {
        // Create a mock admin user
        setAdmin({
          id: '1',
          email: adminEmail,
          role: 'super_admin',
          name: 'Admin User',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
        });
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);
  
    const login = async (credentials: AdminLoginCredentials) => {
      // For now, just simulate a successful login
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_email', credentials.email);
      
      setAdmin({
        id: '1',
        email: credentials.email,
        role: 'super_admin',
        name: 'Admin User',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
      });
    };
  
    const logout = () => {
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_email');
      localStorage.removeItem('admin_token');
      setAdmin(null);
    };
  
    const refreshToken = async () => {
      // For now, just return success
      return Promise.resolve();
    };
  
    const value = {
      admin,
      isAuthenticated: !!admin,
      isLoading,
      login,
      logout,
      refreshToken,
    };
  
    return (
      <AdminAuthContext.Provider value={value}>
        {children}
      </AdminAuthContext.Provider>
    );
  };