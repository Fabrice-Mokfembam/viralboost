import { useQuery } from '@tanstack/react-query';
import { 
  getUsers, 
  getTasks, 
  getTransactions 
} from '../API';
import { getComplaints } from '../API/complaints';
import type { 
  UserFilters,
  TaskFilters,
  ComplaintFilters
} from '../Types';


// Dashboard Stats Hook - This would need to be implemented in the API
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      // This endpoint would need to be implemented in the backend
      throw new Error('Dashboard stats endpoint not implemented yet');
    },
    enabled: false, // Disable until API is implemented
  });
};

// Recent Activity Hook - This would need to be implemented in the API
export const useRecentActivity = (limit = 10) => {
  return useQuery({
    queryKey: ['admin-recent-activity', limit],
    queryFn: async () => {
      // This endpoint would need to be implemented in the backend
      throw new Error('Recent activity endpoint not implemented yet');
    },
    enabled: false, // Disable until API is implemented
  });
};

// Users Hook
export const useUsers = (filters: UserFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-users', filters, page, limit],
    queryFn: () => getUsers(page, limit, filters.search || ''),
  });
};

// Tasks Hook
export const useTasks = (filters: TaskFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-tasks', filters, page, limit],
    queryFn: () => getTasks(filters, page, limit),
  });
};

// Complaints Hook
export const useComplaints = (filters: ComplaintFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-complaints', filters, page, limit],
    queryFn: () => getComplaints(page, limit, filters.status, filters.priority, filters.search),
  });
};

// Task Submissions Hook - Note: This endpoint doesn't exist in the API yet
export const useTaskSubmissions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-task-submissions', page, limit],
    queryFn: async () => {
      // This would need to be implemented in the API
      throw new Error('Task submissions endpoint not implemented yet');
    },
    enabled: false, // Disable until API is implemented
  });
};

// Transactions Hook
export const useTransactions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-transactions', page, limit],
    queryFn: () => getTransactions(page, limit),
  });
};
