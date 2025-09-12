import { useState, useEffect } from "react";
import { staticAdminUser } from "../data/staticData";
import type { AdminUser, AdminLoginCredentials } from "../Types";

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in (simple localStorage check)
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: AdminLoginCredentials) => {
    // Simple mock login - accept any email/password for demo
    if (credentials.email && credentials.password) {
      const adminData = { ...staticAdminUser, email: credentials.email };
      setAdmin(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('admin_user', JSON.stringify(adminData));
      return adminData;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_user');
  };

  return {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};


