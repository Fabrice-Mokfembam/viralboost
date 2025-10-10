import { apiClient } from "../../../Services";
import type { UpdateComplaintStatusRequest, BulkUpdateComplaintsRequest } from "../Types";

// Get all complaints with pagination and filters
export const getComplaints = async (page = 1, limit = 20, status?: string, priority?: string, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(status && { status }),
    ...(priority && { priority }),
    ...(search && { search }),
  });
  const { data } = await apiClient.get(`/admin/complaints?${params}`);
  return data;
};

// Get complaint statistics
export const getComplaintStats = async () => {
  const { data } = await apiClient.get("/admin/complaints/stats");
  return data;
};

// Get complaint by ID
export const getComplaintById = async (id: string) => {
  const { data } = await apiClient.get(`/admin/complaints/${id}`);
  return data;
};

// Update complaint status
export const updateComplaintStatus = async (id: string, request: UpdateComplaintStatusRequest) => {
  const { data } = await apiClient.put(`/admin/complaints/${id}/status`, request);
  return data;
};

// Delete complaint
export const deleteComplaint = async (id: string) => {
  const { data } = await apiClient.delete(`/admin/complaints/${id}`);
  return data;
};

// Bulk update complaints
export const bulkUpdateComplaints = async (request: BulkUpdateComplaintsRequest) => {
  const { data } = await apiClient.post("/admin/complaints/bulk-update", request);
  return data;
};
