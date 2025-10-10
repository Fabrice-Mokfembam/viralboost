import { apiClient } from '../../../Services';
import type { 
  AdminLoginCredentials, 
  User, 
  MembershipTier, 
  Transaction, 
  TaskFilters,
  TaskCreationForm
} from '../Types';

// Admin login
const loginAdmin = async (credentials: AdminLoginCredentials) => {
  const { data } = await apiClient.post("/admin/auth/login", credentials);
  return data;
};

// Admin logout
const logoutAdmin = async () => {
  const { data } = await apiClient.post("/admin/auth/logout");
  return data;
};

// Refresh admin token
const refreshAdminToken = async () => {
  const { data } = await apiClient.post("/admin/auth/refresh");
  return data;
};

// Users Management
const getUsers = async (page = 1, limit = 20, search = '') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });
  const { data } = await apiClient.get(`/admin/users?${params}`);
  return data;
};

const getUserById = async (userId: string) => {
  const { data } = await apiClient.get(`/admin/users/${userId}`);
  return data;
};

const updateUser = async (userId: string, userData: Partial<User>) => {
  const { data } = await apiClient.patch(`/admin/users/${userId}`, userData);
  return data;
};

const deleteUser = async (userId: string) => {
  const { data } = await apiClient.delete(`/admin/users/${userId}`);
  return data;
};

// Membership Management
const getMemberships = async () => {
  const { data } = await apiClient.get("/admin/memberships");
  return data;
};

const createMembership = async (membership: Omit<MembershipTier, 'id' | 'created_at' | 'updated_at'>) => {
  const { data } = await apiClient.post("/admin/memberships", membership);
  return data;
};

const updateMembership = async (membershipId: string, membership: Partial<MembershipTier>) => {
  const { data } = await apiClient.patch(`/admin/memberships/${membershipId}`, membership);
  return data;
};

const deleteMembership = async (membershipId: string) => {
  const { data } = await apiClient.delete(`/admin/memberships/${membershipId}`);
  return data;
};

// Tasks Management
const getTasks = async (filters: TaskFilters = {}, page = 1, limit = 20) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.status && { status: filters.status }),
    ...(filters.search && { search: filters.search }),
  });
  const { data } = await apiClient.get(`/admin/tasks?${params}`);
  return data;
};

const getTaskById = async (taskId: string) => {
  const { data } = await apiClient.get(`/admin/tasks/${taskId}`);
  return data;
};

const createTask = async (task: TaskCreationForm) => {
  const { data } = await apiClient.post("/admin/tasks", task);
  return data;
};

const updateTask = async (taskId: string, task: Partial<TaskCreationForm>) => {
  const { data } = await apiClient.patch(`/admin/tasks/${taskId}`, task);
  return data;
};

const deleteTask = async (taskId: string) => {
  const { data } = await apiClient.delete(`/admin/tasks/${taskId}`);
  return data;
};

const getTaskStats = async () => {
  const { data } = await apiClient.get("/admin/tasks/stats");
  return data;
};

const assignDailyTasks = async () => {
  const { data } = await apiClient.post("/admin/tasks/assign-daily");
  return data;
};

const resetDailyTasks = async () => {
  const { data } = await apiClient.post("/admin/tasks/reset-daily");
  return data;
};

const startTaskScheduler = async () => {
  const { data } = await apiClient.post("/admin/tasks/start-scheduler");
  return data;
};


// Transactions Management
const getTransactions = async (page = 1, limit = 20, status?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(status && { status }),
  });
  const { data } = await apiClient.get(`/admin/transactions?${params}`);
  return data;
};

const getTransactionById = async (transactionId: string) => {
  const { data } = await apiClient.get(`/admin/transactions/${transactionId}`);
  return data;
};

const updateTransaction = async (transactionId: string, transaction: Partial<Transaction>) => {
  const { data } = await apiClient.patch(`/admin/transactions/${transactionId}`, transaction);
  return data;
};


// Reports
const getReports = async (type: string, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({
    type,
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
  });
  const { data } = await apiClient.get(`/admin/reports?${params}`);
  return data;
};

// Settings
const getSettings = async () => {
  const { data } = await apiClient.get("/admin/settings");
  return data;
};

const updateSettings = async (settings: Record<string, unknown>) => {
  const { data } = await apiClient.patch("/admin/settings", settings);
  return data;
};

// Export admin management functions
export * from './admins';

export {
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  assignDailyTasks,
  resetDailyTasks,
  startTaskScheduler,
  getTransactions,
  getTransactionById,
  updateTransaction,
  getReports,
  getSettings,
  updateSettings,
};