import { type ReactNode } from "react";
import { useAdminAuth } from "../../Features/Admin/Hooks/useAdminAuth";
import { AdminAuthContext } from "./admincontext";

interface AdminAuthProviderProps {
    children: ReactNode;
  }
  
  export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
    const adminAuth = useAdminAuth();
  
    // Ensure admin is never undefined
    const contextValue = {
      ...adminAuth,
      admin: adminAuth.admin ?? null,
    };
  
    return (
      <AdminAuthContext.Provider value={contextValue}>
        {children}
      </AdminAuthContext.Provider>
    );
  };