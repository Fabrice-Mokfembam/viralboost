import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../API';
import { storeAuthData, clearAuthData } from '../Utils/authUtils';
import type { ForgotPasswordRequest, LoginRequest, RegisterRequest, ResendVerificationRequest, ResetPasswordRequest, ValidateResetTokenRequest, VerifyRequest } from '../../../../data';


export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      if (data.token && data.user) {
        // Store authentication data using utility function
        storeAuthData(data);
        queryClient.setQueryData(['user'], data.user);
      }
    },
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: (data: VerifyRequest) => authApi.verify(data),
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (data: ResendVerificationRequest) => authApi.resendVerification(data),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
};

export const useValidateResetToken = () => {
  return useMutation({
    mutationFn: (data: ValidateResetTokenRequest) => authApi.validateResetToken(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear authentication data using utility function
      clearAuthData();
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getProfile(),
    enabled: !!localStorage.getItem('authToken'),
  });
};