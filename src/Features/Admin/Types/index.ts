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
  tasks_completed_today: number;
  last_task_reset_date: string | null;
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

export interface MembershipTier {
  id: number;
  membership_name: string;
  description: string;
  tasks_per_day: number;
  max_tasks: number;
  price: string | number;
  benefit_amount_per_task: string | number;
  membership_icon: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Complaint {
  id: number;
  uuid: string;
  user_uuid: string | null;
  user: User | null;
  contact_type: 'email' | 'phone';
  contact: string;
  description: string;
  severity_level: 'low' | 'medium' | 'high';
  is_resolved: boolean;
  is_active: boolean;
  admin_response: string | null;
  assigned_admin: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
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

export interface ComplaintsApiResponse {
  success: boolean;
  data: {
    complaints: Complaint[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    };
    summary: {
      total_complaints: number;
      pending_complaints: number;
      resolved_complaints: number;
      urgent_complaints: number;
    };
  };
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
  category?: string;
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

// Complaint API Request Types
export interface UpdateComplaintStatusRequest {
  status: string;
  admin_response?: string;
  priority?: string;
}

export interface BulkUpdateComplaintsRequest {
  complaint_ids: number[];
  status: string;
  admin_response?: string;
}

// Task Creation Form Type
export interface TaskCreationForm {
  title: string;
  description: string;
  category: string;
  task_type: 'social_media' | 'website_visit' | 'app_download' | 'survey' | 'other';
  platform: string;
  instructions: string;
  target_url: string;
  benefit: number;
  is_active: boolean;
  task_status: 'pending' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  threshold_value: number;
  task_completion_count: number;
  task_distribution_count: number;
}

// Task Creation Form Errors Type
export interface TaskCreationFormErrors {
  title?: string;
  description?: string;
  category?: string;
  task_type?: string;
  platform?: string;
  instructions?: string;
  target_url?: string;
  benefit?: string;
  is_active?: string;
  task_status?: string;
  priority?: string;
  threshold_value?: string;
  task_completion_count?: string;
  task_distribution_count?: string;
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
  price: number;
  benefit_amount_per_task: number;
  membership_icon: string;
  is_active: boolean;
}


// Membership Creation Form Errors Type
export interface MembershipCreationFormErrors {
  membership_name?: string;
  description?: string;
  tasks_per_day?: string;
  max_tasks?: string;
  price?: string;
  benefit_amount_per_task?: string;
  membership_icon?: string;
  is_active?: string;
}
