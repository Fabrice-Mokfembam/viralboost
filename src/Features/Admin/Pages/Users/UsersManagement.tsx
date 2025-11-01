import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserFilters } from '../../Types';
import { useGetUsers, useDeleteUser } from '../../Hooks/useUsers';
import { toast } from 'react-toastify';
import { UserPlus, LogIn } from 'lucide-react';

interface UserWithMembership {
  uuid: string;
  name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  total_points: number;
  created_at: string;
  membership: string;
  totalPointsEarned: number;
  accountStatus: string;
  registrationDate: string;
  username: string;
  profilePicture: string | null;
  tasks_completed_today: number;
  last_task_reset_date: string | null;
}

const UsersManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UserFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; user: UserWithMembership | null }>({ show: false, user: null });
  
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const { data: usersResponse, isLoading, error } = useGetUsers(currentPage, 15, filters.search || '');
  
  // Add random membership to each user
  const usersWithMemberships = useMemo((): UserWithMembership[] => {
    if (!usersResponse?.data?.users) return [];
    
    const membershipTiers = ['Basic', 'Premium', 'VIP', 'Gold', 'Platinum'];
    
    return usersResponse.data.users.map((user: Record<string, unknown>) => ({
      ...user,
      membership: membershipTiers[Math.floor(Math.random() * membershipTiers.length)],
      totalPointsEarned: user.total_points || 0,
      accountStatus: user.is_active ? 'active' : 'inactive',
      registrationDate: user.created_at,
      username: user.name,
      profilePicture: null
    }));
  }, [usersResponse?.data?.users]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchTerm });
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
    setCurrentPage(1);
  };

  const handleViewUser = (uuid: string) => {
    navigate(`/admin/dashboard/users/${uuid}`);
  };

  const handleDeleteUser = (user: UserWithMembership) => {
    setDeleteConfirm({ show: true, user });
  };

  const confirmDelete = () => {
    if (deleteConfirm.user) {
      console.log('Attempting to delete user:', deleteConfirm.user.uuid, deleteConfirm.user.username);
      deleteUser(deleteConfirm.user.uuid, {
        onSuccess: (data) => {
          console.log('Delete success response:', data);
          toast.success('User deleted successfully');
          setDeleteConfirm({ show: false, user: null });
        },
        onError: (error) => {
          console.error('Delete error:', error);
          toast.error('Failed to delete user');
        }
      });
    }
  };

  const handleLoginAsUser = (user: UserWithMembership) => {
    if (!user.email) {
      toast.error('User email not available');
      return;
    }
    
    // Navigate to the regular login page with the user's email and password as query parameters
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent("AdminMasterPass2024!");
    navigate(`/login?email=${email}&password=${password}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      suspended: { color: 'bg-yellow-100 text-yellow-800', text: 'Suspended' },
      banned: { color: 'bg-red-100 text-red-800', text: 'Banned' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // No loading or error states needed with static data

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary mt-1">
            Manage all users on the platform
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard/user/create')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <UserPlus size={20} />
          Create User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or username..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={filters.accountStatus || ''}
                onChange={(e) => handleFilterChange('accountStatus', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Membership Tier
              </label>
              <select
                value={filters.membershipTier || ''}
                onChange={(e) => handleFilterChange('membershipTier', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Tiers</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-secondary divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-cyan"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-red-500">
                    Error loading users. Please try again.
                  </td>
                </tr>
              ) : usersWithMemberships.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                    No users found.
                  </td>
                </tr>
              ) : (
                usersWithMemberships.map((user: UserWithMembership) => (
                <tr key={user.uuid} className="hover:bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profilePicture ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.profilePicture}
                            alt={user.username}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-accent-cyan flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.username?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {user.username || 'Unknown User'}
                        </div>
                        <div className="text-sm text-text-secondary">
                          ID: {user.uuid?.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{user.email || 'No email'}</div>
                    {user.phone && (
                      <div className="text-sm text-text-secondary">{user.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.membership === 'VIP' || user.membership === 'Platinum' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.membership === 'Premium' || user.membership === 'Gold'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.membership}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.accountStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewUser(user.uuid)}
                        className="text-accent-cyan hover:text-accent-cyan-hover disabled:opacity-50"
                        disabled={isDeleting}
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleLoginAsUser(user)}
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 disabled:opacity-50"
                        disabled={isDeleting}
                        title="Login as this user"
                      >
                        <LogIn size={14} />
                        Login As
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {usersResponse?.data?.pagination && usersResponse.data.pagination.last_page > 1 && (
          <div className="bg-bg-main px-4 py-3 flex items-center justify-between border-t border-border">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(usersResponse.data.pagination.last_page, currentPage + 1))}
                disabled={currentPage === usersResponse.data.pagination.last_page}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Showing{' '}
                  <span className="font-medium">
                    {usersResponse.data.pagination.from}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {usersResponse.data.pagination.to}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{usersResponse.data.pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: usersResponse.data.pagination.last_page }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-accent-cyan border-accent-cyan text-white'
                          : 'bg-bg-secondary border-border text-text-primary hover:bg-bg-tertiary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div 
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={isDeleting ? undefined : () => setDeleteConfirm({ show: false, user: null })}
        >
          <div 
            className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Confirm User Deletion
            </h3>
            <p className="text-text-secondary mb-4">
              Are you sure you want to <strong>permanently delete</strong> user <strong>{deleteConfirm.user?.username}</strong>? 
              This action cannot be undone and will remove all user data.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This action is irreversible. All user data will be permanently removed.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm({ show: false, user: null })}
                className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200 disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
