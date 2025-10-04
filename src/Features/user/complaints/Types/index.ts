// Complaint model types
export interface Complaint {
  id: number;
  uuid: string;
  user_uuid: string;
  contact_type: 'email' | 'phone';
  contact: string;
  severity_level: 'low' | 'medium' | 'high';
  description: string;
  admin_response: string | null;
  is_active: boolean;
  is_resolved: boolean;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  time_since_created: string;
  time_since_resolved: string | null;
  formatted_created_date: string;
  formatted_resolved_date: string | null;
  severity_color: string;
  status_text: string;
  priority_score: number;
  is_anonymous: boolean;
  is_assigned: boolean;
}

// User info for complaint details
export interface ComplaintUser {
  uuid: string;
  name: string;
  email: string;
  phone: string;
}

// Admin info for complaint details
export interface ComplaintAdmin {
  uuid: string;
  name: string;
  email: string;
}

// Pagination info
export interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  has_more: boolean;
}

// Summary info
export interface ComplaintSummary {
  total_complaints: number;
  active_complaints: number;
  resolved_complaints: number;
  unresolved_complaints: number;
  high_priority_complaints: number;
  medium_priority_complaints: number;
  low_priority_complaints: number;
}

// API Response types
export interface CreateComplaintResponse {
  success: boolean;
  message: string;
  data: {
    complaint: Complaint;
  };
}

export interface GetComplaintsResponse {
  success: boolean;
  data: {
    complaints: Complaint[];
    pagination: PaginationInfo;
    summary: ComplaintSummary;
  };
}

export interface GetComplaintResponse {
  success: boolean;
  data: {
    complaint: Complaint;
    user: ComplaintUser;
    assigned_admin: ComplaintAdmin | null;
  };
}

export interface UpdateComplaintResponse {
  success: boolean;
  message: string;
  data: {
    complaint: Complaint;
  };
}

// Request payloads
export interface CreateComplaintPayload {
  contact_type: 'email' | 'phone';
  contact: string;
  severity_level: 'low' | 'medium' | 'high';
  description: string;
}

export interface UpdateComplaintPayload {
  contact_type?: 'email' | 'phone';
  contact?: string;
  severity_level?: 'low' | 'medium' | 'high';
  description?: string;
  admin_response?: string;
  is_active?: boolean;
  is_resolved?: boolean;
  assigned_to?: string | null;
  resolved_at?: string | null;
}
