// Membership model types
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

// Subscription info for user's current membership
export interface Subscription {
  started_at: string;
  expires_at: string;
  is_active: boolean;
  remaining_days: number;
}

// Daily progress info for user's membership
export interface DailyProgress {
  tasks_completed: number;
  daily_limit: number;
  remaining_tasks: number;
  last_reset_date: string;
}

// API Response types
export interface GetMembershipsResponse {
  success: boolean;
  data: {
    memberships: Membership[];
    total_memberships: number;
  };
}

export interface GetMyMembershipResponse {
  success: boolean;
  data: {
    id: number;
    membership: Membership;
    subscription: Subscription;
    daily_progress: DailyProgress;
  };
}
