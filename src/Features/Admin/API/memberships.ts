import { apiClient } from "../../../Services";
import type { MembershipTier, MembershipCreationForm } from "../Types";

// Create a new membership
export const createMembership = async (membership: MembershipCreationForm) => {
  const { data } = await apiClient.post("/admin/memberships", membership);
  return data;
};

// Get all memberships
export const getAllMemberships = async () => {
  const { data } = await apiClient.get("/admin/memberships");
  return data;
};

// Get a membership by ID
export const getMembershipById = async (membershipId: string) => {
  const { data } = await apiClient.get(`/admin/memberships/${membershipId}`);
  return data;
};

// Update a membership
export const updateMembership = async (membershipId: string, updates: Partial<MembershipTier>) => {
  const { data } = await apiClient.put(`/admin/memberships/${membershipId}`, updates);
  return data;
};

// Delete a membership
export const deleteMembership = async (membershipId: string) => {
  const { data } = await apiClient.delete(`/admin/memberships/${membershipId}`);
  return data;
};

