import { apiClient } from "../../../Services";
import type { TaskCreationForm, TaskFilters } from "../Types";

// Create a new task
export const createTask = async (task: TaskCreationForm) => {
  const { data } = await apiClient.post("/admin/tasks", task);
  return data;
};

// Get all tasks
export const getAllTasks = async (filters: TaskFilters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined))
  );
  
  const { data } = await apiClient.get(`/admin/tasks${params.toString() ? `?${params}` : ''}`);
  return data;
};

// Get a task by ID
export const getTaskById = async (taskId: string) => {
  const { data } = await apiClient.get(`/admin/tasks/${taskId}`);
  return data;
};

// Update a task
export const updateTask = async (taskId: string, updates: Partial<TaskCreationForm>) => {
  const { data } = await apiClient.put(`/admin/tasks/${taskId}`, updates);
  return data;
};

// Delete a task
export const deleteTask = async (taskId: string) => {
  const { data } = await apiClient.delete(`/admin/tasks/${taskId}`);
  return data;
};

// Get available tasks for preview
export const getAvailableTasks = async () => {
  const { data } = await apiClient.get("/admin/tasks/available");
  return data;
};

