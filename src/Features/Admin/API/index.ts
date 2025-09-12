import type { 
  AdminLoginCredentials, 
  AdminAuthResponse, 
  User, 
  Task, 
  MembershipTier, 
  Complaint, 
  Transaction, 
  TaskSubmission, 
  DashboardStats, 
  RecentActivity, 
  AdminSettings,
  ApiResponse,
  PaginatedResponse,
  UserFilters,
  TaskFilters,
  ComplaintFilters
} from '../Types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AdminAPI {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('admin_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    const response = await this.request<AdminAuthResponse>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response.data;
  }

  async logout(): Promise<void> {
    await this.request('/admin/auth/logout', { method: 'POST' });
    localStorage.removeItem('admin_token');
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await this.request<{ token: string }>('/admin/auth/refresh', {
      method: 'POST',
    });
    return response.data;
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.request<DashboardStats>('/admin/dashboard/stats');
    return response.data;
  }

  async getRecentActivity(limit = 10): Promise<RecentActivity[]> {
    const response = await this.request<RecentActivity[]>(`/admin/dashboard/activity?limit=${limit}`);
    return response.data;
  }

  // User Management
  async getUsers(filters: UserFilters = {}, page = 1, limit = 20): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined)),
    });
    
    const response = await this.request<PaginatedResponse<User>>(`/admin/users?${params}`);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.request<User>(`/admin/users/${id}`);
    return response.data;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const response = await this.request<User>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async suspendUser(id: string, reason: string): Promise<void> {
    await this.request(`/admin/users/${id}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async banUser(id: string, reason: string): Promise<void> {
    await this.request(`/admin/users/${id}/ban`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.request(`/admin/users/${id}`, { method: 'DELETE' });
  }

  // Task Management
  async getTasks(filters: TaskFilters = {}, page = 1, limit = 20): Promise<PaginatedResponse<Task>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined)),
    });
    
    const response = await this.request<PaginatedResponse<Task>>(`/admin/tasks?${params}`);
    return response.data;
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await this.request<Task>(`/admin/tasks/${id}`);
    return response.data;
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'createdBy' | 'totalCompletions'>): Promise<Task> {
    const response = await this.request<Task>('/admin/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return response.data;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await this.request<Task>(`/admin/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await this.request(`/admin/tasks/${id}`, { method: 'DELETE' });
  }

  // Membership Management
  async getMembershipTiers(): Promise<MembershipTier[]> {
    const response = await this.request<MembershipTier[]>('/admin/membership-tiers');
    return response.data;
  }

  async createMembershipTier(tier: Omit<MembershipTier, 'id' | 'createdAt'>): Promise<MembershipTier> {
    const response = await this.request<MembershipTier>('/admin/membership-tiers', {
      method: 'POST',
      body: JSON.stringify(tier),
    });
    return response.data;
  }

  async updateMembershipTier(id: string, updates: Partial<MembershipTier>): Promise<MembershipTier> {
    const response = await this.request<MembershipTier>(`/admin/membership-tiers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async deleteMembershipTier(id: string): Promise<void> {
    await this.request(`/admin/membership-tiers/${id}`, { method: 'DELETE' });
  }

  // Complaint Management
  async getComplaints(filters: ComplaintFilters = {}, page = 1, limit = 20): Promise<PaginatedResponse<Complaint>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined)),
    });
    
    const response = await this.request<PaginatedResponse<Complaint>>(`/admin/complaints?${params}`);
    return response.data;
  }

  async getComplaintById(id: string): Promise<Complaint> {
    const response = await this.request<Complaint>(`/admin/complaints/${id}`);
    return response.data;
  }

  async updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint> {
    const response = await this.request<Complaint>(`/admin/complaints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async assignComplaint(id: string, adminId: string): Promise<void> {
    await this.request(`/admin/complaints/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ adminId }),
    });
  }

  // Task Submissions
  async getTaskSubmissions(page = 1, limit = 20): Promise<PaginatedResponse<TaskSubmission>> {
    const response = await this.request<PaginatedResponse<TaskSubmission>>(`/admin/task-submissions?page=${page}&limit=${limit}`);
    return response.data;
  }

  async approveSubmission(id: string, pointsAwarded: number): Promise<void> {
    await this.request(`/admin/task-submissions/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ pointsAwarded }),
    });
  }

  async rejectSubmission(id: string, reason: string): Promise<void> {
    await this.request(`/admin/task-submissions/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Transactions
  async getTransactions(page = 1, limit = 20): Promise<PaginatedResponse<Transaction>> {
    const response = await this.request<PaginatedResponse<Transaction>>(`/admin/transactions?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Settings
  async getSettings(): Promise<AdminSettings> {
    const response = await this.request<AdminSettings>('/admin/settings');
    return response.data;
  }

  async updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
    const response = await this.request<AdminSettings>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    return response.data;
  }

  // Reports
  async generateReport(type: 'users' | 'tasks' | 'revenue', format: 'csv' | 'pdf', filters?: Record<string, unknown>): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/${type}?format=${format}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters || {}),
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    return response.blob();
  }
}

export const adminAPI = new AdminAPI();
