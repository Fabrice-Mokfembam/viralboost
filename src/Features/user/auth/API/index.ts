import type { AuthResponse, ForgotPasswordRequest, LoginRequest, ProfileResponse, RegisterRequest, ResendVerificationRequest, ResetPasswordRequest, ValidateResetTokenRequest, VerifyRequest } from "../../../../data";
import { apiClient } from "../../../../Services";


export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/verify-email', data);
    return response.data;
  },

  resendVerification: async (data: ResendVerificationRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/resend-verification', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  validateResetToken: async (params: ValidateResetTokenRequest): Promise<AuthResponse> => {
    const response = await apiClient.get('/auth/validate-reset-token', { params });
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  logout: async (): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get('/profile');
    return response.data;
  }
};