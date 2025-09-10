export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  referralCode?: string;
}

export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface VerifyRequest {
  email: string;
  code: string;
}

export interface ResendVerificationRequest {
  email?: string;
  phone?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ValidateResetTokenRequest {
  token: string;
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  data?: {
    userId?: number;
    email?: string;
    referralCode?: string;
    verified_at?: string;
    user_id?: number;
  };
}

export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  referred_by?: string;
  email_verified_at?: string;
  phone_verified_at?: string;
  created_at: string;
  updated_at: string;
}