import { apiClient } from "../../../../Services";
import type { AccountResponse, AccountUpdateResponse, UpdateAccountPayload } from "../Types";

// Get user account details
export const getAccount = async (): Promise<AccountResponse> => {
  const { data } = await apiClient.get('/account');
  return data;
};

// Update user account
export const updateAccount = async (accountData: UpdateAccountPayload): Promise<AccountUpdateResponse> => {
  const { data } = await apiClient.patch('/account', accountData);
  return data;
};
