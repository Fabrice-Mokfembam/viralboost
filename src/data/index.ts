export interface User {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  email_verification_code?: string;
  email_verification_expires_at?: string;
  phone_verification_code?: string;
  phone_verification_expires_at?: string;
  phone_verified_at?: string;
  referral_code: string;
  referred_by?: string;
  total_points: number;
  tasks_completed_today: number;
  last_task_reset_date?: string;
  profile_picture?: string;
  is_active: boolean;
  is_admin: boolean;
  deactivated_at?: string;
  deactivation_reason?: string;
  profile_visibility: 'public' | 'private' | 'friends';
  show_email: boolean;
  show_phone: boolean;
  show_activity: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
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