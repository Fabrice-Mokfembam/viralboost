import { apiClient } from "../../../../Services";

// Update user profile
export const updateProfile = async (profileData: {
  name: string;
  email: string;
  phone?: string;
  profile_image?: File;
}) => {
  const formData = new FormData();
  
  formData.append('name', profileData.name);
  formData.append('email', profileData.email);
  
  if (profileData.phone) {
    formData.append('phone', profileData.phone);
  }
  
  if (profileData.profile_image) {
    formData.append('profile_image', profileData.profile_image);
  }

  const { data } = await apiClient.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
