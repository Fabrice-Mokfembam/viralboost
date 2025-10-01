// Task Submission Types

export interface TaskSubmissionRequest {
  task_id: number;
  task_assignment_id?: number;
  image_url: string;
  description?: string;
}

export interface TaskSubmissionResponse {
  id: number;
  uuid: string;
  task_id: number;
  image_url: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  time_since_submission?: string;
}

export interface TaskSubmissionSuccessResponse {
  success: true;
  message: string;
  data: {
    submission: TaskSubmissionResponse;
    task: {
      id: number;
      title: string;
      description: string;
      points: number;
    };
  };
}

export interface TaskSubmissionErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  data?: {
    existing_submission?: {
      id: number;
      status: string;
      submitted_at: string;
      image_url: string;
    };
  };
}

export interface UserSubmission {
  id: number;
  uuid: string;
  user_uuid: string;
  task_id: number;
  task_assignment_id?: number;
  image_url: string;
  public_id: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
  task: {
    id: number;
    title: string;
    description: string;
  };
  reviewer?: {
    uuid: string;
    name: string;
    email: string;
  };
}

export interface UserSubmissionsResponse {
  success: true;
  data: {
    submissions: UserSubmission[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    };
    summary: {
      total_submissions: number;
      pending_submissions: number;
      approved_submissions: number;
      rejected_submissions: number;
    };
  };
}

export interface SpecificSubmissionResponse {
  success: true;
  data: {
    submission: {
      id: number;
      uuid: string;
      task_id: number;
      image_url: string;
      description?: string;
      status: 'pending' | 'approved' | 'rejected';
      admin_notes?: string;
      submitted_at: string;
      reviewed_at?: string;
      time_since_submission?: string;
      time_since_review?: string;
      formatted_submission_date?: string;
      formatted_review_date?: string;
    };
    task: {
      id: number;
      title: string;
      description: string;
      points: number;
      category: string;
    };
    reviewer?: {
      name: string;
      email: string;
    };
  };
}

export interface SubmissionStats {
  total_submissions: number;
  pending_submissions: number;
  approved_submissions: number;
  rejected_submissions: number;
  approval_rate: number;
  total_tasks: number;
  tasks_completed_today: number;
  last_task_reset_date: string;
  daily_task_limit: number;
  can_complete_more_tasks: boolean;
  membership_level: string;
  recent_submissions: Array<{
    id: number;
    task_id: number;
    status: string;
    submitted_at: string;
  }>;
}

export interface SubmissionStatsResponse {
  success: true;
  data: SubmissionStats;
}

export interface GetSubmissionsParams {
  page?: number;
  limit?: number;
  status?: 'pending' | 'approved' | 'rejected';
}

export type TaskSubmissionStatus = 'pending' | 'approved' | 'rejected';
