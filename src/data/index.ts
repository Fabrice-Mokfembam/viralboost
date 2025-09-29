export interface Membership {
  id: number;
  membership_name: string;
  description: string;
  tasks_per_day: number;
  max_tasks: number;
  price: string;
  benefit_amount_per_task: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  task_type: 'social_media' | 'website_visit' | 'app_download' | 'survey' | 'other';
  platform: string;
  instructions: string;
  target_url: string;
  benefit: string;
  is_active: number;
  task_status: 'pending' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  threshold_value: number;
  task_completion_count: number;
  task_distribution_count: number;
  created_at: string;
  updated_at: string;
}

export interface TasksResponse {
  success: boolean;
  data: {
    tasks: Task[];
    total_tasks: number;
  };
}

export interface User {
  id: number | null;
  uuid: string;
  name: string;
  email: string;
  phone: string | null;
  profile_image: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  profile_picture: string | null;
  referral_code: string;
  referred_by: string | null;
  total_points: string;
  total_tasks: number;
  tasks_completed_today: number;
  last_task_reset_date: string | null;
  account_balance: string;
  membership_level: number;
  role: string;
  isActive: boolean;
  is_active: boolean;
  is_admin: boolean;
  deactivated_at: string | null;
  deactivation_reason: string | null;
  lastLogin: string | null;
  profile_visibility: 'public' | 'private' | 'friends';
  show_email: boolean;
  show_phone: boolean;
  show_activity: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  created_at: string;
  updated_at: string;
  membership: Membership;
  emailVerified: boolean;
  phoneVerified: boolean;
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
  token: string;
  user: User;
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