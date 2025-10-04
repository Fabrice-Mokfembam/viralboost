import { apiClient } from "../../../../Services";
import type { GetMembershipsResponse, GetMyMembershipResponse } from "../Types";

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
