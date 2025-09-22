// Admin Types
export interface AdminUser {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  is_admin: boolean;
  is_active: boolean;
  email_verified_at: string;
  phone_verified_at: string;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  membershipTier: MembershipTier;
  totalPointsEarned: number;
  accountStatus: 'active' | 'suspended' | 'banned';
  registrationDate: string;
  lastActive: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  platform: 'instagram' | 'youtube' | 'twitter' | 'tiktok' | 'facebook' | 'linkedin';
  basePoints: number;
  estimatedDurationMinutes: number;
  requiresPhoto: boolean;
  samplePhotoUrl?: string;
  thresholdValue: number;
  instructions: string[];
  targetUrl: string;
  expiresAt: string;
  status: 'pending' | 'active' | 'paused' | 'expired';
  membershipTiers: string[];
  totalCompletions: number;
  task_completion_count: number;
  category: string;
  reward: number; // Changed to decimal
  createdAt: string;
  createdBy: string;
}

export interface MembershipTier {
  id: number;
  membership_name: string;
  description: string | null;
  tasks_per_day: number;
  max_tasks: number;
  benefits: number | null;
  price: number;
  reward_multiplier: string;
  priority_level: number;
  is_active: number;
  task_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface Complaint {
  id: string;
  userId: string;
  user: User;
  userEmail: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'closed';
  contact: string;
  contactType: 'email' | 'phone';
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  user: User;
  type: 'membership_purchase' | 'payout' | 'refund' | 'bonus';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  processedAt?: string;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  task: Task;
  userId: string;
  user: User;
  submittedPhotoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded?: number;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalUsersGrowth: number;
  totalTasksCreated: number;
  totalTasksCompleted: number;
  totalRevenue: number;
  totalRevenueGrowth: number;
  activeUsers: number;
  pendingSubmissions: number;
  openComplaints: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface RecentActivity {
  id: string;
  type: 'user_registration' | 'task_created' | 'task_completed' | 'user_suspended' | 'complaint_created' | 'transaction_completed';
  description: string;
  userId?: string;
  userName?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AdminSettings {
  pointsToCurrencyRate: number;
  minimumPayoutThreshold: number;
  siteTitle: string;
  siteLogo: string;
  metaDescription: string;
  emailTemplates: {
    welcome: string;
    suspension: string;
    taskApproved: string;
    taskRejected: string;
  };
  platformSettings: {
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    taskSubmissionEnabled: boolean;
  };
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
    token: string;
    token_type: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types
export interface UserFilters {
  search?: string;
  membershipTier?: string;
  accountStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface TaskFilters {
  search?: string;
  platform?: string;
  status?: string;
  membershipTier?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ComplaintFilters {
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Task Creation Form Type
export interface TaskCreationForm {
  title: string;
  description: string;
  category_id: number;
  category: string; // New field for category name
  task_type: string;
  platform: string;
  instructions: string;
  target_url: string;
  reward: number; // Changed to decimal
  task_completion_count: number; // New field - read-only
  estimated_duration_minutes: number;
  requires_photo: boolean;
  is_active: boolean;
  sort_order: number;
  threshold_value: number;
  task_status: string;
  membership: string;
  requirements: string[];
}

// Task Creation Form Errors Type
export interface TaskCreationFormErrors {
  title?: string;
  description?: string;
  category_id?: string;
  category?: string;
  task_type?: string;
  platform?: string;
  instructions?: string;
  target_url?: string;
  reward?: string;
  task_completion_count?: string;
  estimated_duration_minutes?: string;
  requires_photo?: string;
  is_active?: string;
  sort_order?: string;
  threshold_value?: string;
  task_status?: string;
  membership?: string;
  requirements?: string;
}

// Task Category Type
export interface TaskCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

// Membership Creation Form Type - Only the specified fields
export interface MembershipCreationForm {
  membership_name: string;
  description: string;
  tasks_per_day: number;
  max_tasks: number;
  benefits: number;
  price: number;
  reward_multiplier: number;
  priority_level: number;
  is_active: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'task_completed' | 'user_registered' | 'complaint_created' | 'withdrawal_requested' | 'system_alert';
  title: string;
  message: string;
  userId?: string;
  userName?: string;
  taskId?: string;
  taskTitle?: string;
  amount?: number;
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  readAt?: string;
  metadata?: Record<string, unknown>;
}

export interface TaskCompletionNotification extends Notification {
  type: 'task_completed';
  taskId: string;
  taskTitle: string;
  completedBy: string;
  completedAt: string;
  rewardAmount: number;
  platform: string;
  taskType: string;
}

// Membership Creation Form Errors Type
export interface MembershipCreationFormErrors {
  membership_name?: string;
  description?: string;
  tasks_per_day?: string;
  max_tasks?: string;
  benefits?: string;
  price?: string;
  duration_days?: string;
  reward_multiplier?: string;
  priority_level?: string;
  is_active?: string;
}
