// Example usage of admin token utilities
import { 
  getAdminToken, 
  getAdminUser, 
  getStoredAdminData,
  isAdminAuthenticated, 
  isAdminTokenExpired,
  getAdminAuthHeader,
  clearAdminData 
} from './adminUtils';

// Example: Check if admin is logged in
export const checkAdminAuth = () => {
  if (isAdminAuthenticated() && !isAdminTokenExpired()) {
    console.log('Admin is authenticated and token is valid');
    const admin = getAdminUser();
    console.log('Admin user:', admin);
    return true;
  } else {
    console.log('Admin is not authenticated or token is expired');
    return false;
  }
};

// Example: Get admin token for API calls
export const getAdminTokenForAPI = () => {
  const token = getAdminToken();
  if (token) {
    console.log('Admin token found:', token);
    return token;
  } else {
    console.log('No admin token found');
    return null;
  }
};

// Example: Get authorization header for API requests
export const getAdminAuthHeaderForAPI = () => {
  const authHeader = getAdminAuthHeader();
  console.log('Admin auth header:', authHeader);
  return authHeader;
};

// Example: Get full admin data with timestamp
export const getFullAdminData = () => {
  const adminData = getStoredAdminData();
  if (adminData) {
    console.log('Full admin data:', adminData);
    console.log('Token timestamp:', new Date(adminData.timestamp));
    return adminData;
  } else {
    console.log('No admin data found');
    return null;
  }
};

// Example: Logout admin
export const logoutAdmin = () => {
  clearAdminData();
  console.log('Admin logged out successfully');
};
