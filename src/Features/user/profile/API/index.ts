import { apiClient } from "../../../../Services";

// Update user profile
export const updateProfile = async (profileData: {
  name?: string;
  email?: string;
  phone?: string;
  profile_image?: string;
}) => {
  // Send as JSON instead of FormData since we're sending strings
  const { data } = await apiClient.put('/profile', profileData);
  return data;
};

// Update user password
export const updatePassword = async (passwordData: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const { data } = await apiClient.put('/profile/password', passwordData);
  return data;
};
