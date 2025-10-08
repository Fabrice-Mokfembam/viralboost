import { apiClient } from "../../../../Services";
import type { 
  GetMembershipsResponse, 
  GetMyMembershipResponse, 
  PurchaseMembershipPayload, 
  PurchaseMembershipResponse 
} from "../Types";

// Get all available memberships
export const getMemberships = async (): Promise<GetMembershipsResponse> => {
  const { data } = await apiClient.get('/memberships');
  return data;
};

// Get user's current membership details
export const getMyMembership = async (): Promise<GetMyMembershipResponse> => {
  const { data } = await apiClient.get('/memberships/my-membership');
  return data;
};

// Purchase a membership
export const purchaseMembership = async (payload: PurchaseMembershipPayload): Promise<PurchaseMembershipResponse> => {
  const { data } = await apiClient.post('/memberships/purchase', payload);
  return data;
};
