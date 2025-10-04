import { apiClient } from "../../../../Services";
import type { 
  CreateComplaintResponse, 
  GetComplaintsResponse, 
  GetComplaintResponse, 
  UpdateComplaintResponse,
  CreateComplaintPayload,
  UpdateComplaintPayload
} from "../Types";

// Create a new complaint
export const createComplaint = async (complaintData: CreateComplaintPayload): Promise<CreateComplaintResponse> => {
  const { data } = await apiClient.post('/complaints', complaintData);
  return data;
};

// Get all complaints with pagination
export const getComplaints = async (page: number = 1, perPage: number = 20): Promise<GetComplaintsResponse> => {
  const { data } = await apiClient.get(`/complaints?page=${page}&per_page=${perPage}`);
  return data;
};

// Get a specific complaint by ID
export const getComplaint = async (complaintId: number): Promise<GetComplaintResponse> => {
  const { data } = await apiClient.get(`/complaints/${complaintId}`);
  return data;
};

// Update a complaint
export const updateComplaint = async (complaintId: number, updateData: UpdateComplaintPayload): Promise<UpdateComplaintResponse> => {
  const { data } = await apiClient.put(`/complaints/${complaintId}`, updateData);
  return data;
};
