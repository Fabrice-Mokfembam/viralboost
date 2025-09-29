import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isTokenExpired } from '../Features/user/auth/Utils/authUtils';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    // Simulate a brief check to avoid flash of content
    const checkAuth = () => {
      const authenticated = isAuthenticated() && !isTokenExpired();
      setIsAuth(authenticated);
      setIsChecking(false);
    };
    
    // Small delay to prevent flash of content
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);
  
  if (isChecking) {
    return <LoadingSpinner text="Checking authentication..." />;
  }
  
  if (!isAuth) {
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
