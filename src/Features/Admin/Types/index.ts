// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'support_moderator' | 'content_moderator';
  name: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
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
  createdAt: string;
  createdBy: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  description: string;
  price: number; // monthly
  rewardMultiplier: number;
  dailyTaskLimit: number;
  maxTasks: number;
  priorityLevel: number;
  icon?: string;
  color?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Complaint {
  id: string;
  userId: string;
  user: User;
  taskId?: string;
  task?: Task;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  assignedAdmin?: AdminUser;
  createdAt: string;
  updatedAt: string;
  resolution?: string;
  internalNotes: string[];
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
  metadata?: Record<string, any>;
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
  metadata?: Record<string, any>;
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
  admin: AdminUser;
  token: string;
  refreshToken: string;
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

// Task Creation Types
export interface TaskCreationForm {
  title: string;
  description: string;
  category_id: number;
  task_type: 'like' | 'follow' | 'comment' | 'subscribe';
  platform: string;
  instructions: string;
  target_url: string;
  membership: 'Basic' | 'VIP1' | 'VIP2' | 'VIP3' | 'VIP4';
  estimated_duration_minutes: number;
  requires_photo: boolean;
  is_active: boolean;
  sort_order: number;
  threshold_value: number;
  status: 'active' | 'pause' | 'completed' | 'suspended';
}

export interface TaskCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}