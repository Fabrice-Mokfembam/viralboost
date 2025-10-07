// Withdrawal model types
export interface Withdrawal {
  id: number;
  uuid: string;
  user_uuid: string;
  withdrawal_amount: string;
  platform?: string;
  picture_path?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user?: WithdrawalUser;
}

export interface WithdrawalUser {
  uuid: string;
  name: string;
  email: string;
}

export interface Account {
  account_id: number;
  user_uuid: string;
  balance: string;
  total_bonus: string;
  total_withdrawals: string;
  tasks_income: string;
  referral_income: string;
  total_earned: string;
  is_active: boolean;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

// Pagination types
export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationInfo {
  current_page: number;
  data: Withdrawal[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Request payload types
export interface CreateWithdrawalPayload {
  withdrawal_amount: number;
  platform?: string;
  picture_path?: string;
}

export interface UpdateWithdrawalPayload {
  withdrawal_amount?: number;
  platform?: string;
  picture_path?: string;
}

export interface GetWithdrawalsQueryParams {
  is_completed?: boolean;
  platform?: string;
  page?: number;
}

export interface GetAdminWithdrawalsQueryParams {
  is_completed?: boolean;
  platform?: string;
  user_uuid?: string;
  min_amount?: number;
  page?: number;
}

// API Response types
export interface GetWithdrawalsResponse {
  success: boolean;
  data: PaginationInfo;
  message: string;
}

export interface CreateWithdrawalResponse {
  success: boolean;
  data: Withdrawal;
  message: string;
}

export interface GetWithdrawalResponse {
  success: boolean;
  data: Withdrawal;
  message: string;
}

export interface DeleteWithdrawalResponse {
  success: boolean;
  message: string;
}

export interface CompleteWithdrawalResponse {
  success: boolean;
  data: {
    withdrawal: Withdrawal;
    account: Account;
  };
  message: string;
}

export interface UpdateWithdrawalResponse {
  success: boolean;
  data: Withdrawal;
  message: string;
}

// Error response types
export interface WithdrawalErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  current_balance?: string;
  requested_amount?: string;
  user_balance?: string;
  withdrawal_amount?: string;
}
