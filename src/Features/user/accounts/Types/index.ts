// Account model types
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

// API Response types
export interface AccountResponse {
  success: boolean;
  data: Account;
}

export interface AccountUpdateResponse {
  success: boolean;
  message: string;
  data: Account;
}

// Update account payload
export interface UpdateAccountPayload {
  balance?: number;
  total_bonus?: number;
  total_withdrawals?: number;
  tasks_income?: number;
  referral_income?: number;
  total_earned?: number;
  is_active?: boolean;
}
