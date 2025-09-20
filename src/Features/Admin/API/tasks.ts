import { apiClient } from "../../../Services";
import type { TaskCreationForm, TaskFilters } from "../Types";

// Create a new task
export const createTask = async (task: TaskCreationForm) => {
  const { data } = await apiClient.post("/admin/tasks", task);
  return data;
};

// Get all tasks
export const getAllTasks = async (filters: TaskFilters = {}, page = 1, limit = 20) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined)),
  });
  
  const { data } = await apiClient.get(`/admin/tasks?${params}`);
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

// Get task statistics
export const getTaskStats = async () => {
  const { data } = await apiClient.get("/admin/tasks/stats");
  return data;
};

// Manually assign daily tasks
export const assignDailyTasks = async () => {
  const { data } = await apiClient.post("/admin/tasks/assign-daily");
  return data;
};

// Reset daily tasks
export const resetDailyTasks = async () => {
  const { data } = await apiClient.post("/admin/tasks/reset-daily");
  return data;
};

// Start the self-scheduling task system
export const startTaskScheduler = async (immediate = false) => {
  const { data } = await apiClient.post("/admin/tasks/start-scheduler", { immediate });
  return data;
};

