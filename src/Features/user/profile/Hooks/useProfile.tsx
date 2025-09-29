import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, updatePassword } from "../API";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData: {
      name: string;
      email: string;
      phone?: string;
      profile_image?: File;
    }) => updateProfile(profileData),
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (passwordData: {
      current_password: string;
      password: string;
      password_confirmation: string;
    }) => updatePassword(passwordData),
    onSuccess: () => {
      // Invalidate user data to refresh any cached profile info
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      console.error("Failed to update password:", error);
    },
  });
};
