import { apiClient } from "../../../../Services";

// Run task distribution
export const runTaskDistribution = async () => {
  const { data } = await apiClient.get('/task-distribution/run');
  return data;
};

// Get user task details
export const getUserTaskDetails = async (taskId: string) => {
  const { data } = await apiClient.get(`/tasks/${taskId}/user-details`);
  return data;
};

// Update user task
export const updateUserTask = async (taskId: string, updateData: any) => {
  const { data } = await apiClient.put(`/tasks/${taskId}/update`, updateData);
  return data;
};